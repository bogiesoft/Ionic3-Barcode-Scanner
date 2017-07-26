import { Component } from '@angular/core';
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
 
  public passcode1 : string;
  public passcode2 : string;
  public passcode3 : string;
  public passcode4 : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.passcode1 = '';
    this.passcode2 = '';
    this.passcode3 = '';
    this.passcode4 = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeepinPage');
  }

  goToSetupPage() {
  	this.navCtrl.setRoot(SetupPage);
  }

  add1(){
    this.AddNumber(1);
  }

  add2(){
    this.AddNumber(2); 
  }

  add3(){
    this.AddNumber(3);
  }

  add4(){
    this.AddNumber(4);
  }

  add5(){
    this.AddNumber(5);
  }

  add6(){
    this.AddNumber(6);
  }

  add7(){
    this.AddNumber(7);
  }

  add8(){
    this.AddNumber(8);
  }

  add9(){
    this.AddNumber(9);
  }

  add0(){
    this.AddNumber(0);
  }

  delete(){
    if (this.passcode4) {
      this.passcode4 = '';
    } else {
      if (this.passcode3){
        this.passcode3 = '';
      } else {
        if(this.passcode2) {
          this.passcode2 = '';
        } else {
          if(this.passcode1) {
            this.passcode1 = '';
          }
        }
      }
    }
  }

  AddNumber(num) {
    if(this.passcode1) {
      if(this.passcode2) {
        if(this.passcode3) {
          if(this.passcode4) {
            this.navCtrl.setRoot(AddproductPage);
          } else {
            this.passcode4 = num;
            this.navCtrl.setRoot(AddproductPage);
          }
        } else {
          this.passcode3 = num;
        }
      } else {
        this.passcode2 = num;
      }
    } else {
      this.passcode1 = num;
    }
  }
}
