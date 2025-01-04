import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validate = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body); // Validate request body
      next(); // Proceed if validation passes
    } catch (error) {
      console.error('Validation Error:', error);

      // Respond with an error but DO NOT use a return statement here
      res.status(400).json({
        success: false,
        message: 'Invalid request parameters received',
        data: {},
        error: error instanceof Error ? error.message : error,
      });
    }
  };
};
