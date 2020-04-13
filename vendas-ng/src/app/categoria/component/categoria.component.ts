import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../models/categoria.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-categoria',
  templateUrl: '../component/categoria.component.html',
  styleUrls: ['../component/categoria.component.scss']
})

export class CategoriaComponent implements OnInit {

  categorias: Categoria[];
  categoria = {} as Categoria;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.getCategorias();
  }

  //Selecionar todos os Categorias
  public getCategorias() {
    return this.categoriaService.getCategorias().subscribe(
                  categorias => { this.categorias = categorias; }, 
                  err => { console.log('Erro ao listar Categorias', err);}
                )
  };

  //Deletar um Categoria
  public deleteCategoria(categoria: Categoria) {
    this.categoriaService.deleteCategoria(categoria).subscribe(() => {
      this.getCategorias();
    });
  }
  
  //Adicionar Categoria
  public addCategoria(form: NgForm) {
      if (this.categoria.id !== undefined) {
        this.categoriaService.updateCategoria(this.categoria).subscribe(() => {
          this.cleanForm(form);
        });
      } else {
        this.categoriaService.addCategoria(this.categoria).subscribe(() => {
          this.cleanForm(form);
        });
      }
    }
  
  //Limpar formulário de Categoria
  public cleanForm(form: NgForm) {
    this.getCategorias();
    form.resetForm();
  }

  //Editar Categoria
  editCategoria(categoria: Categoria) {
    this.categoria = { ...categoria };
  }
}