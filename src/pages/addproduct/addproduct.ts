import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
// import { Toast } from '@ionic-native/toast'

import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

//import { EmployeepinPage } from '../employeepin/employeepin';
import { UpdateProductPage } from '../update-product/update-product';
import { SetupPage } from '../setup/setup';
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

  testBarcode: string;

  resp : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public loading: LoadingController, public apiServiceProvider: ApiServiceProvider,
              public globalServiceProvider: GlobalServiceProvider, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.product = {
      _id: '',
      scanData: '',
      name: '',
      category: '',
      categories: [],
      tax_status: 0,
      cost: 0.00,
      price: 0.00,
      stock: 0,
      error: ''
    }

    this.getCategory();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');
    this.product.cost = 0.00;
    this.product.price = 0.00;
    this.product.stock = 0;
    this.product.tax_status = 0;
  }

  goToSetupPage() {
  	this.navCtrl.setRoot(SetupPage);
  }

  Scan() {
  	this.options = {
        prompt : "Scan your barcode "
    }

    this.barcodeScanner.scan(this.options).then((barcodeData) => {
        
        console.log(barcodeData);

        if ( barcodeData === null) {
          return;
        }
        
        let loader = this.loading.create({
          content: '',
        });
        loader.present();
        this.apiServiceProvider.checkBarcode(barcodeData.text).then(response => {
          console.log('checkBarcode success : ', response);          
          loader.dismiss();
          this.resp = response as any;
          this.product.scanData = barcodeData.text;
          console.log("check barcode success response: ", this.resp);
          if(this.resp.details){
            this.prefillFromDB(barcodeData.text);
            return;
          }
          this.product._id = this.resp.response;
          this.navCtrl.setRoot(UpdateProductPage, this.product);
        }, err => {
          this.prefillFromDB(barcodeData.text);
        });
    }, (err) => {
        console.log("Error occured : " + err);
        alert(err);
    }); 

  }

  prefillFromDB(barcodeDataText) {

    this.apiServiceProvider.preFillfromDB(barcodeDataText).then(response => {
        console.log('Prefill success: ', response);
        this.clearForm();
        this.resp = response as any;
        
        if(this.resp.code == "OK") {
          this.product.scanData = barcodeDataText;
          let items = this.resp.items;
          items.forEach(item=> {
            this.product.name = item.title;
            this.product.price = item.lowest_recorded_price;
          })

        }

      }, err => {
        this.product.scanData = barcodeDataText;
      });
  }

  getCategory() {

    this.apiServiceProvider.getCategories().then(response => {
      
      this.product.categories = response as any;
      console.log('Categories : =========== ', this.product.categories);

    },err => {
      alert("Cannot get any categories");
    });
    
  }

  Cancel() {
    this.clearForm();
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

    console.log("selected category : ", cate);
    
    this.apiServiceProvider.addProduct({
      name: this.product.name,
      cost: this.product.cost,
      price: this.product.price,
      barcode: this.product.scanData,
      stock: this.product.stock,
      category: [cate.id],
      tax_status: this.product.tax_status? false: true
    }).then(response => {
      // this.globalServiceProvider.setIDToken((response as any).id_token);
      loader.dismiss();
      //this.toastMessage("Added a product successfully");
      alert("Added a product successfully");
      this.clearForm();

    }, err => {
      loader.dismiss();

        let modalInfo = {title: "Error", content: err};
        this.modalshow(modalInfo);
      
    });

  }

  findCategoryId(category) {
    return category.name === this.product.category;
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
      this.product.tax_status = 0;
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
