import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the DismissModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-dismiss-modal',
  templateUrl: 'dismiss-modal.html',
})
export class DismissModalPage {

	public modalTitle: string;
	public modalContent: string;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
  	this.modalTitle = navParams.get("title");
  	this.modalContent = navParams.get("content");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DismissModalPage');
  }

  modalhide() {
    this.viewCtrl.dismiss();
  }

}
