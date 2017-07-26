import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from '../constants/constants';
import { GlobalServiceProvider } from '../global-service/global-service';
import { NetworkServiceProvider } from '../network-service/network-service';

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  isSyncNeeded: boolean;

  constructor(public http: Http, public networkServiceProvider: NetworkServiceProvider, public globalServiceProvider: GlobalServiceProvider) {
    console.log('Hello ApiServiceProvider Provider');
    console.log('this.networkServiceProvider.isConnected :', this.networkServiceProvider.getConnectionStatus());
  }

  login(params) {

	    let self = this;

	    return new Promise((resolve, reject) => {

	      if (self.networkServiceProvider.getConnectionStatus()) {

	        let requestData = {
	          dashboardurl: params.dashboardurl,
	          password: params.password,
	          username: params.username
	        };
	        let headers = new Headers({
	          'Content-Type': 'application/json',
	          'Accept': 'application/json',
	        });
	        let options = new RequestOptions({headers: headers});

	        self.http.post(Constants.API_URL + '/rest-auth/login/', requestData, options)
	        .map(res => res.json())
	        .subscribe(response => {
	          console.log('success login response : ', response);
	          resolve(response);
	        }, err => {
	          console.log('login failed: ', err);
	          reject(err);
	        });

	      } else {
	      	alert("Network connection error!");
	      }
	    });

  }

  preFill(param){
    let self = this;
    return new Promise((resolve, reject) => {

      if (self.networkServiceProvider.getConnectionStatus()) {

        let headers = new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});

        self.http.get(Constants.PREFILL_API_URL + param, options)
          .map(res => res.json())
          .subscribe(response => {
            console.log('success getCategories response : ', response);
            resolve(response);
        }, err => {
          console.log('prefill error : ', err);
          reject('PreFill is failed');
        });

      } else {

          alert("Network connection error!");
      }

    });
  }

  getCategories() {

    let self = this;

    return new Promise((resolve, reject) => {

      if (self.networkServiceProvider.getConnectionStatus()) {

        let headers = new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token ' + self.globalServiceProvider.getIDToken()
        });
        let options = new RequestOptions({headers: headers});

        self.http.get(Constants.API_URL + '/mobile-api/categories/', options)
	        .map(res => res.json())
	        .subscribe(response => {
	          console.log('success getCategories response : ', response);
	          resolve(response);
        }, err => {
	        console.log('getCategories failed : ', err);
	        reject('getCategories is failed');
        });

      } else {

        	alert("Network connection error!");
      }

    });

  }

  addProduct(params) {

    let self = this;

    return new Promise((resolve, reject) => {

      if (self.networkServiceProvider.getConnectionStatus()) {
     //  	let requestData = {
	    //       name: params.name,
	    //       cost: params.cost,
	    //       price: params.price,
	    //       barcode: params.barcode,
	    //       stock: params.stock,
	    //       description: params.category,
     //        color: 1,
     //        sorting: 0,
     //        tax_status: 1,
     //        active: 0,
     //        archived: 0,
     //        price_adjust: 1,
     //        print_to: 0,
     //        tax_rate: 1
	    // };

      console.log('addproduct() barcode : ', params.barcode );
        let requestData = {
           "name": params.name,
           "color": 1,
           "sorting": "0",
           "cost": params.cost,
           "price": params.price,
           "barcode": params.barcode,
           "stock": params.stock,
           "tax_status": 1,
           "active": 1,
           "archived": 0,
           "price_adjust": 1,
           "print_to": 0,
           "tax_rate": 1,
           "description": "qweqweeqweqweqweqweqweqweqw",
           "categories": [1]
        }

        let headers = new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token ' + self.globalServiceProvider.getIDToken()
        });
        console.log('Token : ' + self.globalServiceProvider.getIDToken());
        console.log('RequestData : ' + requestData);
        let options = new RequestOptions({headers: headers});

        self.http.post(Constants.API_URL + '/mobile-api/products/', requestData, options)
	        .map(res => res.json())
	        .subscribe(response => {
	          console.log('success addproduct response : ', response);
	          resolve(response);
        }, err => {
          console.log('response Error : ', err);
          let returnError = err;

          if (err._body){
            let error = JSON.parse(err._body);

            console.log('err._body', error);

            returnError = '';

            if(error.name){
              console.log('error name issue : ', error.name[0])
              returnError = error.name[0];
            } else if(error.barcode) {
              console.log('error barcode : ', error.barcode[0]);
              returnError = error.barcode[0];
            }
          }
	        reject(returnError);
        });

      } else {

        	alert("Network connection error!");
      }

    });

  }

  checkPin() {

    let self = this;

    return new Promise((resolve, reject) => {

      if (self.networkServiceProvider.getConnectionStatus()) {

        let headers = new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token ' + self.globalServiceProvider.getIDToken()
        });
        let options = new RequestOptions({headers: headers});

        self.http.get(Constants.API_URL + '/mobile-api/check-pin/', options)
	        .map(res => res.json())
	        .subscribe(response => {
	          console.log('success getProjects response : ', response);
	          resolve(response);
        }, err => {
	        console.log('getProjects failed : ', err);
	        reject('getProjects is failed');
        });

      } else {

        	alert("Network connection error!");
      }

    });

  }

}
