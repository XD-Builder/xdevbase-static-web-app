import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { LemonsqueezyClient } from "lemonsqueezy.ts";
import { env } from "@/env.mjs";
import { TRPCError } from "@trpc/server";
import { checkIfSubscribed } from "@/shared/hooks/useUserSubscription";
import { z } from "zod";

const client = new LemonsqueezyClient(env.LEMON_SQUEEZY_API_KEY);

const createPremiumCheckoutSchema = z.object({
  language: z.enum(["en", "zh-CN"]),
});

const dashboardURL = `${env.NEXT_PUBLIC_ROOT_URL}/dashboard`;

const checkoutTranslations: Record<"en" | "zh-CN", LemonsqueezyProductOptions> = {
  en: {
    description: "Display your automation Solution to your customers",
    name: "XDevbase Subscription",
    receipt_button_text: "Go to subscription",
    receipt_link_url: dashboardURL,
    receipt_thank_you_note: "Thank you for your purchase!",
    redirect_url: dashboardURL,
  },
  "zh-CN": {
    description: "展示您的自动化解决方案给您的客户",
    name: "XDevbase 订阅",
    receipt_button_text: "转到订阅",
    receipt_link_url: dashboardURL,
    receipt_thank_you_note: "感谢您的购买！",
    redirect_url: dashboardURL,
  },
};

export const paymentsRouter = createTRPCRouter({
  createPremiumCheckout: privateProcedure
    .input(createPremiumCheckoutSchema)
    .mutation(async ({ ctx, input }) => {
      const language = input.language;
      const translations = checkoutTranslations[language];
      const newCheckout = await client.createCheckout({
        checkout_data: {
          custom: {
            userId: ctx.user.id,
          },
          name: ctx.user.email || "",
          email: ctx.user.email || "",
        },
        checkout_options: {
          embed: true,
        },

        store: env.LEMON_SQUEEZY_STORE_ID,
        variant: env.LEMON_SQUEEZY_SUBSCRIPTION_VARIANT_ID,
        product_options: translations,
      });

      return newCheckout.data.attributes.url;
    }),
  cancelSubscription: privateProcedure.mutation(async ({ ctx }) => {
    const subscription = await ctx.db.subscriptions.findFirst({
      where: {
        profileId: ctx.user.id,
      },
    });

    if (!subscription || subscription.status !== "active") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Subscription not found or not active",
      });
    }
    const updateResult = await client.updateSubscription({
      id: subscription.lemonSqueezyId,
      cancelled: true,
    });

    const didCancelSuccessfully =
      updateResult.data.attributes.cancelled === true;

    if (!didCancelSuccessfully) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to cancel subscription",
      });
    }
  }),
  getSubscriptionInfo: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.subscriptions.findFirst({
      where: {
        profileId: ctx.user.id,
      },
      select: {
        endsAt: true,
        renewsAt: true,
        status: true,
        updatePaymentUrl: true,
      },
    });
  }),
  getCustomerPortalUrl: privateProcedure.query(async ({ ctx }) => {
    const subscription = await ctx.db.subscriptions.findFirst({
      where: {
        profileId: ctx.user.id,
      },
    });

    const isSubscribed = checkIfSubscribed(subscription?.status);

    if (!subscription || !isSubscribed) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Subscription not found or not active",
      });
    }

    const subscriptionResult = await client.retrieveSubscription({
      id: subscription.lemonSqueezyId,
    });

    return subscriptionResult.data.attributes.urls.customer_portal as string;
  }),
});

/**
 * The options for a Lemonsqueezy product
 */
interface LemonsqueezyProductOptions {
  /**
   * A custom description for the product
   */
  description: string;
  /**
   * An array of variant IDs to enable for this checkout. If this is empty, all variants will be enabled
   */
  enabled_variants?: Array<string>;
  /**
   * An array of image URLs to use as the product's media
   */
  media?: Array<string>;
  /**
   * A custom name for the product
   */
  name: string;
  /**
   * A custom text to use for the order receipt email button
   */
  receipt_button_text: string;
  /**
   * A custom URL to use for the order receipt email button
   */
  receipt_link_url: string;
  /**
   * A custom thank you note to use for the order receipt email
   */
  receipt_thank_you_note: string;
  /**
   * A custom URL to redirect to after a successful purchase
   */
  redirect_url: string;
}
