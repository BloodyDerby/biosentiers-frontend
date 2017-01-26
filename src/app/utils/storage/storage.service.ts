import { Injectable } from '@angular/core';

@Injectable()
export class BioStorageService {

  constructor() { }

  get(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : value;
  }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    const value = this.get(key);
    localStorage.removeItem(key);
    return value;
  }

}
