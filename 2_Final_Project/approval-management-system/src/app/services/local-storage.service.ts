import { Injectable } from '@angular/core';
import { Irequest } from '../interfaces/Irequest';
import { Iuser } from '../interfaces/Iuser';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setItem(key: string, value: string): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): string {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public setUserItem(key: string, value: Iuser): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getUserItem(key: string): Iuser {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public setRequestItem(key: string, value: Irequest): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getRequestItem(key: string): Irequest {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
