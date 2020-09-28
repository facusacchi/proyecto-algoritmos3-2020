import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Receta } from '../../../../Dominio/src/receta';
import { Service } from 'app/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recetaABuscar = ''
  recetas: Receta[] = []

  constructor(private router: Router, public service: Service) { }

  ngOnInit(): void {
    this.recetas = this.service.buscarRecetas()
  }

}
