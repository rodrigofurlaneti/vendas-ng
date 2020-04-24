import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargo } from '../models/cargo.model';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  url = 'http://localhost:56133/api/Cargo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }
  //Selecionar todos cargos
  getCargos() : Observable<Cargo[]>{
    return this.http.get<Cargo[]>(this.url);
    
  }

  //Apagar cargo
  deleteCargo(cargo: Cargo) {
    return this.http.delete<Cargo>(this.url + '/' + cargo.id, this.httpOptions)
  }

  //Adicionar cargo
  addCargo(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(this.url, JSON.stringify(cargo), this.httpOptions)
  }

  //Atualiza um carro
  updateCargo(cargo: Cargo): Observable<Cargo> {
    return this.http.put<Cargo>(this.url + '/' + cargo.id, JSON.stringify(cargo), this.httpOptions)  
  }
}