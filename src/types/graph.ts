import { z } from "zod";

export const NodeSchema = z.object({
  id: z.string(),
  server: z.string(),
  domain: z.string(),
  color: z.string().optional(),
});
export const NodesSchema = z.array(NodeSchema);
export type InputNode = z.infer<typeof NodeSchema>;

export const LinkSchema = z.object({
  source: z.string(),
  target: z.string(),
  weight: z.number(),
});

export const LinksSchema = z.array(LinkSchema);
export type InputLink = z.infer<typeof LinkSchema>;
