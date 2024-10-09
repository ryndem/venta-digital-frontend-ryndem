import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/model/user';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  private apiPath: string = environment.apiUrl + '/ProductCategory';

  async login(): Promise<User> {
      return firstValueFrom(this.httpClient.get<User>(this.apiPath));
  }

}
