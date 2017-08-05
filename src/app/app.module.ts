import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpModule } from '@angular/http';
import {NativeStorage} from 'ionic-native'
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddproductPage } from '../pages/addproduct/addproduct';
import { EmployeepinPage } from '../pages/employeepin/employeepin';
import { SetupPage } from '../pages/setup/setup';
import { UpdateProductPage } from '../pages/update-product/update-product';
import { DismissModalPage } from '../pages/dismiss-modal/dismiss-modal';

import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { GlobalServiceProvider } from '../providers/global-service/global-service';
import { ApiServiceProvider } from '../providers/api-service/api-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SetupPage,
    AddproductPage,
    EmployeepinPage,
    UpdateProductPage,
    DismissModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SetupPage,
    AddproductPage,
    EmployeepinPage,
    UpdateProductPage,
    DismissModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Toast,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NetworkServiceProvider,
    GlobalServiceProvider,
    ApiServiceProvider,
  ]
})
export class AppModule {}
