import { Common, ENVIROMENT_VARIABLE } from '@app/common';
import { IHasingPassword } from '@app/common/interfaces/crytography.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class Cryptography {
  constructor(private readonly configService: ConfigService) {}

  public genRandomString(length): string {
    return crypto
      .randomBytes(Math.ceil(+length / 2))
      .toString('hex')
      .slice(0, length);
  }

  public encodeBase64(str) {
    return Buffer.from(str, 'utf8').toString('base64');
  }

  public decodeBase64(buffer) {
    return Buffer.from(buffer, 'base64').toString('utf8');
  }

  private getStringValue(data) {
    if (typeof data === 'number' || data instanceof Number) {
      return data.toString();
    }

    if (!Buffer.isBuffer(data) && typeof data !== 'string') {
      throw new TypeError(
        'Data for password or salt must be a string or a buffer',
      );
    }

    return data;
  }

  public saltHashString(password) {
    const salt = this.genRandomString(32);
    return this.sha512(this.getStringValue(password), salt);
  }

  public desaltHashString(password, salt): string {
    const hash = crypto.createHmac(
      'sha512',
      this.getStringValue(this.decodeBase64(salt)),
    );
    hash.update(this.getStringValue(password));
    return this.encodeBase64(hash.digest('hex'));
  }

  public sha512(str, _secretKey) {
    const hash = crypto.createHmac('sha512', this.getStringValue(_secretKey));
    hash.update(this.getStringValue(str));
    const hashedData = hash.digest('hex');

    return {
      secretKey: this.encodeBase64(_secretKey),
      hashedData: this.encodeBase64(hashedData),
    };
  }

  public isPublicKeyMatching(
    publicKey: string,
    configPrivateKey = 'MERCHANT_CLIENT_PRIVATE_KEY',
    configSecretKey = 'MERCHANT_CLIENT_SECRET_KEY',
  ): boolean {
    const privateKey = this.configService.get<string>(configPrivateKey);
    const secretKey = this.configService.get<string>(configSecretKey);
    const hashedPublicKey = this.desaltHashString(publicKey, privateKey);

    if (hashedPublicKey === secretKey) return true;
    return false;
  }

  public hashSaltPassword(password: string): IHasingPassword {
    const salt = Common.genRandomString(10).toString();
    const hash = crypto.createHmac('sha512', salt).update(password);
    const hashedPassword = hash.digest('hex');
    return { hashedPassword, salt };
  }

  public deHashSaltPassword(password: string, salt: string): string {
    return crypto.createHmac('sha512', salt).update(password).digest('hex');
  }

  encryptOrDecryptData(data: string, isEncrypt: boolean = true): string {
    const ivKey = this.configService.get<string>(ENVIROMENT_VARIABLE.IV_KEY);
    const saltKey = this.configService.get<string>(
      ENVIROMENT_VARIABLE.SALT_KEY,
    );
    const ivBuffer = Buffer.from(ivKey, 'base64');
    const saltBuffer = Buffer.from(saltKey, 'base64');
    if (isEncrypt) {
      const cipher = crypto.createCipheriv('aes-256-ctr', saltBuffer, ivBuffer);
      return Buffer.concat([cipher.update(data), cipher.final()]).toString(
        'base64',
      );
    } else {
      const decipher = crypto.createDecipheriv(
        'aes-256-ctr',
        saltBuffer,
        ivBuffer,
      );
      return Buffer.concat([
        decipher.update(Buffer.from(data, 'base64')),
        decipher.final(),
      ]).toString('utf8');
    }
  }
}
