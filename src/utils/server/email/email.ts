import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface ICreateOrder {
  orderId: string;
  totalAmount: number;
  paymentUrl: string;
  email: string;
}

export const createOrderMail = async ({
  orderId,
  totalAmount,
  paymentUrl,
  email,
}: ICreateOrder) => {
  try {
    const info = await transporter.sendMail({
      from: {
        name: "Next Pizza",
        address: process.env.EMAIL_USER as string,
      }, // sender address
      to: email, // list of receivers
      subject: `Next Pizza | Оплатите заказ №${orderId}`, // Subject line
      html: `<p>Оплатите заказ на сумму ${totalAmount} ₽. Перейдите по этой <a href="${paymentUrl}">ссылке</a> для оплаты заказа.</p>`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error(error);
  }
};

interface ISuccessPayment {
  orderId: string;
  totalAmount: number;
  email: string;
}

export const successPayment = async ({
  orderId,
  totalAmount,
  email,
}: ISuccessPayment) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: email, // list of receivers
      subject: `Next Pizza | Спасибо за покупку`, // Subject line
      html: `<p>Ваш заказ №${orderId} на сумму ${totalAmount} ₽ успешно оплачен!!!</p>`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error(error);
  }
};
