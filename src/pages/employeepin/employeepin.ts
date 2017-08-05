import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SetupPage } from '../setup/setup';
import { AddproductPage } from '../addproduct/addproduct';
/**
 * Generated class for the EmployeepinPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-employeepin',
  templateUrl: 'employeepin.html',
})
export class EmployeepinPage {

  pin: any;

  @ViewChild('passcodeInput1') passcodeInput1;
  @ViewChild('passcodeInput2') passcodeInput2;
  @ViewChild('passcodeInput3') passcodeInput3;
  @ViewChild('passcodeInput4') passcodeInput4;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

   setTimeout(() => {
      this.passcodeInput1.setFocus();
    },150);
   
   this.pin = {
     passcode1: '',
     passcode2: '',
     passcode3: '',
     passcode4: ''
   }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeepinPage');
  }

  goToSetupPage() {
  	this.navCtrl.setRoot(SetupPage);
  }

  addPasscode1() {
    if ( this.pin.passcode1 ) {
      setTimeout(() => {
        this.passcodeInput2.setFocus();
      },50);
       
    }
  }

  addPasscode2() {
    if ( this.pin.passcode2 ) {
       setTimeout(() => {
          this.passcodeInput3.setFocus();
        },50);
    } else {
      setTimeout(() => {
        this.passcodeInput1.setFocus();
      },50);
    }
  }

  addPasscode3() {
    if ( this.pin.passcode3 ) {
      setTimeout(() => {
        this.passcodeInput4.setFocus();
      },50);
    } else {
      setTimeout(() => {
        this.passcodeInput2.setFocus();
      },50);
    }
  }

  addPasscode4() {
    if ( this.pin.passcode4 ) {
      this.navCtrl.setRoot(AddproductPage);
    } else {
      setTimeout(() => {
        this.passcodeInput3.setFocus();
      },50);
    }
  }
}
