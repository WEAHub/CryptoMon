import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@shared/services/config/config.service';
import { RequestService } from '@shared/services/http-request/http-requests.service';

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