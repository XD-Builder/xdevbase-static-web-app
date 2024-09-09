import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { useServerTranslation } from "@/i18n";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { asOptionalField } from "@/utils/utils";

export const authRouter = createTRPCRouter({
  getProfile: privateProcedure.query(({ ctx }) => {
    return ctx.db.profiles.findFirstOrThrow({
      where: {
        id: ctx.user.id,
      },
    });
  }),
  updateProfile: privateProcedure
    .input(
      z.object({
        avatarUrl: asOptionalField(z.string().url()).nullable(),
        username: z.string().optional(),
        fullName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { t } = await useServerTranslation();
      if (input.username) {
        const existingUsername = await ctx.db.profiles.findUnique({
          where: { username: input.username },
        });

        if (existingUsername) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: t("trpcError.usernameAlreadyExists"),
          });
        }
      }

      return ctx.db.profiles.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          ...input,
        },
      });
    }),
});
