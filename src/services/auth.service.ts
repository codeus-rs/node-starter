import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import env from '../config/environment';

const { SIGNING_KEY, ENCRYPTION_KEY, STATIC_IV } = env;
const algorithm = 'aes256';

/**
 * Verifying the token
 * @param token - token to be verified
 * @returns result of verification
 */
export function verify(token: string | undefined): string | object {
    if (token !== undefined) {
        return jwt.verify(token, SIGNING_KEY);
    }
    throw Error('Token for verification is missing');
}

/**
 * Signing the data
 * @param payload - payload as JSON object with data to be signed
 * @param expire - expiration time for generated token
 */
export function sign(payload: object, expire: string | number = '999 years'): string {
    return jwt.sign(payload, SIGNING_KEY, { expiresIn: expire });
}

/**
 * Hashing provided data
 * @param text - data to hash
 */
export async function hash(text: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.scrypt(text, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ':' + derivedKey.toString('hex'));
        });
    });
}

/**
 * Comparing the visible and hashed data
 * @param text - visible data for comparison
 * @param hashedText - hashed data for comparison
 * @returns boolean response if the two inputs are the same
 */
export async function compare(text: string, hashedText: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const [salt, key] = hashedText.split(':');
        crypto.scrypt(text, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'));
        });
    });
}

/**
 * Encrypting provided data
 * @param text - data to encrypt
 * @param randomIV - determines if IV is going to be random or used from env
 * @param isRegular - if true (default), than standard key is used for encryption, otherwise key for validating Bite secret is generated
 */
export function encrypt(text: string, randomIV = false): string {
    const iv: string = randomIV ? crypto.randomBytes(16).toString('hex').slice(0, 16) : STATIC_IV;
    const cipher: crypto.Cipher = crypto.createCipheriv(algorithm, ENCRYPTION_KEY, iv);
    const encrypted: string = String(cipher.update(text, 'utf8', 'hex')) + cipher.final('hex');
    return `${iv}-${encrypted}`;
}

/**
 * Decrypting provided text and returning the usable data
 * @param encryptedText - text to be decrypted
 * @param isRegular - if true (default), than standard key is used for decryption, otherwise key for validating Bite secret is decrypted
 */
export function decrypt(encryptedText: string): string {
    const params: string[] = encryptedText.split('-');
    if (params.length !== 2) {
        throw Error('Invalid hash. Parameters extraction failed!');
    }
    const iv: string = params[0];
    const value: string = params[1];
    const decipher: crypto.Decipher = crypto.createDecipheriv(algorithm, ENCRYPTION_KEY, iv);
    return decipher.update(value, 'hex', 'utf8') + decipher.final('utf8');
}

export default {
    verify,
    sign,
    hash,
    compare,
    encrypt,
    decrypt,
    newUID: uuidv4(),
};
