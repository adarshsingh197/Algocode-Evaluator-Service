import { z } from "zod";

// export interface CreateSubmissionDto {
//     userId: string,
//     problemId: string,
//     code: string,
//     language: string
// };

export const CreateSubmissionZodSchema = z.object({
    userId: z.string(),
    problemId: z.string(),
    code: z.string(),
    language: z.string(),
}).strict();


export type CreateSubmissionDto = z.infer<typeof CreateSubmissionZodSchema>;

