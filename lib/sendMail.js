import nodemailer from "nodemailer";

export const sendMail = async(subject, receiver, body) =>{
    try {
        const transporter = nodemailer.createTransport({
           host: process.env.NODEMAILER_HOST,
           port: Number(process.env.NODEMAILER_PORT),
           secure: process.env.NODEMAILER_SECURE === "true",
           family: 4, // force IPv4 - prevents EACCES on blocked IPv6 networks
           auth:{
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
           }
        })

        const options = {
            from: process.env.NODEMAILER_EMAIL,
            to: receiver,
            subject,
            html: body,
        }

        const info = await transporter.sendMail(options);

        return {
            success: true,
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "Failed to send email",
        };
    }
}