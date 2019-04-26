import { NgModule, ErrorHandler  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';  
import { AngularWebStorageModule } from 'angular-web-storage';
import { Device } from '@ionic-native/device';
// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
// import { NearByPage } from '../pages/near-by/near-by';
// import { ParkDetailPage } from '../pages/park-detail/park-detail';
// import { MyPage } from '../pages/my/my';
// import { SeeCarPage } from '../pages/see-car/see-car';
// import { RegisterPhonePage } from '../pages/register-phone/register-phone';
// import { RegisterPwPage } from '../pages/register-pw/register-pw';
// import { LoginPage } from '../pages/login/login';
// import { AllParkPage } from '../pages/all-park/all-park';
// import { CarDetailPage } from '../pages/car-detail/car-detail';
// import { HistoryPage } from '../pages/history/history';

import {WechatChenyu} from "wechat-chenyu";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BaseserviceProvider } from '../providers/baseservice/baseservice';
import { ToolsProvider } from '../providers/tools/tools';
import { DirectivesModule } from '../directives/directives.module';
// import {ThrottleClickDirective  } from '../directives/throttle-click/throttle-click';
import { JPush } from '@jiguang-ionic/jpush'; 
import { AppVersion } from '@ionic-native/app-version';
import { DownProvider } from '../providers/down/down';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BackButtonProvider } from '../providers/back-button/back-button';
import { Geolocation } from '@ionic-native/geolocation';
import { ComponentsModule } from '../components/components.module';
// import { CommonModule } from "@angular/common";
// import { IonJPushModule } from 'ionic2-jpush'

@NgModule({
  declarations: [
    MyApp,
  ],
  entryComponents: [
    MyApp,
  ],
  imports: [
    // IonJPushModule,
    // CommonModule,
    ComponentsModule,
    BrowserModule,
    HttpClientModule,
    DirectivesModule,
    AngularWebStorageModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true',     //隐藏全部子页面tabs
      backButtonText: '',//按钮内容
      monthNames: ['1月', '2月', '3月','4月', '5月','6月', '7月','8月', '9月','10月', '11月','12月'  ],
    }),
  ],
  bootstrap: [IonicApp],


  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BaseserviceProvider,
    Geolocation,
    ToolsProvider,
    Device,
    WechatChenyu,
    Network,
    StatusBar,
    SplashScreen,
    JPush,
    AppVersion,
    DownProvider,
    FileOpener,
    FileTransfer,FileTransferObject,File,Diagnostic,
    AndroidPermissions,
    BackButtonProvider
  ],
  // schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
