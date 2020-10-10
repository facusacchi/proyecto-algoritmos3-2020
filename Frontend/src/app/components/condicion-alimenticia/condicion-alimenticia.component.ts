import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'app/service';
import { celiaco, diabetico, hipertenso, vegano, vegetariano, CondicionAlimenticia } from '../../../../Dominio/src/condicionAlimenticia';

@Component({
  selector: 'app-condicion-alimenticia',
  templateUrl: './condicion-alimenticia.component.html',
  styleUrls: ['./condicion-alimenticia.component.css']
})
export class CondicionAlimenticiaComponent implements OnInit {

  @Input() descripcion: string

  isActive: boolean
  condiciones = new Map([
    ["Diabetico", diabetico],
    ["Vegano", vegano],
    ["Vegetariano", vegetariano],
    ["Hipertenso", hipertenso],
    ["Celiaco", celiaco],
])

  constructor(private service : Service) {
  }
  
  ngOnInit(): void {
    this.isActive = this.service.userLogueadotieneCondicion(this.getCondicion())
  }

  getCondicion(): CondicionAlimenticia{
    return this.condiciones.get(this.descripcion)
  }

  onClick(): void{
    if(!this.isActive) {
      this.service.agregarCondicionUserLogueado(this.getCondicion())
    } else { this.service.eliminarCondicionUserLogueado(this.getCondicion()) }
  }

}
