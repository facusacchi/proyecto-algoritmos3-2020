import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.css']
})
export class SecondaryButtonComponent implements OnInit {

  @Input() nombreSecondary: String

  constructor() { }

  ngOnInit(): void {
  }

}
