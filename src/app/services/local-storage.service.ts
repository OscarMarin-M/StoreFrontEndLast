import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  key: string = 'data';
  private counterSubject: BehaviorSubject<number>;
  constructor() {
    const storedProducts = localStorage.getItem(this.key);
    const initialCounter = storedProducts
      ? JSON.parse(storedProducts).length
      : 0;
    this.counterSubject = new BehaviorSubject<number>(initialCounter);
  }

  getAll(): Product[] {
    const value = localStorage.getItem(this.key);
    return value ? JSON.parse(value) : [];
  }

  insert(product: Product): void {
    const products = this.getAll();
    const existingProduct = products.find((p) => p.id === product.id);
    if (!existingProduct) {
      products.push(product);
    } else {
      for (let i = 0; i < products.length; i++) {
        const element = products[i];
        if ((element.id === product.id)) {
          products[i].stock = products[i].stock + product.stock;
          break;
        }
      }
    }
    localStorage.setItem(this.key, JSON.stringify(products));
    this.updateCounter(products.length);
  }

  delete(productId: string): void {
    let products = this.getAll();
    products = products.filter((product) => product.id !== productId);
    this.updateCounter(products.length);
    localStorage.setItem(this.key, JSON.stringify(products));
  }
  deleteAll() {
    this.updateCounter(0);
    localStorage.setItem(this.key, JSON.stringify([]));
  }

  getCounter() {
    return this.counterSubject.asObservable();
  }

  updateCounter(count: number): void {
    this.counterSubject.next(count);
  }

}
