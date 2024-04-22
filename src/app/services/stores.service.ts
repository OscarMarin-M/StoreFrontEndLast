import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '../interface/store.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

//se necesita injectar un cliente http para, sin el constructor: necesita ser private
private  http=inject(HttpClient);


list(){

  //ojo que en el servicio get
  //despues de .get se recibe la INTERFACE/MODELO que se recibira desde el backend()
  //nota: para generar un interface rapido puedes utilizar la extension PASTE JSON TO AS CODE
  return this.http.get<Store[]>('http://localhost:8080/stores')
}

//estructura: id: logra es la variable que recibira el servicio, su tipo
get(id: string){
  return this.http.get<Store>(`http://localhost:8080/stores/${id}`)
}
//lo que parentesis RECIBE un contact que no tiene defina una estrucutura de momento por eso : any
create(contact: Store){
  return this.http.post<Store>('http://localhost:8080/stores', contact)
}

update(id:string, contact: Store){
  return this.http.put<Store>(`http://localhost:8080/stores/${id}`, contact)
}

delete(id: string){
  return this.http.delete<void>(`http://localhost:8080/stores/${id}`, {responseType:'text' as 'json'})
}
}
