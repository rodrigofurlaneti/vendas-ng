import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'http://localhost:56133/api/Cliente';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }
 
  getClientes() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
    
  }
  getClienteById(id: number) : Observable<any>{  
    const urlById = `${this.url}/${id}`;
    return this.http.get<Cliente>(urlById);  
  } 
  createCliente(cliente: Cliente): Observable<Cliente> {  
    return this.http.post<Cliente>(this.url, cliente, httpOptions);  
  }  

  deleteCliente(cliente: Cliente) {
    return this.http.delete<Cliente>(this.url + '/' + cliente.id, this.httpOptions)
  }

  saveCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, JSON.stringify(cliente), this.httpOptions)
  }

  // utualiza um carro
  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.url + '/' + cliente.id, JSON.stringify(cliente), this.httpOptions)  }
}