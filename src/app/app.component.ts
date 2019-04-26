import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { TabsPage } from '../pages/tabs/tabs';
import { JPush } from '@jiguang-ionic/jpush';
import { LocalStorageService } from 'angular-web-storage';
import { AppVersion } from '@ionic-native/app-version';
import { DownProvider } from '../providers/down/down';
import { Network } from '@ionic-native/network';
// import { ToolsProvider } from '../providers/tools/tools';
import { Device } from '@ionic-native/device';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'tabs';
 
  constructor(   public device: Device,public toastCtrl:ToastController, private network:Network, down:DownProvider,private appVersion: AppVersion,private storage:LocalStorageService,private jpush: JPush,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
////console.log(document.referrer);
 
 function isMobileweb(){
    
  var is= platform.is("mobileweb")||isWeiXin();
  return is;
 }
 function isWeiXin(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) as any == "micromessenger") {
    return true;
  } else {
    return false;
  }
 }
 function isIos(){
  var is= platform.is("ios");
  return is;
 }
 if(this.storage.get('firstIn')||isMobileweb()||isIos()) 
 { 
    this.rootPage = 'tabs'; 
   }
   else{
     this.storage.set('firstIn', true);
    this.rootPage = 'GuidePage';
   }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // if(this.tools.isMobile()){
      statusBar.overlaysWebView(false)
      statusBar.backgroundColorByHexString("#38bdef");
      splashScreen.hide();
    
      this.checkNetwork();  //写入函数，让app启动后进行网络监测
     var _thism=this;

      //注册推送
      this.jpush.init().then()
      .catch();
      this.jpush.setDebugMode(true);
      document.addEventListener("jpush.receiveNotification", function (event) {
        var alertContent
        if(_thism.device.platform == "Android") {
          alertContent = (event as any).alert
        } else {
          alertContent = (event as any).aps.alert
        }
    ////console.log("open Notification:" + alertContent)
    ////console.log("open Notification event:" + event)
        // alert("open Notification:" + alertContent)
      }, false)
      // document.addEventListener('jpush.receiveRegistrationId', function (event) {
      //////console.log(event["registrationId"])
      //   _thism.storage.set("jiGId",event["registrationId"])
      // }, false)
          /*储存版本信息及判断存储路径开始*/
           // 读取所用的平台
           //获取当前平台信息   this.device.platform
           this.appVersion.getVersionNumber().then((data) => {
            //当前app版本号  data，存储该版本号
            if(platform.is("android")){

              this.storage.set("androidV",data)
            }else if(platform.is("ios")){

              this.storage.set("iosV",data)
            }
        ////console.log(this.storage.get("iosV"));
            
            down.getUpApp();

        }, error => {
      ////console.log(error);
         //  this.pageData.nowV="无法获取版本号"
           //获取当前版本号失败进行的操作
        }
           
        );
        // down.getLocation();
        down.getPromiss();

      // }
   
    });


    
    
  }
 
  //检测网络，若未连接网络，给出提示
  checkNetwork() {
    if(this.network.type === 'unknown') {
  ////console.log('This is a unknown network, please be careful!');
    } else if(this.network.type === 'none') {
  ////console.log('none network!');
   this.showToast("当前网络不可用，请检查网络设置！","middle",4000)
    } else {
  ////console.log('we got a ' + this.network.type + ' connection, woohoo!');
    }
  }
  showToast(text,position="middle",time=2500) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: time,
      position:position,
      cssClass:"toastTheme"
    });
  
    // toast.onDidDismiss(() => {
    //////console.log('Dismissed toast');
    // });
  
    toast.present();
    return toast;
  }

}
