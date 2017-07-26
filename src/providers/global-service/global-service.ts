import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as Constant from '../constants/constants';

/*
  Generated class for the GlobalServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GlobalServiceProvider {

  id_token: string;
  syncCnt: number;

  constructor(public http: Http) {
    console.log('Hello GlobalServiceProvider Provider');
  }

  getIDToken() {
    return this.id_token;
  }

  setIDToken(id_token) {
    this.id_token = id_token;
  }

}
