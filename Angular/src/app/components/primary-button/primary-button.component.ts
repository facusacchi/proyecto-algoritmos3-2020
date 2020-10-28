import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.css', './../../app.component.css']
})
export class PrimaryButtonComponent implements OnInit {

  @Input() nombre: String

  constructor() { }

  ngOnInit(): void {
  }

}
