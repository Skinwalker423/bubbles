import * as z from "zod";

export const BubbleValidation = z.object({
  bubble: z
    .string()
    .nonempty()
    .min(3, { message: "Minimum 3 characters" }),
  accountId: z.string().nonempty(),
});
export const CommentValidation = z.object({
  bubble: z
    .string()
    .nonempty()
    .min(3, { message: "Minimum 3 characters" }),
});
