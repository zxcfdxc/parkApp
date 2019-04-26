import { Component ,ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Platform, Tabs } from 'ionic-angular';
import { BackButtonProvider } from "../../providers/back-button/back-button";
import { StatusBar } from '@ionic-native/status-bar';
import { LocalStorageService } from 'angular-web-storage';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';



// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';
// import { NearByPage } from '../near-by/near-by';
// import { ParkDetailPage } from '../park-detail/park-detail';
// import { HistoryPage } from '../history/history';
// import { RegisterPhonePage } from '../register-phone/register-phone';
// import { RegisterPwPage } from '../register-pw/register-pw';
// import { LoginPage } from '../login/login';
// import { IonicPage } from 'ionic-angular';
@IonicPage({
  name: 'tabs'
})
@Component({
  templateUrl: 'tabs.html'
})
 
export class TabsPage {
    @ViewChild('myTabs') tabRef: Tabs;

    // data="AccountPage";
  tab1Root:any = 'HomePage';
  tab2Root:any = 'NearByPage';
  tab3Root:any = 'AccountPage';
  mesNum:0;
  isNewYou=null;
  
  constructor( public http:BaseserviceProvider,public backButtonService: BackButtonProvider, statusBar: StatusBar,public storage:LocalStorageService,
    private platform: Platform) {
      this.platform.ready().then(() => {
        statusBar.backgroundColorByHexString("#38bdef");
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });
  }
  ionViewWillEnter(){
    var api = 'User/userinfo';
    this.http.httpPost(api, {
     
    }, (data) => {
      if (data.code=="error") {
      }else{
          this.storage.set("useerData",data);
          this.isNewYou=data.new==1?"1":"";
      }

    },null,null,2);
    // if(this.storage.get("useerData")){
    //   this.isNewYou=this.storage.get("useerData").new==1?"1":"";
    // }
   
  }

}

