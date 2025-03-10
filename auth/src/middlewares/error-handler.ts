import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/custom-error";

export const errorHandler = (error: Error, req : Request, res : Response, next : NextFunction) => {
    // console.log('Something went wrong', error);

    if (error instanceof CustomError) {
         res.status(error.statusCode).send({ errors: error.serializeErrors() });
      }

    res.status(400).send({
        errors:  [ {
            message: 'Something went wrong!'
        }]
    });
}