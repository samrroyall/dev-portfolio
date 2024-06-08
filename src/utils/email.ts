import "dotenv/config";
import emailjs, { type EmailJSResponseStatus } from "@emailjs/nodejs";

export const sendEmail = async (
  name: string,
  email: string,
  body: string,
): Promise<EmailJSResponseStatus> => {
  try {
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;

    if (!privateKey || !publicKey || !serviceId || !templateId) {
      return Promise.resolve({
        status: 500,
        text: "Missing configuration properties",
      });
    }

    return emailjs.send(
      serviceId,
      templateId,
      { name, email, body },
      { privateKey, publicKey },
    );
  } catch (err) {
    return Promise.resolve({ status: 500, text: `${err}` });
  }
};
