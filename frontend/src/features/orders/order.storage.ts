import type { CheckoutDraft } from "./types/order.types";

const CHECKOUT_DRAFT_KEY = "tastevia_checkout_draft";

export const saveCheckoutDraft = (draft: CheckoutDraft) => {
  sessionStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(draft));
};

export const getCheckoutDraft = (): CheckoutDraft | null => {
  const stored = sessionStorage.getItem(CHECKOUT_DRAFT_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as CheckoutDraft;
  } catch (error) {
    console.error("Failed to parse checkout draft", error);
    sessionStorage.removeItem(CHECKOUT_DRAFT_KEY);
    return null;
  }
};

export const clearCheckoutDraft = () => {
  sessionStorage.removeItem(CHECKOUT_DRAFT_KEY);
};
