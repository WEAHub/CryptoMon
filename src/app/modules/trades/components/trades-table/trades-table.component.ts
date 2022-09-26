import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-trades-table',
  templateUrl: './trades-table.component.html',
  styleUrls: ['./trades-table.component.scss']
})
export class TradesTableComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns: string[] = ['index']
  noMarketData = [{}]
  emptyData: MatTableDataSource<any> = new MatTableDataSource(this.noMarketData)
  dataSource: MatTableDataSource<any> = this.emptyData;

  constructor() { 

  }

  ngOnInit(): void {
    
  }

}
