import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
// import { Toast } from '@ionic-native/toast'

import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

import { DismissModalPage } from '../dismiss-modal/dismiss-modal';
import { AddproductPage } from '../addproduct/addproduct';

/**
 * Generated class for the UpdateProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-update-product',
  templateUrl: 'update-product.html',
})
export class UpdateProductPage {

	options :BarcodeScannerOptions;

  product: any;

  testBarcode: string;

  resp : any;

  scanData : string;

  preFillId : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public loading: LoadingController, public apiServiceProvider: ApiServiceProvider,
              public globalServiceProvider: GlobalServiceProvider, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    
  	//let product = this.navParams.get('cost');
  	console.log("this.navParams", this.navParams);

  	this.product = {
  	  _id: this.navParams.get("_id"),
      scanData: this.navParams.get("scanData"),
      name: '',
      category: '',
      tax_status: false,
      cost: 0.00,
      price: 0.00,
      stock: 0,
      categories: this.navParams.get("categories"),
      archived: 0,
      error: ''
    }
        this.apiServiceProvider.preFill(this.product._id).then(response => {
          console.log('Prefill success: ', response);
          this.clearForm();
          this.resp = response as any;

          this.product.scanData = this.resp.barcode;
          this.product.name = this.resp.name;
          this.product.cost = this.resp.cost;
          this.product.price = this.resp.price;
          this.product.stock = this.resp.stock;
          this.product.tax_status = this.resp.tax_status? false: true;
          this.preFillId = this.resp.categories[0];
          let cate = this.product.categories.find(this.findCategoryName, this);
          this.product.category = cate.name;
        }, err => {
        }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateProductPage');
  }

  goToAddProductPage() {
  	this.navCtrl.setRoot(AddproductPage);
  }

  Cancel() {
  	this.clearForm();
    this.navCtrl.setRoot(AddproductPage);
  }

  Scan() {
  	this.options = {
        prompt : "Scan your barcode "
    }
    
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

        console.log(barcodeData);

        this.product.scanData = barcodeData.text;
    }, (err) => {
        console.log("Error occured : " + err);
        alert(err);
    }); 

  }

  DelProduct() {
  	this.product.error = '';

    if (this.product.scanData == '' ){
      this.product.error = 'Must scan a barcode';
    } 

    if (this.product.error != '') {
      this.alertErrorMessage();
      return;
    }
    let self = this;
    
    let loader = this.loading.create({
      content: '',
    });

    loader.present();

    let cate = this.product.categories.find(this.findCategoryId, this);
 
    
    console.log('Cate =========== ', cate);
    this.apiServiceProvider.updateProduct({
      _id: this.product._id,
      name: this.product.name,
      cost: this.product.cost,
      price: this.product.price,
      barcode: this.product.scanData,
      stock: this.product.stock,
      category: [cate.id],
      tax_status: this.product.tax_status? false: true,
      archived: 1
    }).then(response => {
      // this.globalServiceProvider.setIDToken((response as any).id_token);
      loader.dismiss();
      //this.toastMessage("Added a product successfully");
      alert("Deleted a product successfully");
      this.clearForm();
      this.navCtrl.setRoot(AddproductPage);

    }, err => {
      loader.dismiss();
        let modalInfo = {title: "Error", content: err};
        this.modalshow(modalInfo);
    });
  }

  updateProduct() {

    this.product.error = '';

    if (this.product.scanData == '' ){
      this.product.error = 'Must scan a barcode';
    } else if (this.product.name == ''){
      this.product.error = 'Must enter the product name';
    } else if (this.product.category == ''){
      this.product.error = 'Must enter the product category';
    }
    
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

    let cate = this.product.categories.find(this.findCategoryId, this);
    
    this.apiServiceProvider.updateProduct({
      _id: this.product._id,
      name: this.product.name,
      cost: this.product.cost,
      price: this.product.price,
      barcode: this.product.scanData,
      stock: this.product.stock,
      category: [cate.id],
      tax_status: this.product.tax_status? false: true,
      archived: 0
    }).then(response => {
      // this.globalServiceProvider.setIDToken((response as any).id_token);
      loader.dismiss();
      //this.toastMessage("Added a product successfully");
      alert("Updated a product successfully");
      this.clearForm();
      this.navCtrl.setRoot(AddproductPage);

    }, err => {
      loader.dismiss();
        let modalInfo = {title: "Error", content: err};
        this.modalshow(modalInfo);
    });

  }

  findCategoryId(category) {
  	return category.name === this.product.category;
  }

  findCategoryName(category) {
    return category.id === this.preFillId;
  }

  alertErrorMessage() {
    alert(this.product.error);
  }

  toastMessage(msg) {
    // this.toast.show(msg, '3000', 'center').subscribe(
    //   toast => {
    //     console.log(toast);
    //   }
    // );
    alert(msg);
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