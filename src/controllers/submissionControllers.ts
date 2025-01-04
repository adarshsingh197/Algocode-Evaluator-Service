import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { CreateSubmissionZodSchema } from '../dtos/createSubmissionDto';

export function addSubmission(req: Request, res: Response, next: NextFunction): void {
  try {
    // Validate the request body using Zod schema
    const submissionDto = CreateSubmissionZodSchema.parse(req.body);

    console.log(submissionDto);

    // Send the response and terminate the middleware chain
    res.status(201).json({
      success: true,
      error: {},
      message: 'Successfully collected the submission',
      data: submissionDto,
    });
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      res.status(400).json({
        success: false,
        error: error.errors,
        message: 'Validation error',
      });
    } else {
      console.error('Error processing submission:', error);
      next(error); // Forward other errors to the error-handling middleware
    }
  }
}
