import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = 'http://localhost:56133/api/Categoria';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }
  //Selecionar todos Categorias
  getCategorias() : Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.url);
    
  }

  //Apagar Categoria
  deleteCategoria(categoria: Categoria) {
    return this.http.delete<Categoria>(this.url + '/' + categoria.id, this.httpOptions)
  }

  //Adicionar Categoria
  addCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.url, JSON.stringify(categoria), this.httpOptions)
  }

  //Atualiza um carro
  updateCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(this.url + '/' + categoria.id, JSON.stringify(Categoria), this.httpOptions)  
  }
}