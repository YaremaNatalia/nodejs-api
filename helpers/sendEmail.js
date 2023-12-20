import nodemailer from "nodemailer";
import "dotenv/config"; //виклик методу конфігурації в dotenv який записує інф з файлу .env в глобальний обєкт process.env

const { UKR_NET_PASSWORD, UKR_NET_EMAIL } = process.env;
// створення обєкту з налаштуваннями для відправки листів верифікації  email використовуючи поштовий сервіс  UKR.NET
const nodemailerCongig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};
const transport = nodemailer.createTransport(nodemailerCongig); // створення транспорту для відправки листів

const data = {
  to: "yiropa7089@jalunaki.com",
  subject: "Verification email",
  html: "<strong>Please, verify your email<strong>",
};

const sendEmail = (data) => {
  const email = { ...data, from: UKR_NET_EMAIL };
  return transport.sendMail(email);
};

export default sendEmail;
