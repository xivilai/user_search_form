import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

function validateUserSearch(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    number: Joi.string().pattern(new RegExp(/^\d{2}-\d{2}-\d{2}$/))
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}

export { validateUserSearch }