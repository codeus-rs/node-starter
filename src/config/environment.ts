export type ENV = {
    NODE_ENV: string;
    PORT: number;
    SIGNING_KEY: string;
    ENCRYPTION_KEY: string;
    STATIC_IV: string;
    CLIENT: string;
    EMAIL_HOST: string;
    EMAIL_PORT: string;
    EMAIL_USER: string;
    EMAIL_PASS: string;
    DB_URL: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
};

/**
 * We have to use type unknown since NodeJS.ProcessEnv is too unspecific type and values can be string | undefined
 * which creates problem later on when passing as a value and "undefined" is not valid type
 */
const envConstants: ENV = process.env as unknown as ENV;
export const isDevMode: boolean = envConstants.NODE_ENV === 'development';
export const fileSize = 25;
export default {
    ...envConstants,
};
