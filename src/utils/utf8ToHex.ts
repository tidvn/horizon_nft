export function utf8ToHex(str:string):string {
    return Buffer.from(str, 'utf8').toString('hex');
}