import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  url = 'http://localhost:56133/api/Produto';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private http: HttpClient) { }
  //Selecionar todos produtos
  getProdutos() : Observable<Produto[]>{
    return this.http.get<Produto[]>(this.url);
  }

  //Apagar produto
  deleteProduto(produto: Produto) {
    return this.http.delete<Produto>(this.url + '/' + produto.id, this.httpOptions)
  }

  //Adicionar produto
  addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.url, JSON.stringify(produto), this.httpOptions)
  }
  //Atualiza um carro
  updateProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(this.url + '/' + produto.id, JSON.stringify(produto), this.httpOptions)  
  }
}