import { getLocalTimeZone } from "@internationalized/date";
import { z } from "zod";



export const formSchema = z.object({
    name: z.string().min(2, { message: "Vul een naam in" }).max(50, { message: "Naam is te lang" }),
    time: z.string().refine((value) => value.trim().length > 0, {
        message: "Kies een tijd",
    }),
    date: z.string().refine((value) => value.trim().length > 0, {
        message: "Kies een datum",
    }),
});
export type FormSchema = typeof formSchema;