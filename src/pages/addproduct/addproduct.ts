import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast'

import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

import { EmployeepinPage } from '../employeepin/employeepin';
import { DismissModalPage } from '../dismiss-modal/dismiss-modal';
/**
 * Generated class for the AddproductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {

	options :BarcodeScannerOptions;

  product: any;

  bGetCategory: boolean;

  bClicked: boolean;

  allCategories: any;

  testBarcode: string;

  resp : any;  

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public loading: LoadingController, public apiServiceProvider: ApiServiceProvider,
              public globalServiceProvider: GlobalServiceProvider, private toast: Toast, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.product = {
      scanData: '',
      name: '',
      category: '',
      cost: 0.00,
      price: 0.00,
      stock: 0,
      error: ''
    }

    this.bGetCategory = true;
    this.bClicked = false;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');
    this.product.cost = 0.00;
    this.product.price = 0.00;
    this.product.stock = 0;
  }

  goToEmployeePage() {
  	this.navCtrl.setRoot(EmployeepinPage)
  }

  Scan() {
    this.bGetCategory = true;
  	this.options = {
        prompt : "Scan your barcode "
    }
    
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

        console.log(barcodeData);

        let loader = this.loading.create({
          content: '',
        });
        loader.present();
        this.apiServiceProvider.preFill(barcodeData.text).then(response => {
          console.log('Prefill success: ', response);
          this.clearForm();
          loader.dismiss();
          this.resp = response as any;
          
          if(this.resp.code == "OK") {
            this.product.scanData = barcodeData.text;
            let items = this.resp.items;
            items.forEach(item=> {
              this.product.name = item.title;
              this.product.price = item.lowest_recorded_price;
            })

          } else {
            loader.dismiss();
          }

        }, err => {
          loader.dismiss();
          this.clearForm();
          this.product.scanData = barcodeData.text;
        });        
    }, (err) => {
        console.log("Error occured : " + err);
        alert(err);
        this.clearForm();
    }); 

  }

  getCategory() {

    console.log('getCategory flags bclicked', this.bClicked);

    if (this.bClicked == true) {
      return;
    }

    this.bClicked = true;

    console.log('getCategory flags bGetCategory', this.bGetCategory);
    if (this.bGetCategory == false){
      return;
    }

    let loader = this.loading.create({
      content: '',
    });
    loader.present();
    this.apiServiceProvider.getCategories().then(response => {
      console.log('getCategories success: ', response);
      this.allCategories = response as any;

      let alert = this.alertCtrl.create();
      alert.setTitle('Categories');

      this.allCategories.forEach(item=> {
        alert.addInput({
          type: 'radio',
          label: item.name,
          value: item.name,
          checked: false
        });  
      })

      alert.addButton('Cancel');
      alert.addButton({
        text: 'Okay',
        handler: data => {
          console.log('Checkbox data:', data);
          this.product.category = data;
        }
      });
      alert.present();
      loader.dismiss();
      this.bClicked = false;
    },err => {
      
      loader.dismiss();
      this.bGetCategory = false;
      this.toastMessage("Cannot get any categories");
    });
    
  }

  AddProduct() {

    this.product.error = '';

    if (this.product.scanData == '' ){
      this.product.error = 'Must scan a barcode';
    } else if (this.product.name == ''){
      this.product.error = 'Must enter the product name';
    } else if (this.product.category == ''){
      this.product.error = 'Must enter the product category';
    } 
    // else if (this.product.cost == ''){
    //   this.product.error = 'Must enter the product cost';
    // } else if (this.product.price == ''){
    //   this.product.error = 'Must enter the product price';
    // } else if (this.product.stock == ''){
    //   this.product.error = 'Must enter the product stock';    
    // }
    
    if (this.product.error != '') {
      this.alertErrorMessage();
      return;
    }
    let self = this;
    
    let loader = this.loading.create({
      content: '',
    });

    loader.present();

    // let index = 1;
    // let categories = [];
    // this.allCategories.forEach(item=> {
    //   alert(item.name);
    //   if ( item.name == this.product.category) {
    //     categories.push(index);
    //   }
    // });

    // alert(categories);
    
    this.apiServiceProvider.addProduct({
      name: this.product.name,
      cost: this.product.cost,
      price: this.product.price,
      barcode: this.product.scanData,
      stock: this.product.stock,
      category: this.product.category
    }).then(response => {
      // this.globalServiceProvider.setIDToken((response as any).id_token);
      loader.dismiss();
      this.toastMessage("Added a product successfully");
      this.clearForm();

    }, err => {
      loader.dismiss();
      let modalInfo = {title: "Error", content: err};
      this.modalshow(modalInfo);
    });

  }

  alertErrorMessage() {
    alert(this.product.error);
  }

  toastMessage(msg) {
    this.toast.show(msg, '3000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }


  modalshow(modalInfo) {    
     let myModal = this.modalCtrl.create(DismissModalPage, modalInfo);
     myModal.present();
  }

  clearForm() {
      this.product.scanData = '';
      this.product.category = '';
      this.product.name = '';
      this.product.cost = 0.00;
      this.product.price = 0.00;
      this.product.stock = 0;
  }

  clearCost() {
    this.product.cost = '';
  }

  clearPrice() {
    this.product.price = '';
  }

  clearStock() {
    this.product.stock = '';
  }

}
