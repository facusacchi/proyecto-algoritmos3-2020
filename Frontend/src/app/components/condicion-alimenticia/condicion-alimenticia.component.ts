import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'app/service';
import { Session } from 'app/session';
import { celiaco, diabetico, hipertenso, vegano, vegetariano, CondicionAlimenticia } from '../../../../src-dominio/condicionAlimenticia';

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

  constructor(private service : Service, private session: Session) {
  }
  
  ngOnInit(): void {
    this.isActive = this.session.userLogged.tieneCondicionAlimenticia(this.getCondicion())
  }

  getCondicion(): CondicionAlimenticia{
    return this.condiciones.get(this.descripcion)
  }

  onClick(): void{
    if(!this.isActive) {
      this.session.userLogged.agregarCondicionAlimenticia(this.getCondicion())
    } else { this.session.userLogged.eliminarCondicionAlimenticia(this.getCondicion()) }
  }

}
