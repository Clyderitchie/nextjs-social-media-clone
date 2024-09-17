import { Prisma } from "@prisma/client";

export const postDataInclude = {
  //Prisma way of doing a JOIN for the schema. User is the model and select is the data we want to show in the UI/Front End
  user: {
    select: {
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostPayload<{
  include: typeof postDataInclude;
}>;
