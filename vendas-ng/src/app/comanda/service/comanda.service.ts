import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comanda } from '../models/comanda.model';
@Injectable({
  providedIn: 'root'
})
export class ComandaService {
  url = 'http://localhost:56133/api/Comanda';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private http: HttpClient) { }
  //Selecionar todas comandas
  getComandas() : Observable<Comanda[]>{
    return this.http.get<Comanda[]>(this.url);
  }
  //Apagar comanda
  deleteComanda(comanda: Comanda) {
    return this.http.delete<Comanda>(this.url + '/' + comanda.id, this.httpOptions)
  }
  //Adicionar comanda
  addComanda(comanda: Comanda): Observable<Comanda> {
    return this.http.post<Comanda>(this.url, JSON.stringify(comanda), this.httpOptions)
  }
  //Atualiza um comanda
  updateComanda(comanda: Comanda): Observable<Comanda> {
    return this.http.put<Comanda>(this.url + '/' + comanda.id, JSON.stringify(comanda), this.httpOptions)  
  }
}