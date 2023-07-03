export const isSessionExpired = () => {
  const sessionExpiration = localStorage.getItem('SESSION-EXPIRATION');

  if (!sessionExpiration) return true;

  const currentDate = new Date();
  const expirationDate = new Date(currentDate + sessionExpiration);

  return expirationDate > currentDate;
};

export const clearSession = () => {
  localStorage.removeItem('SESSION-EXPIRATION');
  localStorage.removeItem('USERID');
};

export const getUserId = () => {
  return localStorage.getItem('USERID');
};
