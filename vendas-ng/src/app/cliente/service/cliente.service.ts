import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'http://localhost:56133/api/Cliente';

  constructor(private http: HttpClient) { }
 
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }
  getClienteById(Id: string): Observable<Cliente> {  
    const urlId = `${this.url}/${Id}`;
    return this.http.get<Cliente>(urlId);  
  } 
  createCliente(cliente: Cliente): Observable<Cliente> {  
    return this.http.post<Cliente>(this.url, cliente, httpOptions);  
  }  
  updateCliente(Id: string, cliente: Cliente): Observable<Cliente> {  
    const apiId = `${this.url}/${Id}`;
    return this.http.put<Cliente>(apiId, cliente, httpOptions);  
  }  
  deleteClienteById(Id: string): Observable<number> {  
    const apiId = `${this.url}/${Id}`;
    return this.http.delete<number>(apiId, httpOptions);  
  }  
}