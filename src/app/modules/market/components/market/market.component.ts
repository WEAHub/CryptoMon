import { Component, OnInit } from '@angular/core';

export interface TileComponent {
  cols: number;
  rows: number;
  text: string;
  component: any | undefined;
}

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }

}
