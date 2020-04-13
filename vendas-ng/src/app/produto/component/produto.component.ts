import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../service/produto.service';
import { Produto } from '../models/produto.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-produto',
  templateUrl: '../component/produto.component.html',
  styleUrls: ['../component/produto.component.scss']
})

export class ProdutoComponent implements OnInit {

  produtos: Produto[];
  produto = {} as Produto;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.getProdutos();
  }

  //Selecionar todos os produtos
  public getProdutos() {
    return this.produtoService.getProdutos().subscribe(
                  produtos => { this.produtos = produtos; }, 
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
      if (this.produto.id !== undefined) {
        this.produtoService.updateProduto(this.produto).subscribe(() => {
          this.cleanForm(form);
        });
      } else {
        this.produtoService.addProduto(this.produto).subscribe(() => {
          this.cleanForm(form);
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