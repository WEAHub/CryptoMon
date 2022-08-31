import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';

@Injectable()

export class NewsService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  getNews(): Observable<any> {
		return this.http.get(this.configService.getNews);
	}
  
}