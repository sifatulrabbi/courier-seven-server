import type { IMail, IMailSentInfo, IUser } from "../interfaces";
import nodemailer from "nodemailer";
import { transportConfig } from "../configs";
import { ADMIN_EMAILS, MAIL_SUBJECTS } from "../lib/constants";
import { runOnDevMode } from "../lib";

class EmailService {
    private readonly transporter: nodemailer.Transporter;

    private readonly senderEmail: string;

    private headers = {
        "X-company": "Courier Seven",
    };

    constructor() {
        this.senderEmail = transportConfig.auth.user;
        this.transporter = nodemailer.createTransport(transportConfig);
        this.transporter.verify((err: any) => {
            if (err) {
                console.error(err);
                return process.exit(1);
            }
            runOnDevMode(() => {
                console.log("Ready to send emails");
            });
        });
    }

    async sendMail(mail: Omit<IMail, "from">) {
        try {
            const mailObj: IMail = {
                ...mail,
                from: `Courier Seven <${this.senderEmail}>`,
                headers: this.headers,
            };
            const info = await this.transporter.sendMail(mailObj);
            return info;
        } catch (err) {
            console.error("Error occurred while sending email", err);
            return null;
        }
    }

    async sendUserCreationMail(user: IUser) {
        try {
            const mail: IMail = {
                to: ADMIN_EMAILS,
                subject: MAIL_SUBJECTS.userCreated,
                text:
                    "New user created at Courier 007.\nMobile: " + user.mobile,
                html: `
        <h3 style="">New user details</h3>
        <p>
        <strong>Mobile: </strong>${user.mobile}
        </p>
        <a style="color: black;" href="#">Learn More</a>`,
                headers: this.headers,
            };
            const info = await this.sendMail(mail);
            return info;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async sendOtpMail(email: string, otp: string) {
        try {
            const mail: IMail = {
                to: email,
                subject: `${otp} is the ${MAIL_SUBJECTS.sendOtp}`,
                text: "Dear User,\nyour OTP for Courier 007 is: " + otp,
                html: `
        <p>Dear User,</p>
        <p>Your OTP for Courier 007 is: <code><h2>${otp}</h2></code></p>`,
                priority: "high",
                headers: this.headers,
            };
            const info: IMailSentInfo = await this.sendMail(mail);
            return info;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

export const emailService = new EmailService();
