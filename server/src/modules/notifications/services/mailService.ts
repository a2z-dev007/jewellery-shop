import nodemailer from 'nodemailer';
import { config } from '../../../config/unifiedConfig';
import { logger } from '../../../shared/utils/logger';

interface MailPayload {
  to: string;
  template: 'order_receipt' | 'appointment_booked' | 'lead_alert';
  context: Record<string, any>;
}

export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      auth: {
        user: config.mail.user,
        pass: config.mail.pass,
      },
    });
  }

  async sendMail(payload: MailPayload): Promise<void> {
    try {
      const subjectMap = {
        order_receipt: 'Order Confirmation Receipt',
        appointment_booked: 'Appointment Booking Confirmed',
        lead_alert: 'New Lead Captured Alert',
      };

      const html = this.renderTemplate(payload.template, payload.context);

      const mailOptions = {
        from: config.mail.from,
        to: payload.to,
        subject: subjectMap[payload.template] || 'CommerceOS Notification',
        html,
      };

      await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent successfully to ${payload.to} [Template: ${payload.template}]`);
    } catch (error: any) {
      logger.error(`Failed to send email to ${payload.to}: ${error.message}`);
    }
  }

  private renderTemplate(template: string, context: Record<string, any>): string {
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

export const mailService = new MailService();
