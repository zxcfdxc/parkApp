import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { ToolsProvider } from '../../providers/tools/tools';
import { StatusBar } from '@ionic-native/status-bar';
// import { flatten } from '@angular/compiler';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})

export class AccountPage {
   pageData:object={
    SettingPage:"SettingPage", 
   user:{},
   };
   weatherD={
    wWeather:"",
    wTemper:"",
   }
   isNewYou=false;
   
   limit=this.tools.get("limit");
  constructor( statusBar: StatusBar, public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
    // statusBar.backgroundColorByHexString("#38bdef");
  }
  @ViewChild(Slides) slides: Slides;
  
  ionViewDidLoad() {
      // this.getPage()
  }
  ionViewWillEnter(){
////console.log(this.slides);
    
    this.getPage()
  }
  ionViewWillLeave(){
    this.slides.stopAutoplay();
  }
  checkLog(){
////console.log("dfdf");
    
    if(this.tools.isLogin()!=1){
      var load=this.tools.showLoading();
     this.navCtrl.push("LoginPage").then(()=>{
      load.dismiss();
     });
     return  false;
    }else{
      return true;
    }
    
  }
  goDatil(){
    this.navCtrl.push("ContactPage");
  }y
  getPage(){
   
////console.log(this.slides);
    this.slides&&this.slides.startAutoplay();
   if(this.tools.get("Weather")){
    this.weatherD={
      wWeather:this.tools.get("Weather").weather||null,
      wTemper:this.tools.get("Weather").temperature||null,
     }
   }
  
 ////console.log(this.weatherD);
     
    if(this.tools.isLogin()!=1){
      return;
     }
    var api = 'User/userinfo';
    this.http.httpPost(api, {
     
    }, (data) => {
      if (data.code=="error") {
      }else{
    ////console.log(data)
          this.pageData=data;
          this.tools.set("useerData",data);
          this.isNewYou=data.new==1;
      }

    })
  }
}
