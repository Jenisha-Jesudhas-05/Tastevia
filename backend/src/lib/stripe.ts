import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2026-02-25.clover",
    })
  : null;

export const assertStripe = () => {
  if (!stripe) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  return stripe;
};
