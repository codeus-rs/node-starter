export enum ErrorCodes {
    AUTH = 1001,
    OTHER = 9999,
}

export const errorCodeMessage: { [key: number]: string } = {
    1001: 'Authorization failed!',
    9999: 'Unknown error occurred',
};
