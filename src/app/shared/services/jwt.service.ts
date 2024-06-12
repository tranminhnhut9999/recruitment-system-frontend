import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtUtilService {

  constructor() { }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded: any = this.decodeToken(token);
    if (decoded && decoded.exp) {
      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date;
    }
    return null;
  }

  isTokenExpired(token: string, offsetSeconds: number = 0): boolean {
    const date = this.getTokenExpirationDate(token);
    if (date === null) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }
}