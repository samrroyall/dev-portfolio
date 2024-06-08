import { type RecaptchaVerificationResponse } from "../models/auth";

export const verifyRecaptcha = async (response: string): Promise<boolean> => {
  const recaptchaUrl = process.env.RECAPTCHA_VERIFICATION_URL;
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!recaptchaUrl || !recaptchaSecretKey) {
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
    return Promise.resolve(false);
  }

  return Promise.resolve(
    adminUsername === username &&
      (await Bun.password.verify(password, adminPasswordHash)),
  );
};
