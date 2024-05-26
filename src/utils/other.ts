export const getLowercaseCharAt = (i: number): string | null =>
  i >= 0 && i <= 25
    ? String.fromCharCode("a".charCodeAt(0) + i)
    : i > 25
      ? getLowercaseCharAt(i / 26 - 1)! + getLowercaseCharAt(i % 26)!
      : null;

export const getPrettyDate = (date: number): string =>
  new Date(date).toLocaleString("en-US", {
    dateStyle: "long",
  });

export const getPrettyDateTime = (date: number): string =>
  new Date(date).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

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
