import * as z from "zod";

export const BubbleValidation = z.object({
  title: z.string().nonempty(),
});
