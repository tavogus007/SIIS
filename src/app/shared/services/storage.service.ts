import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  get(key: string) {
    return JSON.parse(sessionStorage.getItem(key) || '{}') || {};
    //return JSON.parse(localStorage.getItem(key) || '{}') || {};
  }

  set(key: string, value: any): boolean {
    sessionStorage.setItem(key, JSON.stringify(value));
    //localStorage.setItem(key, JSON.stringify(value));

    return true;
  }

  has(key: string): boolean {
    return !!sessionStorage.getItem(key);
    //return !!localStorage.getItem(key);
  }

  remove(key: string) {
    sessionStorage.removeItem(key);
    //localStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
    //localStorage.clear();
  }
}

export class MemoryStorageService {
  private store: { [k: string]: string } = {};

  get(key: string) {
    return JSON.parse(this.store[key] || '{}') || {};
  }

  set(key: string, value: any): boolean {
    this.store[key] = JSON.stringify(value);
    return true;
  }

  has(key: string): boolean {
    return !!this.store[key];
  }

  remove(key: string) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}
