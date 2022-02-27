"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const configs_1 = require("../configs");
const constants_1 = require("../lib/constants");
const console_1 = __importDefault(require("console"));
const process_1 = __importDefault(require("process"));
class EmailService {
    constructor() {
        this.senderEmail = configs_1.transportConfig.auth.user;
        this.transporter = nodemailer_1.default.createTransport(configs_1.transportConfig);
        this.transporter.verify((err) => {
            if (err) {
                console_1.default.error(err);
                return process_1.default.exit(1);
            }
            console_1.default.log('Ready to send emails');
        });
    }
    async sendMail(mail) {
        try {
            const mailObj = Object.assign({}, mail);
            mailObj.from = `Courier 007 <${this.senderEmail}>`;
            const info = await this.transporter.sendMail(mail);
            return info;
        }
        catch (err) {
            console_1.default.error('Error occurred while sending email', err);
        }
    }
    async sendUserCreationMail(user) {
        const mail = {
            to: constants_1.ADMIN_EMAILS,
            subject: constants_1.MAIL_SUBJECTS.userCreated,
            text: 'New user created at Courier 007.\nMobile: ' + user.mobile,
            html: `
        <h3 style="">New user details</h3>
        <p>
        <strong>Mobile: </strong>${user.mobile}
        </p>
        <a style="color: black;" href="#">Learn More</a>`,
        };
        const info = await this.sendMail(mail);
        return info;
    }
    async sendOtpMail(email, otp) {
        const mail = {
            to: email,
            subject: `${otp} is the ${constants_1.MAIL_SUBJECTS.sendOtp}`,
            text: 'Dear User,\nyour OTP for Courier 007 is: ' + otp,
            html: `
        <p>Dear User,</p>
        <p>Your OTP for Courier 007 is: <code><h2>${otp}</h2></code></p>`,
        };
        const info = await this.sendMail(mail);
        return info;
    }
}
exports.emailService = new EmailService();
