import { AuthenticationError } from 'apollo-server-core';
import jwt from 'jsonwebtoken';
import * as Axios from "axios";
import jwkToPem from "jwk-to-pem";

export const verifyAuth0Token = async (
    token: string
): Promise<IAuth0Context> => {
    const options = {
        audience: process.env.AUTH0_AUDIENCE,
        jwksUri: process.env.AUTH_OPTIONS_INTROSPECT_JWKS_URI,
    };
    let tokenInfo: any;
    try {
        const publicKeys = await Axios.default.get<PublicKeys>(options.jwksUri!);
        const pem = jwkToPem(publicKeys.data.keys[0]);

        tokenInfo = jwt.verify(token.split(' ')[1], pem);

        let isAuthorized = true;
        if (Date.now() >= tokenInfo.exp * 1000) {
            isAuthorized = false;
        }

        if (!tokenInfo.aud.includes(options.audience)) {
            isAuthorized = false;
        }


        if (isAuthorized) {
            return {
                isAuthorized,
                userId: tokenInfo.sub
            } as IAuth0Context;
        }
        throw new AuthenticationError("Invalid jwt token.");
    } catch (error) {
        throw new AuthenticationError(
            "Can't verify jwt token. User must be logged in!"
        );
    }
};

interface PublicKeys {
    keys: {
        alg: string;
        e: string;
        kid: string;
        kty: string;
        n: string;
        use: string;
    }[];
}

export interface IAuth0Context {
    userId: string
    isAuthorized: boolean;
}