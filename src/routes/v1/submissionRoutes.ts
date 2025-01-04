import express from "express";

import { addSubmission } from "../../controllers/submissionControllers";
import { validate } from "../../validator/createSubmissionValidator";
import { CreateSubmissionZodSchema } from "../../dtos/createSubmissionDto";
const submissionRouter = express.Router();

submissionRouter.post(
    '/', 
    validate(CreateSubmissionZodSchema),
    addSubmission
);

export default submissionRouter;