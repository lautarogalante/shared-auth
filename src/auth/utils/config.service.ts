import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFileSync);

@Injectable()
export class ConfigService {

    async getPrivateKey(): Promise<string> {
        const privateKey = '../keys/private-key.pem';
        const clavePrivada = await readFileAsync(privateKey, 'utf-8');

        return clavePrivada as string;
    }

    async getPublicKey(): Promise<string> {
        const publicKey = '../keys/public-key.pem';
        const clavePublica = await readFileAsync(publicKey, 'utf-8');

        return clavePublica as string; 
    }
}