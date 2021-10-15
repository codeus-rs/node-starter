import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import setup from '../config/environment';

const { EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_USER } = setup;

type EmailParamsType = {
    email: string;
    subject?: string;
    text?: string;
    html?: string;
    attachments?: Mail.Attachment[];
};

const transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

/**
 * Service for sending email
 */
abstract class Email {
    public static getTransponder(): nodemailer.Transporter {
        return transporter;
    }

    /**
     *
     * @param params Email details
     * @param isReplyAvailable possibility to reply to the sender. Eg. contact us form!
     * @returns
     */
    public static async send(params: EmailParamsType, isReplyAvailable = false): Promise<any> {
        return transporter.sendMail({
            from: EMAIL_HOST,
            to: isReplyAvailable ? EMAIL_HOST : params.email,
            replyTo: isReplyAvailable ? params.email : undefined,
            subject: params.subject,
            text: params.text,
            html: params.html,
            attachments: params.attachments,
        });
    }
}

export default Email;
