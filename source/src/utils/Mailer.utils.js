const nodemailer = require("nodemailer");
const transporter = require("./Mailer.utils");

exports.sendMail = async (to, subject, text) => {
    const transoprter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "haukhung1512005@gmail.com",
            pass: "wqci wrig lbls brly"
        }
    });
    await transoprter.sendMail({
        from: "haukhung1512005@gmail.com",
        to, subject, text
    })
}