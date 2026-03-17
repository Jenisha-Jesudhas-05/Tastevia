import prisma from "../../lib/prisma.js";

export const subscribe = async (email: string) => {
  // Idempotent create so repeated signups don't break UX
  const subscription = await prisma.newsletterSubscription.upsert({
    where: { email },
    update: {},
    create: { email },
  });

  return subscription;
};
