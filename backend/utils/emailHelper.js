import nodemailer from 'nodemailer';

const address= process.env.EMAIL_USER;


export const sendMail = async (
  recipient,
  subject,
  message,
  html = '',
  attachments = false,
) => {
    let info;
  try {

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    }
    
    );

    if (attachments) {
      info = await transporter.sendMail({
        from: `Order Me <${address}>`,
        to: recipient,
        subject: subject,
        text: message,
        html: html,
        attachments: [
          {
            filename: attachments.filename,
            path: attachments.path,
          },
        ],
      });
      return 'Message sent with attachment';
    } else {
      info = await transporter.sendMail({
        from: `Order Me <${address}>`,
        to: recipient,
        subject: subject,
        text: message,
        html: html,
      });
    }

    console.log('Message sent: %s', info.messageId);
    return 'Message sent';
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};
