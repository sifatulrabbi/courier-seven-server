import { config } from "./config";
import console from "console";
import process from "process";

if (!config.SMTP_EMAIL || !config.SMTP_PASSWORD) {
    console.error("SMTP email and SMTP password required");
    process.exit(1);
}

export const transportConfig = {
    host: "smtp.gmail.com",
    /**
     * update SMTP port from 465 to 587
     * learn more https://www.mailgun.com/blog/which-smtp-port-understanding-ports-25-465-587/
     */
    port: 465,
    secure: true,
    auth: {
        user: config.SMTP_EMAIL,
        pass: config.SMTP_PASSWORD,
    },
};
