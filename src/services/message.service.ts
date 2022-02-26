// import Vonage from "@vonage/server-sdk";
// import { config } from "../configs";

class MessageService {
  // client: Vonage;
  // constructor() {
  //   if (!config.VONAGE_API_KEY || !config.VONAGE_API_SECRET) {
  //     throw new Error("Vonage api key and secret is required");
  //   }
  //   this.client = new Vonage({
  //     apiKey: config.VONAGE_API_KEY,
  //     apiSecret: config.VONAGE_API_SECRET,
  //   });
  // }
  // async sendOtp(to: string, otp: string) {
  //   const from = "Courier 007";
  //   const text = "Your OTP for Courier 007 is:\n" + otp;
  //   let info;
  //   this.client.message.sendSms(from, to, text, {}, (err, responseData) => {
  //     if (err) {
  //       throw new Error(String(err));
  //     } else {
  //       if (responseData.messages[0]["status"] === "0") {
  //         info = "Message sent successfully.";
  //       } else {
  //         throw new Error(
  //           `Message failed with error: ${responseData.messages[0]["error-text"]}`
  //         );
  //       }
  //     }
  //   });
  //   return info;
  // }
}

export const messageService = new MessageService();
