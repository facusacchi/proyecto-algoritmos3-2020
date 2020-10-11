import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'app/service';
import { Session } from 'app/session';
import { celiaco, diabetico, hipertenso, vegano, vegetariano, CondicionAlimenticia } from '../../../../Dominio/src/condicionAlimenticia';
import { Usuario } from '../../../../Dominio/src/usuario';

@Component({
  selector: 'app-condicion-alimenticia',
  templateUrl: './condicion-alimenticia.component.html',
  styleUrls: ['./condicion-alimenticia.component.css']
})
export class CondicionAlimenticiaComponent implements OnInit {

  @Input() descripcion: string
  @Input() usuario: Usuario

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
    this.isActive = this.usuario.tieneCondicionAlimenticia(this.getCondicion())
  }

  getCondicion(): CondicionAlimenticia{
    return this.condiciones.get(this.descripcion)
  }

  onClick(): void{
    if(!this.isActive) {
      this.usuario.agregarCondicionAlimenticia(this.getCondicion())
    } else { this.usuario.eliminarCondicionAlimenticia(this.getCondicion()) }
  }

}
