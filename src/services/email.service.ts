import nodemailer from "nodemailer";
import { transportConfig } from "../configs";
import { IMail, IUser } from "../interfaces";
import { ADMIN_EMAILS, MAIL_SUBJECTS } from "../libs/constants";

class EmailService {
  private readonly transporter: nodemailer.Transporter;
  private readonly senderEmail: string;

  constructor() {
    this.senderEmail = transportConfig.auth.user;
    this.transporter = nodemailer.createTransport(transportConfig);
    this.transporter.verify((err: any, success: boolean) => {
      if (err) {
        console.error(err);
        return process.exit(1);
      }
      console.log("Ready to send emails");
    });
  }

  async sendMail(mail: IMail) {
    try {
      mail.from = `Courier 007 <${this.senderEmail}>`;
      const info = await this.transporter.sendMail(mail);
      return info;
    } catch (err) {
      console.error("Error occurred while sending email", err);
    }
  }

  async sendUserCreationMail(user: IUser) {
    const mail: IMail = {
      to: ADMIN_EMAILS,
      subject: MAIL_SUBJECTS.userCreated,
      text: `
        New user created at Courier 007. 
        Username: ${user.name.first} ${user.name.last} 
        mobile: ${user.mobile}`,
      html: `
        <h3 style="">New user details</h3>
        <p>
          <strong>Username: </strong>${user.name.first} ${user.name.last}<br/>
          <strong>Mobile: </strong>${user.mobile}
        </p>
        <a style="color: black;" href="#">Learn More</a>`,
    };
    const info = await this.sendMail(mail);
    return info;
  }

  async sendOtpMail(email: string, otp: string) {
    const mail: IMail = {
      to: email,
      subject: `${otp} is the ${MAIL_SUBJECTS.sendOtp}`,
      text: `
        Dear User,
        Your OTP is ${otp}`,
      html: `
        Dear User,
        Your OTP for Courier 007 is: <code><h2>${otp}</h2></code>`,
    };
    const info = await this.sendMail(mail);
    return info;
  }
}

export const emailService = new EmailService();
