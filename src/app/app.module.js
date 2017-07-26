var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpModule } from '@angular/http';
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddproductPage } from '../pages/addproduct/addproduct';
import { EmployeepinPage } from '../pages/employeepin/employeepin';
import { SetupPage } from '../pages/setup/setup';
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { GlobalServiceProvider } from '../providers/global-service/global-service';
import { ApiServiceProvider } from '../providers/api-service/api-service';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            SetupPage,
            AddproductPage,
            EmployeepinPage
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
            EmployeepinPage
        ],
        providers: [
            StatusBar,
            SplashScreen,
            Network,
            Toast,
            BarcodeScanner,
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            NetworkServiceProvider,
            GlobalServiceProvider,
            ApiServiceProvider,
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map