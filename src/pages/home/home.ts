import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NativeStorage} from 'ionic-native'

import { SetupPage } from '../setup/setup';
//import { EmployeepinPage } from '../employeepin/employeepin';

import { GlobalServiceProvider } from '../../providers/global-service/global-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
  constructor(public navCtrl: NavController, public globalServiceProvider: GlobalServiceProvider) {

    NativeStorage.getItem('dashboardurl')
    .then(
      data => {
        this.globalServiceProvider.setBaseURL(data);
        console.log("setBaseURL : ", data);
      },
      error => console.error(error)
    );

  	NativeStorage.getItem('token')
	  .then(
	    data => {
        this.navCtrl.setRoot(SetupPage);
        this.globalServiceProvider.setIDToken(data);
      },
	    error => console.error(error)
	  );
  }


  goToSetupPage() {
  	this.navCtrl.push(SetupPage);
  }

}
