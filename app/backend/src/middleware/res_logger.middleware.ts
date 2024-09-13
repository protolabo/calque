import { Request, Response, NextFunction } from 'express';

// Middleware to log the response content of GET requests
export const responseLogger = (req: Request, res: Response, next: NextFunction) => {
        // Store the original send method
        const originalSend = res.send;
        //
        // Override the res.send method such that in step 1) we console log 2) we call res.send(body)
        //
        res.send = (body?: any): Response => {
            console.log(`\n    Response for ${req.method} ${req.originalUrl}: \n\n`, body);   // Log the response body; body should hold the json response sent by res.json(document)
            // Call the original send method with the body
            return originalSend.call(res, body); //javascript call(this, arg1, arg2, ...)
            //this = res
            //arg1 = body = what was to be sent by the Response 
            //call will execute the res.send(body) stored in the originalSend
            };

    next();
};

export default responseLogger;