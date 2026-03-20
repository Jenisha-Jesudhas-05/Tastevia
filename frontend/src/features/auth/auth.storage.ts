// Keep auth state in memory so nothing lands in localStorage.
let inMemoryUser: unknown = null;

const REDIRECT_KEY = "tastevia_redirect_after_login";

export const getStoredUser = () => inMemoryUser ?? null;

export const setStoredUser = (user: unknown) => {
  inMemoryUser = user;
};

export const clearStoredUser = () => {
  inMemoryUser = null;
};

export const setPostLoginRedirect = (path: string) => {
  sessionStorage.setItem(REDIRECT_KEY, path);
};

export const getPostLoginRedirect = () => sessionStorage.getItem(REDIRECT_KEY);

export const clearPostLoginRedirect = () => {
  sessionStorage.removeItem(REDIRECT_KEY);
};
