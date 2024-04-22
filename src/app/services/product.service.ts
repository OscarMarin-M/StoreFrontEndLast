import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

//se necesita injectar un cliente http para, sin el constructor: necesita ser private
private  http=inject(HttpClient);


list(){

  //ojo que en el servicio get
  //despues de .get se recibe la INTERFACE/MODELO que se recibira desde el backend()
  //nota: para generar un interface rapido puedes utilizar la extension PASTE JSON TO AS CODE
  return this.http.get<Product[]>('http://localhost:8080/products')
}

//estructura: id: logra es la variable que recibira el servicio, su tipo
get(id: string){
  return this.http.get<Product>(`http://localhost:8080/products/${id}`)
}
//lo que parentesis RECIBE un contact que no tiene defina una estrucutura de momento por eso : any
create(product: Product){
  return this.http.post<Product>('http://localhost:8080/products', product)
}

update(id:string, product: Product){
  return this.http.put<Product>(`http://localhost:8080/products/${id}`, product)
}

delete(id: string){
  return this.http.delete<void>(`http://localhost:8080/products/${id}`, {responseType:'text' as 'json'})
}
}
