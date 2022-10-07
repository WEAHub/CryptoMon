import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDeleteUser, IUserSettings } from '../models/user-settings.model'
import { ConfigService } from '@shared/services/config/config.service';
import { RequestService } from '@shared/services/http-request/http-requests.service';

@Injectable()

export class UserService {
  constructor(
    private requestService: RequestService,
    private configService: ConfigService
  ) { }

  modifyUser(userData: IUserSettings): Observable<any> {
    return this.requestService.httpPost(this.configService.modifyUser, userData)
  }
	
	deleteUser(userData: IDeleteUser): Observable<any> {
		return this.requestService.httpPost(this.configService.deleteUser, userData)
	}

  getUserStats(): Observable<any> {
    return this.requestService.httpGet(this.configService.userStats)
  }

}