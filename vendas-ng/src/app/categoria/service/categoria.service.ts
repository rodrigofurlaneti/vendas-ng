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

  //Selecionar um Categoria
  getCategoriaById(id: number) : Observable<any>{  
    const urlById = `${this.url}/${id}`;
    return this.http.get<Categoria>(urlById);  
  } 

  //Apagar Categoria
  deleteCategoria(Categoria: Categoria) {
    return this.http.delete<Categoria>(this.url + '/' + Categoria.id, this.httpOptions)
  }

  //Adicionar Categoria
  addCategoria(Categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.url, JSON.stringify(Categoria), this.httpOptions)
  }

  //Atualiza um carro
  updateCategoria(Categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(this.url + '/' + Categoria.id, JSON.stringify(Categoria), this.httpOptions)  
  }
}