import { Component, OnInit } from '@angular/core';
import { CargoService } from '../service/cargo.service';
import { Cargo } from '../models/cargo.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-cargo',
  templateUrl: '../component/cargo.component.html',
  styleUrls: ['../component/cargo.component.scss']
})

export class CargoComponent implements OnInit {

  panelOpenState = false;
  dataSaved = false;  
  cargoForm: any;  
  cargoIdUpdate = null;  
  message = null;  
  cargos: Cargo[];
  cargoById: number;
  cargo = {} as Cargo;

  constructor(private cargoService: CargoService) {}

  ngOnInit() {
    this.getCargos();
  }

  //Selecionar todos os cargos
  public getCargos() {
    return this.cargoService.getCargos().subscribe(
                  cargos => { this.cargos = cargos; }, 
                  err => { console.log('Erro ao listar cargos', err);}
                )
  };

  //Deletar um cargo
  public deleteCargo(cargo: Cargo) {
    this.cargoService.deleteCargo(cargo).subscribe(() => {
      this.getCargos();
    });
  }
  
  //Adicionar cargo
  public addCargo(form: NgForm) {
      if (this.cargo.id !== undefined) {
        this.cargoService.updateCargo(this.cargo).subscribe(() => {
          this.cleanForm(form);
          window.location.reload();
        });
      } else {
        this.cargoService.addCargo(this.cargo).subscribe(() => {
          this.cleanForm(form);
          this.getCargos();
          window.location.reload();
        });
      }
    }
  
  //Limpar formulário de cargo
  public cleanForm(form: NgForm) {
    this.getCargos();
    form.resetForm();
  }

  //Editar cargo
  editCargo(cargo: Cargo) {
    this.cargo = { ...cargo };
  }
}