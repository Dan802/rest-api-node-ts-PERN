import {Request, Response, NextFunction} from 'express'
import { validationResult} from "express-validator"

export const handleInputErrors = (req : Request, res : Response, next: NextFunction) => {
  let errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors : errors.array()
    })
  }

  next()
}

export const printBody = (req : Request, res : Response, next: NextFunction) => {
  console.log(req.body)
  next()
}