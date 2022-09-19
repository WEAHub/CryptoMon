import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { RequestService } from '../../shared/services/http-requests.module';

@Injectable()

export class NewsService {
  constructor(
    private configService: ConfigService,
    private requestService: RequestService
  ) { }

  getNews(): Observable<any> {
		return this.requestService.httpGet(this.configService.getNews);
	}

}