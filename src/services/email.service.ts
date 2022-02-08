import nodemailer from "nodemailer";

export class SendMail {
  testAccount!: nodemailer.TestAccount;

  constructor() {
    this.genTestUser();
  }

  private async genTestUser() {
    this.testAccount = await nodemailer.createTestAccount();
  }
}
