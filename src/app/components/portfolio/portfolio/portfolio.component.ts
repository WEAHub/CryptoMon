import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {  Router } from '@angular/router';

import { getUserState } from '../../auth/store/login.selectors';
import { User } from '../../auth/models/user.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})

export class PortfolioComponent implements OnInit {
  
	constructor(    
		private router: Router,
    private store: Store<{ user: User }>) {}

  ngOnInit(): void {

  }

}
