import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }
    getId(){
      return '1';
    }
    getNome(){
      return 'Rodrigo';
    }
  
}
