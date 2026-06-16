"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailService = exports.MailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const unifiedConfig_1 = require("../../../config/unifiedConfig");
const logger_1 = require("../../../shared/utils/logger");
class MailService {
    transporter;
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: unifiedConfig_1.config.mail.host,
            port: unifiedConfig_1.config.mail.port,
            auth: {
                user: unifiedConfig_1.config.mail.user,
                pass: unifiedConfig_1.config.mail.pass,
            },
        });
    }
    async sendMail(payload) {
        try {
            const subjectMap = {
                order_receipt: 'Order Confirmation Receipt',
                appointment_booked: 'Appointment Booking Confirmed',
                lead_alert: 'New Lead Captured Alert',
            };
            const html = this.renderTemplate(payload.template, payload.context);
            const mailOptions = {
                from: unifiedConfig_1.config.mail.from,
                to: payload.to,
                subject: subjectMap[payload.template] || 'CommerceOS Notification',
                html,
            };
            await this.transporter.sendMail(mailOptions);
            logger_1.logger.info(`Email sent successfully to ${payload.to} [Template: ${payload.template}]`);
        }
        catch (error) {
            logger_1.logger.error(`Failed to send email to ${payload.to}: ${error.message}`);
        }
    }
    renderTemplate(template, context) {
        // Standard template templates renderer
        switch (template) {
            case 'order_receipt':
                return `
          <h1>Thank you for your purchase, ${context.name}!</h1>
          <p>Your order ID is <strong>${context.orderId}</strong>.</p>
          <p>Total amount paid: <strong>$${context.amount}</strong>.</p>
        `;
            case 'appointment_booked':
                return `
          <h1>Hi ${context.name}, your appointment is confirmed!</h1>
          <p>Service: <strong>${context.service}</strong></p>
          <p>Time: <strong>${context.time}</strong></p>
        `;
            case 'lead_alert':
                return `
          <h1>New Lead Alert</h1>
          <p>A new lead has submitted details:</p>
          <p>Name: ${context.name}</p>
          <p>Email: ${context.email}</p>
        `;
            default:
                return `<p>${JSON.stringify(context)}</p>`;
        }
    }
}
exports.MailService = MailService;
exports.mailService = new MailService();
