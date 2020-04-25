import { Component, OnInit } from '@angular/core';
import { ComandaService } from '../service/comanda.service';
import { Comanda } from '../models/comanda.model';
import { ClienteService } from '../../cliente/service/cliente.service';
import { Cliente } from '../../cliente/models/cliente.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-comanda',
  templateUrl: '../component/comanda.component.html',
  styleUrls: ['../component/comanda.component.scss'],
})
export class ComandaComponent implements OnInit {
  comandas: Comanda[];
  comanda = {} as Comanda;
  clientes: Cliente[];
  constructor(private comandaService: ComandaService, private clienteService: ClienteService) {}
  ngOnInit() {
    this.getComandas();
    this.getClientes();
  }
  //Selecionar todos os comandas
  public getComandas() {
    return this.comandaService.getComandas().subscribe(
      comandas => { this.comandas = comandas; }, 
      err => { console.log('Erro ao listar comandas', err);}
      )
  };
  //Selecionar todos os comandas
  public getClientes() {
    return this.clienteService.getClientes().subscribe(
      clientes => { this.clientes = clientes; }, 
      err => { console.log('Erro ao listar clientes', err);}
      )
  };
  //Deletar um comanda
  public deleteComanda(comanda: Comanda) {
    this.comandaService.deleteComanda(comanda).subscribe(() => {
      this.getComandas();
    });
  }
  //Adicionar comanda
  public addComanda(form: NgForm) {
    var str = this.comanda.data.toString();
    let dt = this.fDate(str);
    this.comanda.data = dt;
    if (this.comanda.id !== undefined) {
        this.comandaService.updateComanda(this.comanda).subscribe(() => {
          this.cleanForm(form);
          window.location.reload();
        });
      } else {
        this.comandaService.addComanda(this.comanda).subscribe(() => {
          this.cleanForm(form);
          window.location.reload();
        });
      }
    }
  //Limpar formulário de comanda
  public cleanForm(form: NgForm) {
    this.getComandas();
    form.resetForm();
  }
  //Editar comanda
  editComanda(comanda: Comanda) {
    this.comanda = { ...comanda };
  }
  public fDate(str){
    var arr = str.split(" ");
    console.log(arr);
    arr.splice(0, 1);
    arr.splice(3, 6);
    if (arr[0] == "Jan"){
      arr.splice(0, 1);
      arr.push("Janeiro");
    }
    if (arr[0] == "Feb"){
      arr.splice(0, 1);
      arr.push("Fevereiro");
    }
    if (arr[0] == "Mar"){
      arr.splice(0, 1);
      arr.push("Março");
    }
    if (arr[0] == "Apr"){
      arr.splice(0, 1);
      arr.push("Abril");
    }
    if (arr[0] == "May"){
      arr.splice(0, 1);
      arr.push("Maio");
    }
    if (arr[0] == "Jun"){
      arr.splice(0, 1);
      arr.push("Junho");
    }
    if (arr[0] == "Jul"){
      arr.splice(0, 1);
      arr.push("Julho");
    }
    if (arr[0] == "Aug"){
      arr.splice(0, 1);
      arr.push("Agosto");
    }
    if (arr[0] == "Sep"){
      arr.splice(0, 1);
      arr.push("Setembro");
    }
    if (arr[0] == "Oct"){
      arr.splice(0, 1);
      arr.push("Outubro");
    }
    if (arr[0] == "Nov"){
      arr.splice(0, 1);
      arr.push("Novembro");
    }
    if (arr[0] == "Dec"){
      arr.splice(0, 1);
      arr.push("Dezembro");
    }
    let dt = arr[0]+"/"+arr[2]+"/"+arr[1];
    return dt;
  }
}