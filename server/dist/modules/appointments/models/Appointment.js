"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const mongoose_1 = require("mongoose");
const tenantPlugin_1 = require("../../../shared/database/tenantPlugin");
const AppointmentSchema = new mongoose_1.Schema({
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    serviceName: { type: String, required: true },
    duration: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
        default: 'PENDING',
        index: true,
    },
    staffId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
AppointmentSchema.index({ storeId: 1, startTime: 1 });
AppointmentSchema.index({ storeId: 1, staffId: 1, startTime: 1 });
AppointmentSchema.plugin(tenantPlugin_1.tenantPlugin);
exports.Appointment = (0, mongoose_1.model)('Appointment', AppointmentSchema);
