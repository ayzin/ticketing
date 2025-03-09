import express, {Request, Response} from 'express'; 
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters')
] ,
validateRequest,
async (req : Request, res : Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email is already in use');
    }

    try {
        const user = User.build({ email, password });
        await user.save();

        // generate jwt 
        const userJwt = jwt.sign({
                id : user.id, 
                email: user.email
            }, 
            process.env.JWT_KEY!
        );

        // Store it on Session object
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send({ errors : [
            {
                message: 'Something went wrong, please try again later.'
            }
        ]});
    }
});

export { router as signUpRouter}