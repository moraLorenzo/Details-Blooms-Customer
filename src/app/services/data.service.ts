import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { DefaultImage } from '../data-schema';

import * as CryptoJS from 'crypto-js';
import * as aes from 'crypto-js/aes';
import * as encHex from 'crypto-js/enc-hex';
import * as padZeroPadding from 'crypto-js/pad-zeropadding';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/';

  version_number = '1.1.0';

  private keyString = new DefaultImage();
  constructor(private http: HttpClient, private _user: UserService) {
    // console.log('Data service is working');
    // sessionStorage.setItem('token', 'guest');
    this.set_user_status();
  }

  set_user_status() {
    let user_status = sessionStorage.getItem('token');
    // console.log(user_status);
    if (!user_status) {
      sessionStorage.setItem('token', 'guest');
    } else if (user_status == 'guest') {
      // console.log('Still a Guest');
    } else {
      // console.log('Logged In');
    }
  }

  processData(api: any, load: any, sw: any) {
    let payload = {
      load: load,
      token: this._user.getToken(),
      userid: this._user.getUserID(),
    };
    switch (sw) {
      case 1:
        return this.http.post(
          this.url + api,
          this.convertmessage(
            unescape(encodeURIComponent(JSON.stringify(payload)))
          )
        );
      case 2:
        return this.http.post(
          this.url + api,
          this.convertmessage(
            unescape(encodeURIComponent(JSON.stringify(load)))
          )
        );
      case 3:
        return this.http.post(this.url + api, load);
      default:
        return null;
    }
  }

  decrypt(encryptedString: string) {
    let key = this.keyString.defaultmessage;
    let encryptMethod = 'AES-256-CBC';
    let encryptLength = parseInt(encryptMethod.match(/\d+/)![0]);
    let json = JSON.parse(
      CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encryptedString))
    );
    let salt = CryptoJS.enc.Hex.parse(json.salt);
    let iv = CryptoJS.enc.Hex.parse(json.iv);

    let encrypted = json.ciphertext;

    let iterations = parseInt(json.iterations);
    if (iterations <= 0) {
      iterations = 999;
    }
    let encryptMethodLength = encryptLength / 4;
    let hashKey = CryptoJS.PBKDF2(key, salt, {
      hasher: CryptoJS.algo.SHA512,
      keySize: encryptMethodLength / 8,
      iterations: iterations,
    });

    let decrypted = CryptoJS.AES.decrypt(encrypted, hashKey, {
      mode: CryptoJS.mode.CBC,
      iv: iv,
    });

    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }

  private convertmessage(msg: string) {
    let keyString = this._user.genHexString(32);
    let ivString = this._user.genHexString(32);
    let key = encHex.parse(keyString);
    let iv = encHex.parse(ivString);

    return (
      this.keyString.generateSalt() +
      iv +
      key +
      aes.encrypt(msg, key, { iv: iv, padding: padZeroPadding }).toString()
    );
  }

  async request(endpoint: any, data: any) {
    return await this.http
      .post(this.url + endpoint, JSON.stringify(data))
      .toPromise();
  }

  ger_ver() {
    return this.version_number;
  }

  public async updateImage(update: any) {
    const formData = new FormData();
    formData.append('order_id', update.order_id);

    const URL =
      'https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/dXBkYXRlX29yZGVy';

    if (update.payment) {
      const posterFile = await fetch(update.payment);
      const blob = await posterFile.blob();
      formData.append('payment', blob);
    }
    return await this.http.post(URL, formData).toPromise();
  }

  formData(data: any) {
    return this.http.post(
      'https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/dXBkYXRlX29yZGVy',
      data
    );
  }
}
