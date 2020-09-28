import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../Dominio/src/usuario';
import { service } from '../../service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario-form',
  templateUrl: './perfil-usuario-form.component.html',
  styleUrls: ['./perfil-usuario-form.component.css']
})
export class PerfilUsuarioFormComponent implements OnInit {
  
  usuario: Usuario
  status: String = "Estado Saludable" 

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(parametro => {
      this.usuario = service.buscarUsuarioPorId(parametro['id'])
    })
  }

  ngOnInit(): void {
  }


}
