import { Component, Input } from '@angular/core';
import { inOutLoading } from './../../animations/shared.animations';

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  animations: [
		inOutLoading
  ]
})

export class LoadingSpinnerComponent {

	@Input() diameter: string = "100";

	constructor() {
	}

}