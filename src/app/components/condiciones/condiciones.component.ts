import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../Dominio/src/usuario';
import { celiaco, CondicionAlimenticia, vegano, vegetariano, hipertenso, diabetico } from '../../../../Dominio/src/condicionAlimenticia';

@Component({
  selector: 'app-condiciones',
  templateUrl: './condiciones.component.html',
  styleUrls: ['./condiciones.component.css']
})
export class CondicionesComponent implements OnInit {
  
  usuario: Usuario
  condiciones: CondicionAlimenticia[] = [diabetico, hipertenso, celiaco, vegetariano, vegano]
  cond: any = { diabet: false, vegan: false }

  constructor() { }
  
  ngOnInit(): void {
  }

  actualizar(valor: boolean) {
    this.cond.diabet = valor
  }

}
