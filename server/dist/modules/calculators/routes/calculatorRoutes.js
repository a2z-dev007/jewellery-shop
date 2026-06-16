"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApiError_1 = require("../../../shared/utils/ApiError");
const router = (0, express_1.Router)();
// Gold value calculator
router.get('/gold', (req, res) => {
    const weight = parseFloat(req.query.weight);
    const ratePerGram = parseFloat(req.query.ratePerGram); // Gold rate per gram
    const makingChargePercent = parseFloat(req.query.makingChargePercent || '0');
    if (isNaN(weight) || isNaN(ratePerGram)) {
        throw ApiError_1.ApiError.badRequest('weight and ratePerGram query parameters are required and must be numbers');
    }
    const basePrice = weight * ratePerGram;
    const makingCharges = basePrice * (makingChargePercent / 100);
    const totalValue = basePrice + makingCharges;
    res.json({
        success: true,
        data: {
            basePrice,
            makingCharges,
            totalValue,
        },
    });
});
// EMI Calculator
router.get('/emi', (req, res) => {
    const principal = parseFloat(req.query.principal);
    const annualInterestRate = parseFloat(req.query.annualInterestRate);
    const tenureMonths = parseInt(req.query.tenureMonths, 10);
    if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(tenureMonths)) {
        throw ApiError_1.ApiError.badRequest('principal, annualInterestRate, and tenureMonths are required');
    }
    const monthlyRate = annualInterestRate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    const totalPayment = emi * tenureMonths;
    const totalInterest = totalPayment - principal;
    res.json({
        success: true,
        data: {
            monthlyEmi: emi,
            totalPayment,
            totalInterest,
        },
    });
});
exports.default = router;
