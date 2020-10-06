import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Receta } from '../../../../Dominio/src/receta';
import { Service } from 'app/service';
import { Usuario } from '../../../../Dominio/src/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recetaABuscar = ''
  isChecked = false
  recetas: Receta[] = []
  usuario: Usuario

  constructor(private route: ActivatedRoute, public service: Service) { }

  ngOnInit(): void {
    this.usuario = this.service.getUsuarioLogueado
    this.recetas = this.service.getRecetas
  }

  recibirRecetaABuscar(valueEmitted: string): void {
    this.recetaABuscar = valueEmitted
  }

  recibirEstadoCheckbox(valueEmitted: boolean): void {
    this.isChecked = valueEmitted
  }

}
