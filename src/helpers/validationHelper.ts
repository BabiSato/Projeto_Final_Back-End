export const isValidName = (name: string): boolean => {
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;
  return nameRegex.test(name);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidpasswordHash = (passwordHash: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(passwordHash);
};

export const isValidPrice = (price: number): boolean => {
  return price > 0;
};

export const isValidTitle = (title: string): boolean => {
  return title.length >= 3;
};