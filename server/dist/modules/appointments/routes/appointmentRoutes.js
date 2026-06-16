"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Appointment_1 = require("../models/Appointment");
const slotsEngine_1 = require("../services/slotsEngine");
const auth_1 = require("../../../shared/middleware/auth");
const ApiError_1 = require("../../../shared/utils/ApiError");
const asyncErrorWrapper_1 = require("../../../shared/utils/asyncErrorWrapper");
const router = (0, express_1.Router)();
// Public: Get available slots
router.get('/slots', (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { date, duration } = req.query;
    const storeId = req.storeId;
    if (!storeId) {
        throw ApiError_1.ApiError.badRequest('Store context is required');
    }
    if (!date || !duration) {
        throw ApiError_1.ApiError.badRequest('Date (YYYY-MM-DD) and duration (minutes) are required');
    }
    const slots = await (0, slotsEngine_1.generateAvailableSlots)(storeId, date, parseInt(duration, 10));
    res.json({ success: true, data: slots });
}));
// Public: Book appointment
router.post('/book', (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { customerName, customerEmail, customerPhone, serviceName, duration, date, time } = req.body;
    const storeId = req.storeId;
    if (!storeId) {
        throw ApiError_1.ApiError.badRequest('Store context is required');
    }
    if (!customerName || !customerEmail || !customerPhone || !serviceName || !duration || !date || !time) {
        throw ApiError_1.ApiError.badRequest('All fields are required to book an appointment');
    }
    // Parse start and end time
    const [hours, mins] = time.split(':').map(Number);
    const startTime = new Date(date);
    startTime.setHours(hours, mins, 0, 0);
    const endTime = new Date(startTime.getTime() + parseInt(duration, 10) * 60000);
    // double check slot availability
    const slots = await (0, slotsEngine_1.generateAvailableSlots)(storeId, date, parseInt(duration, 10));
    if (!slots.includes(time)) {
        throw ApiError_1.ApiError.badRequest('The requested time slot is no longer available');
    }
    const appointment = new Appointment_1.Appointment({
        customerName,
        customerEmail,
        customerPhone,
        serviceName,
        duration,
        startTime,
        endTime,
        storeId,
    });
    await appointment.save();
    res.status(201).json({ success: true, data: appointment, message: 'Appointment booked successfully' });
}));
// Protected: Manage appointments
router.use(auth_1.checkAuth);
router.get('/', (0, auth_1.checkRole)(['store_owner', 'manager', 'staff']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '20', 10);
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
        Appointment_1.Appointment.find().sort({ startTime: 1 }).skip(skip).limit(limit).exec(),
        Appointment_1.Appointment.countDocuments().exec(),
    ]);
    res.json({ success: true, data: { items, total, page, limit } });
}));
router.put('/:id/status', (0, auth_1.checkRole)(['store_owner', 'manager', 'staff']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { status } = req.body;
    if (!status) {
        throw ApiError_1.ApiError.badRequest('Status is required');
    }
    const appointment = await Appointment_1.Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true }).exec();
    if (!appointment) {
        throw ApiError_1.ApiError.notFound('Appointment not found');
    }
    res.json({ success: true, data: appointment });
}));
exports.default = router;
