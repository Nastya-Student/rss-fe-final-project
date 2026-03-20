export const generateId = (): string => {
  const uuid = crypto.randomUUID();
  return uuid;
};
