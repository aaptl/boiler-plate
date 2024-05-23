import express from 'express';
import httpStatusCodes from 'http-status-codes';
import * as jwt from 'jsonwebtoken';

// Interfaces
import IRequest from '../interfaces/IRequest';

// Utilities
import ApiResponse from '../utilities/api-response.utility';
import Encryption from '../utilities/encryption.utility';
import ApiUtility from '../utilities/api.utility';

// Constants
import constants from '../constants';

export default async (
  req: IRequest,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (constants.APPLICATION.authorizationIgnorePath.indexOf(`${req.originalUrl}`) === -1) {
    const authorizationHeader = ApiUtility.getCookieFromRequest(req, constants.COOKIE.COOKIE_USER);

    if (authorizationHeader) {
      const decoded = await Encryption.verifyCookie(authorizationHeader);

      if (decoded) {
        const user = {}//await userService.getById({ id: decoded.data[constants.COOKIE.KEY_USER_ID] });

        if (user) {
          // @ts-ignore
          req.user = user;
        } else {
          return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
        }
      } else {
        return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
      }
    } else {
      return ApiResponse.error(res, httpStatusCodes.FORBIDDEN);
    }
  }

  next();
};

export const validateToken = (req: IRequest,
  res: express.Response,
  next: express.NextFunction,) =>{
  // Get token from the request headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED,'Unauthorized: Token missing');
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    // Attach the decoded user information to the request for later use
    req.user = decoded;
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
  }
}
