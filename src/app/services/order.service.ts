import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../interface/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


//se necesita injectar un cliente http para, sin el constructor: necesita ser private
private  http=inject(HttpClient);


list(){

  //ojo que en el servicio get
  //despues de .get se recibe la INTERFACE/MODELO que se recibira desde el backend()
  //nota: para generar un interface rapido puedes utilizar la extension PASTE JSON TO AS CODE
  return this.http.get<Order[]>('http://localhost:8080/order')
}

//estructura: id: logra es la variable que recibira el servicio, su tipo
get(id: string){
  return this.http.get<Order>(`http://localhost:8080/order/${id}`)
}
//lo que parentesis RECIBE un contact que no tiene defina una estrucutura de momento por eso : any
create(order: Order){
  return this.http.post<Order>('http://localhost:8080/order', order)
}

update(id:string, order: Order){
  return this.http.put<Order>(`http://localhost:8080/order/${id}`, order)
}

delete(id: string){
  return this.http.delete<void>(`http://localhost:8080/order/${id}`, {responseType:'text' as 'json'})
}

}
