import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../interface/category.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

//se necesita injectar un cliente http para, sin el constructor: necesita ser private
private  http=inject(HttpClient);


list(){

  //ojo que en el servicio get
  //despues de .get se recibe la INTERFACE/MODELO que se recibira desde el backend()
  //nota: para generar un interface rapido puedes utilizar la extension PASTE JSON TO AS CODE
  return this.http.get<Category[]>('http://localhost:8080/categories')
}

//estructura: id: logra es la variable que recibira el servicio, su tipo
get(id: string){
  return this.http.get<Category>(`http://localhost:8080/categories/${id}`)
}
//lo que parentesis RECIBE un contact que no tiene defina una estrucutura de momento por eso : any
create(contact: Category){
  return this.http.post<Category>('http://localhost:8080/categories', contact)
}

update(id:string, contact: Category){
  return this.http.put<Category>(`http://localhost:8080/categories/${id}`, contact)
}

delete(id: string){
  return this.http.delete<void>(`http://localhost:8080/categories/${id}`, {responseType:'text' as 'json'})
}
}
