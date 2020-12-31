import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Moment } from 'moment-timezone';
import { Auth } from '../models/Auth';
import { moment, isExpired, timeRemaining } from '../helpers.function';
import { Member } from 'app/modules/members/member/member.model';
import { sha512 } from 'js-sha512';
import * as aesjs from 'aes-js';

const key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  session_id: string;
  user: Member;
  expires: Moment;
  status = false;

  constructor() { }

  saveSession(user: Member, token: string, expires: string, session_id: string): void {
    this.user = user;
    this.token = token;
    this.session_id = session_id;
    this.expires = moment(expires);
    const obj = {
      token: this.token,
      user: this.user,
      expires: this.expires,
      session_id: this.session_id
    };
    const sessionKey = this.hash(environment.APP_NAME);
    const sessionValue = this.encrypt(JSON.stringify(obj));
    localStorage.setItem(sessionKey, sessionValue);
    this.status = true;
  }

  updateUserData(user: Member): void {
    this.user = user;
    const obj = {
      token: this.token,
      user: this.user,
      expires: this.expires,
      session_id: this.session_id
    };
    const sessionKey = this.hash(environment.APP_NAME);
    const sessionValue = this.encrypt(JSON.stringify(obj));
    localStorage.setItem(sessionKey, sessionValue);
  }

  loadSession(): void {
    try {
      const sessionKey = this.hash(environment.APP_NAME);
      const sessionValue = localStorage.getItem(sessionKey);
      if (!!sessionValue) {
        const obj = JSON.parse(this.decrypt(sessionValue));
        if (!!obj.token && !!obj.expires && !!obj.user) {
          this.token = obj.token;
          this.session_id = obj.session_id;
          this.user = obj.user;
          this.expires = moment(obj.expires);
          this.status = isExpired(this.expires);
        }
      }
    } catch (error) {
      this.status = false;
    }
  }

  saveCredential(auth: Auth): void {
    const sessionKey = this.hash(`${environment.APP_NAME}_auth`);
    const sessionValue = this.encrypt(JSON.stringify(auth));
    localStorage.setItem(sessionKey, sessionValue);
  }

  getCredential(): Auth|false {
    try {
      const sessionKey = this.hash(`${environment.APP_NAME}_auth`);
      const sessionValue = localStorage.getItem(sessionKey);
      if (!!sessionValue) {
        const auth = JSON.parse(this.decrypt(sessionValue));
        return auth;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  clearSession(): void {
    const sessionKey = this.hash(environment.APP_NAME);
    localStorage.removeItem(sessionKey);
    this.clearCredential();
    this.status = false;
  }

  clearCredential(): void {
    const sessionKey = this.hash(`${environment.APP_NAME}_auth`);
    localStorage.removeItem(sessionKey);
  }

  checkTokenStatus(): boolean {
    return this.status = isExpired(this.expires);
  }

  getTokenExpireInMinutes(): number {
    return timeRemaining(this.expires, 'minutes');
  }

  hash(str: string): string {
    return sha512.hex(str);
  }

  encrypt(str: string): string {
    const textBytes = aesjs.utils.utf8.toBytes(str);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);
    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
  }

  decrypt(str: string): string {
    const encryptedBytes = aesjs.utils.hex.toBytes(str);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
  }
}
