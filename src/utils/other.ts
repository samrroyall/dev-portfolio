export const getLowercaseCharAt = (i: number): string | null =>
  i >= 0 && i <= 25
    ? String.fromCharCode("a".charCodeAt(0) + i)
    : i > 25
      ? getLowercaseCharAt(i / 26 - 1)! + getLowercaseCharAt(i % 26)!
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
