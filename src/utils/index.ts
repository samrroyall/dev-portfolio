import emailjs, { type EmailJSResponseStatus } from "@emailjs/nodejs";

export const getLowercaseCharAt = (i: number): string | null =>
  i >= 0 && i <= 25
    ? String.fromCharCode("a".charCodeAt(0) + i)
    : i > 25
      ? getLowercaseCharAt(i / 26 - 1)! + getLowercaseCharAt(i % 26)
      : null;

export const getPrettyDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};

export const mockFunc = async <T>(data: T, delayMs?: number): Promise<T> => {
  const defaultDelayMs = !!process.env.MOCK_DELAY_MS
    ? parseInt(process.env.MOCK_DELAY_MS) || 0
    : 0;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delayMs || defaultDelayMs);
  });
};

interface RecaptchaVerificationResponse {
  success: boolean;
}

export const verifyRecaptcha = async (response: string): Promise<boolean> => {
  const recaptchaUrl = process.env.RECAPTCHA_VERIFICATION_URL;
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!recaptchaUrl || !recaptchaSecretKey) {
    console.error("Missing required Recaptcha configuration properties.");

    return Promise.resolve(false);
  }

  const params = new URLSearchParams({ secret: recaptchaSecretKey, response });

  const verificationResponse = await fetch(recaptchaUrl, {
    method: "POST",
    body: params,
  });

  const data =
    (await verificationResponse.json()) as RecaptchaVerificationResponse;

  return Promise.resolve(data.success);
};

export const isAdmin = async (
  username: string,
  password: string,
): Promise<boolean> => {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminUsername || !adminPasswordHash) {
    console.error("Missing required Admin configuration properties.");

    return Promise.resolve(false);
  }

  return Promise.resolve(
    adminUsername === username &&
      (await Bun.password.verify(password, adminPasswordHash)),
  );
};

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
