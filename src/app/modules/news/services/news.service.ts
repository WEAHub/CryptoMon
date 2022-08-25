import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { New, News } from '../models/news.model';

@Injectable()

export class NewsService {

  API_HOST = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
		return this.http.get(`${this.API_HOST}/news/getNews`);
	}
  
}