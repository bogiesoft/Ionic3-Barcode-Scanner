import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import {NativeStorage} from 'ionic-native'

import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

import { AddproductPage } from '../addproduct/addproduct';
import { DismissModalPage } from '../dismiss-modal/dismiss-modal';
/**
 * Generated class for the SetupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {

  saveForm: any;

   private native = {
       key: '',
       value: ''
   }

   private savedUserName = {
       key: '',
       value: ''
   }

   private savedPassword = {
       key: '',
       value: ''
   }

   private savedDashboardUrl = {
       key: '',
       value: ''
   }

   constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, public apiServiceProvider: ApiServiceProvider,
              public globalServiceProvider: GlobalServiceProvider, private toast: ToastController, public modalCtrl: ModalController) {
    
    this.saveForm = {
      dashboardurl: '',
      username: '',
      password: '',
      err: []
    }

     NativeStorage.getItem('username')
    .then(
      data => {
        this.saveForm.username = data;
      },
      error => console.error(error)
    );

    NativeStorage.getItem('password')
    .then(
      data => {
        this.saveForm.password = data;
      },
      error => console.error(error)
    );

    NativeStorage.getItem('dashboardurl')
    .then(
      data => {
        this.saveForm.dashboardurl = data;
      },
      error => console.error(error)
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetupPage');
  }

  Save() {
  	console.log('start login : ');
    this.saveForm.errors = [];

    if (this.saveForm.dashboardurl == '') {
      this.saveForm.errors.push('Must enter the Dashboard URL');
    } else if (this.saveForm.username == '' ) {
      this.saveForm.errors.push('Must enter the username');
    } else if (this.saveForm.password == ''){
      this.saveForm.errors.push('Must enter the password');
    }

    if (this.saveForm.errors.length != 0) {
      this.alertErrorMessage();
      return;
    }

    let self = this;
    let loader = this.loading.create({
      content: '',
    });
    loader.present();
    this.apiServiceProvider.login({
      dashboardurl: this.saveForm.dashboardurl,
      username: this.saveForm.username,
      password: this.saveForm.password
    }).then(response => {
      this.globalServiceProvider.setIDToken((response as any).key);
      console.log('login response key: ' + (response as any).key);
      self.native.key = 'token';
      self.native.value = (response as any).key;
      NativeStorage.setItem(this.native.key,this.native.value).then((d)=>{
            console.log('storage save',d);
            this.showToast('successfuly saved!');

          },(e)=>{
            console.log('unable to save',e);
            this.showToast('unable to be saved!');
      })

      this.savedUserName.key = 'username';
      this.savedUserName.value = this.saveForm.username;

      NativeStorage.setItem(this.savedUserName.key,this.savedUserName.value).then((d)=>{
            console.log('storage save',d);            

          },(e)=>{
            console.log('unable to save',e);
      })

      this.savedPassword.key = 'password';
      this.savedPassword.value = this.saveForm.password;

      NativeStorage.setItem(this.savedPassword.key,this.savedPassword.value).then((d)=>{
            console.log('storage save',d);

          },(e)=>{
            console.log('unable to save',e);
      })

      this.savedDashboardUrl.key = 'dashboardurl';
      this.savedDashboardUrl.value = this.saveForm.dashboardurl;

      NativeStorage.setItem(this.savedDashboardUrl.key,this.savedDashboardUrl.value).then((d)=>{
            console.log('storage save',d);

          },(e)=>{
            console.log('unable to save',e);
      })
      loader.dismiss();
      this.navCtrl.setRoot(AddproductPage);
    }, err => {
      loader.dismiss();
      let modalInfo = {title : "Error", content : "The credentials you have entered are invalid"};
      this.modalshow(modalInfo);
    });

  }

  alertErrorMessage() {
    let errorMessage = '';
    this.saveForm.errors.forEach(item => {
      errorMessage += item + '\n';
    })
    alert(errorMessage);
  }

  showToast(msg){
    let toast =  this.toast.create({
        message: msg,
        duration: 3000,
        position:'buttom'
        
      })
      toast.present();
  }

  modalshow(modalInfo) {    
     let myModal = this.modalCtrl.create(DismissModalPage, modalInfo);
     myModal.present();
  }

}
