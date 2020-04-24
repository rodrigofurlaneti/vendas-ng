import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../service/produto.service';
import { CategoriaService } from '../../categoria/service/categoria.service';
import { Produto } from '../models/produto.model';
import { Categoria } from '../../categoria/models/categoria.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-produto',
  templateUrl: '../component/produto.component.html',
  styleUrls: ['../component/produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  produtos: Produto[];
  categorias: Categoria[];
  produto = {} as Produto;
  constructor(private produtoService: ProdutoService, private categoriaService: CategoriaService) {}
  ngOnInit() {
    this.getProdutos();
    this.getCategorias();
  }
  //Selecionar todos os produtos
  public getProdutos() {
    return this.produtoService.getProdutos().subscribe(
                  produtos => { this.produtos = produtos; }, 
                  err => { console.log('Erro ao listar produtos', err);}
                )
  };
  //Selecionar todas categorias
  public getCategorias() {
    return this.categoriaService.getCategorias().subscribe(
                    categorias => { this.categorias = categorias; }, 
                    err => { console.log('Erro ao listar produtos', err);}
                  )
  };
  //Deletar um produto
  public deleteProduto(produto: Produto) {
    this.produtoService.deleteProduto(produto).subscribe(() => {
      this.getProdutos();
    });
  }
  //Adicionar produto
  public addProduto(form: NgForm) {
    let v = document.getElementById("produto.valor").getAttribute("ng-reflect-model");
    let pvcu = document.getElementById("produto.valorcustounitario").getAttribute("ng-reflect-model");
    let pvct = document.getElementById("produto.valorcustototal").getAttribute("ng-reflect-model");
    let pvlu = document.getElementById("produto.valorlucrounitario").getAttribute("ng-reflect-model");
    let pvlt = document.getElementById("produto.valorlucrototal").getAttribute("ng-reflect-model");
    let pvb = document.getElementById("produto.valorbruto").getAttribute("ng-reflect-model");
    this.produto.valor = v;
    this.produto.valorcustounitario = pvcu;
    this.produto.valorcustototal = pvct;
    this.produto.valorlucrounitario = pvlu;
    this.produto.valorlucrototal = pvlt;
    this.produto.valorbruto = pvb;
    if (this.produto.id !== undefined) {
        this.produtoService.updateProduto(this.produto).subscribe(() => {
          this.cleanForm(form);
          window.location.reload();
        });
      } else {
        this.produtoService.addProduto(this.produto).subscribe(() => {
          this.cleanForm(form);
          window.location.reload();
        });
      }
    }
  //Limpar formulário de produto
  public cleanForm(form: NgForm) {
    this.getProdutos();
    form.resetForm();
  }
  //Editar produto
  editProduto(produto: Produto) {
    this.produto = { ...produto };
  }
}