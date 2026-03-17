const TOKEN_KEY = "token";
const USER_KEY = "user";
const REDIRECT_KEY = "tastevia_redirect_after_login";

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const setStoredToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearStoredToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getStoredUser = () => {
  const stored = localStorage.getItem(USER_KEY);

  if (!stored || stored === "undefined") {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to parse stored user", error);
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const setStoredUser = (user: unknown) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearStoredUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const setPostLoginRedirect = (path: string) => {
  sessionStorage.setItem(REDIRECT_KEY, path);
};

export const getPostLoginRedirect = () => sessionStorage.getItem(REDIRECT_KEY);

export const clearPostLoginRedirect = () => {
  sessionStorage.removeItem(REDIRECT_KEY);
};
