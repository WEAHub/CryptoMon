import { Component, Input } from '@angular/core';
import { inOutLoading } from './../../animations/shared.animations';

@Component({
  selector: 'modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss'],
  animations: [
		inOutLoading
  ]
})

export class ModalErrorComponent {

	@Input() errorMessage: string = 'Cannot connect to the backend :(.'

	constructor(
	) {

	}

}