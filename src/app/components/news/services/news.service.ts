import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { New, News } from '../models/news.model';

@Injectable()

export class NewsService {


  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
		return this.http.get('http://localhost/getNews');
	}
  
}