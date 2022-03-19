// type of the mail object
export interface IMail {
  from?: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
  priority?: 'high' | 'low' | 'normal';
  headers?: any;
}

// type of the returned object from nodemailer transporter
export interface IMailSentInfo {
  messageId: string;
  envelope: Record<any, any>;
  accepted: any[];
  rejected: any[];
  pending: any[];
  response: string;
}
