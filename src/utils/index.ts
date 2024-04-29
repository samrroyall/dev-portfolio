export const getLowercaseCharAt = (i: number): string | null =>
  i >= 0 && i <= 25
    ? String.fromCharCode("a".charCodeAt(0) + i)
    : i > 25
      ? getLowercaseCharAt(i / 26 - 1)! + getLowercaseCharAt(i % 26)
      : null;

export const mockFunc = <T>(data: T, delayMs?: number): Promise<T> => {
  const defaultDelayMs: number = parseInt(process.env.MOCK_DELAY_MS!);
  setTimeout(() => {}, delayMs || defaultDelayMs);
  return Promise.resolve(data);
};
