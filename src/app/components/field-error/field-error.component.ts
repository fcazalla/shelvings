import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.sass']
})
export class FieldErrorComponent implements OnInit {

  @Input() errorMessage: string;
  @Input() displayError: boolean;
  constructor() { }

  ngOnInit() {
  }

}
