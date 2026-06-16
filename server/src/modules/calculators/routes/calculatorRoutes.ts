import { Router, Request, Response } from 'express';
import { ApiError } from '../../../shared/utils/ApiError';

const router = Router();

// Gold value calculator
router.get('/gold', (req: Request, res: Response) => {
  const weight = parseFloat(req.query.weight as string);
  const ratePerGram = parseFloat(req.query.ratePerGram as string); // Gold rate per gram
  const makingChargePercent = parseFloat(req.query.makingChargePercent as string || '0');

  if (isNaN(weight) || isNaN(ratePerGram)) {
    throw ApiError.badRequest('weight and ratePerGram query parameters are required and must be numbers');
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
router.get('/emi', (req: Request, res: Response) => {
  const principal = parseFloat(req.query.principal as string);
  const annualInterestRate = parseFloat(req.query.annualInterestRate as string);
  const tenureMonths = parseInt(req.query.tenureMonths as string, 10);

  if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(tenureMonths)) {
    throw ApiError.badRequest('principal, annualInterestRate, and tenureMonths are required');
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

export default router;
