import { Injectable } from '@angular/core';
import {  AlertController, ActionSheetController, Platform } from 'ionic-angular'; 
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { File} from '@ionic-native/file';
import { BaseserviceProvider } from '../baseservice/baseservice';
import { ToolsProvider } from '../tools/tools';
import{Appconfig}from '../baseservice/app.config';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Observable } from 'rxjs/Rx';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
/*
  Generated class for the DownProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var LocationPlugin;
@Injectable()
export class DownProvider {

  constructor(public http:BaseserviceProvider,
    public tools:ToolsProvider,
private fileOpener: FileOpener,
private transfer: FileTransfer,
private file: File,
private network: Network,
private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    private diagnostic: Diagnostic,
    private platform: Platform,
    private androidPermissions: AndroidPermissions,
    private device: Device,
    
) {

  
  
  }
 getPromiss(){
 
 
  var promiss={
    ACCESS_COARSE_LOCATION:"ACCESS_COARSE_LOCATION",
    ACCESS_FINE_LOCATION:"ACCESS_FINE_LOCATION",
  }
  // this.androidPermissions.checkPermission(
  //   this.androidPermissions.PERMISSION[promiss.ACCESS_COARSE_LOCATION]).then(
  //   result =>////console.log('Has permission?',result.hasPermission),
  //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
  // );
  
  this.androidPermissions.requestPermissions(
    [this.androidPermissions.PERMISSION[promiss.ACCESS_COARSE_LOCATION], 
    this.androidPermissions.PERMISSION[promiss.ACCESS_FINE_LOCATION],
    this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
    this.androidPermissions.PERMISSION.WRITE_CONTACTS,
    this.androidPermissions.PERMISSION.WRITE_SETTINGS,
    this.androidPermissions.PERMISSION.REQUEST_INSTALL_PACKAGES,
    this.androidPermissions.PERMISSION.INSTALL_PACKAGES,
    this.androidPermissions.PERMISSION.ACTION_INSTALL_PACKAGE
  
  ]).catch(err =>console.log("requestPermissions"+err));;
 }
 /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   */
  getNetworkType(): string {
    if (!this.isMobile()) {
      return 'wifi';
    }
    return this.network.type;
  }

  getUpApp(isShow?){
    // if(this.device){
    //////console.log(Number(this.device.version),this.device.version);
    //  }
////console.log(Number((this.device.version).substring(0,1)));
    var api = 'Settings/appVersion';
    this.http.httpPost(api, {
      type:this.tools.getWhatApp()
    }, (data) => {
         
      
      if (data&&data.code=="error") {
      }else{
        if(!this.versionfunegt(data.data.name)){
          if(isShow){
           this.tools.showToast("当前为最新版本");
          }
          return;
        }
        data=data.data;
    ////console.log(data.url);
        
      
          this.detectionUpgrade(data, data.type==0) 
      
      }
    })
  }

  /*
     allowChoose:true非强，false强
  */
  detectionUpgrade(data, allowChoose) {
    let apkUrl=data.url,cont=data.content|| '发现新版本,是否立即升级？';
    let  title=this.getNetworkType()=="wifi"?"升级提示":"当前非wifi环境，是否升级？";
    if (allowChoose) {  
        this.alertCtrl.create({  
            title: title,  
            subTitle: cont,  
            buttons: [{  
                text: '取消'  
            }, {  
                text: '确定',  
                handler: () => { 

                    this.downloadApp(apkUrl,allowChoose);  
                }  
            }]  
        }).present();  
    } else { 

        this.downloadApp(apkUrl,allowChoose);  
    }  
} 
downloadApp(apkUrl,allowChoose) { 
  
  if(this.tools.getWhatApp()==2){
    window.location.href = 'itms-services://?action=download-manifest&url=' + apkUrl;
  }else if(this.tools.getWhatApp()==1){
  let alert = this.alertCtrl.create({  
      title: '下载进度：0%',  
      enableBackdropDismiss: false,  
  }); 
if(allowChoose){
  alert.addButton("后台下载")  
}
  alert.present();  
    
  const fileTransfer: FileTransferObject = this.transfer.create(); 
  var inFile;
    // var inFile= this.tools.isAndroid()? this.file.externalDataDirectory:this.file.documentsDirectory; 
////console.log(Number((this.device.version).substring(0,1)));
    
    if(this.tools.isAndroid()){
      inFile="cdvfile://localhost/persistent/"
    // if(Number((this.device.version).substring(0,1))>=8){
    //   inFile=this.file.dataDirectory
    // }else
    //  if(Number((this.device.version).substring(0,1))>=6){
    //   inFile= this.file.externalDataDirectory;
    // }else{
    //   inFile= this.file.externalRootDirectory;
    // }
  }
  const apk = inFile  + 'parkApp'+'.apk'; //apk保存的目录  
  let mUrl=Appconfig.root+apkUrl;
 ////console.log(mUrl,apk);
  
  fileTransfer.download(encodeURI(mUrl), apk).then((entry) => {  
      this.fileOpener.open(entry.toURL(), 'application/vnd.android.package-archive').then(() =>{  
      ////console.log('File is opened')  
      }).catch(e => {  
          window.alert('Error openening file'+ e)  
      });  
  },
  (error) => {
////console.log("下载失败");
    this.tools.showAlert('操作提醒',null, '由于部分手机出现异常,请您进入手机设置-应用管理-车都停车-权限，将系统权限打开后再进行升级，由此给您带来的不便，敬请谅解。');
    for(var item in error) {
  ////console.log(item + ":" + error[item]);
    }
  }
);  
  fileTransfer.onProgress((event) => { 
    
////console.log(event);
    
      let num = Math.floor(event.loaded/event.total * 100);  
      if (num === 100) {  
          alert.dismiss();  
      } else if(num < 100) {  
          let title = document.getElementsByClassName('alert-title')[0];  
          title && (title.innerHTML = '下载进度：' + num + '%');  
      }else{
        let title = document.getElementsByClassName('alert-title')[0];  
        title && (title.innerHTML = '正在下载...');  
      }  
  }); 
} 
}  
 

  /**
   * 是否ios真机环境
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }
 // 比较版本号
 versionfunegt (a) {
   var b;
  if (this.tools.getWhatApp()==1){
    b =this.tools.get("androidV") ;
   }
  if (this.tools.getWhatApp()==2){
    b =this.tools.get("iosV") ;
  }

  var _a = this.toNum(a), _b = this.toNum(b);
 ////console.log(_a>_b);   
  if(_a == _b) {
  ////console.log("版本号相同！版本号为："+a);
      return false;
  } else if(_a > _b) {
  ////console.log("版本号"+a+"是新版本！"); 
      return true;
  } else {
  ////console.log("版本号"+b+"是新版本！"); 
      return false;
  }
}

toNum (a) {
  var a = a.toString();
  //也可以这样写 var c=a.split(/\./);
  var c = a.split('.');
  var num_place = ["","0","00","000","0000"], r = num_place.reverse();
  for (var i = 0; i< c.length; i++){ 
      var len = c[i].length;       
      c[i] = r[len] + c[i];  
  } 
  var res = c.join(''); 
  return res; 
} 

  /**
   * 是否真机环境
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

/**
   * 获取位置
   */
  getLocation() {
    return Observable.create(observer => {
      if (this.isMobile()) {
        //  检查app是否开始位置服务和定位权限.没有则会请求权限
        Observable.zip(this.assertLocationService(), this.assertLocationAuthorization()).subscribe(() => {
          LocationPlugin.getLocation(data => {
            //  android返回data形如:{"locationType":4,"latitude":23.119225,"longitude":113.350784,"hasAccuracy":true,"accuracy":29,"address":"广东省广州市天河区潭乐街靠近广电科技大厦","country":"中国","province":"广东省","city":"广州市","district":"天河区","street":"平云路","cityCode":"020","adCode":"440106","aoiName":"广电平云广场","speed":0,"bearing":0,"time":1515976535559}
            //  其中locationType为定位来源.定位类型对照表: http://lbs.amap.com/api/android-location-sdk/guide/utilities/location-type/
            //  iOS只会返回data形如:{longitude: 113.35081420800906, latitude: 23.119172707345594}
        ////console.log('定位信息', data);
            observer.next({ 'lng': data.longitude, 'lat': data.latitude });
          }, msg => {
            if (msg.indexOf('缺少定位权限') != -1 || (this.isIos() && msg.indexOf('定位失败') != -1)) {
              this.alertCtrl.create({
                title: '缺少定位权限',
                subTitle: '请在手机设置或app权限管理中开启',
                buttons: [{ text: '取消' },
                {
                  text: '去开启',
                  handler: () => {
                    this.diagnostic.switchToSettings();
                  }
                }
                ]
              }).present();
            } else if (msg.indexOf('WIFI信息不足') != -1) {
              alert('定位失败,请确保连上WIFI或者关掉WIFI只开流量数据')
            } else if (msg.indexOf('网络连接异常') != -1) {
              alert('网络连接异常,请检查您的网络是否畅通')
            } else {
              alert('获取位置错误,错误消息:' + msg);
            //   this.logger.log(msg, '获取位置失败');
            }
            observer.error('获取位置失败');
          });
        }, err => {
          observer.error(err);
        })
      } else {
    ////console.log('非手机环境,即测试环境返回固定坐标');
        observer.next({ 'lng': 113.350912, 'lat': 23.119495 });
      }
    });
  }

  // 检测app位置服务是否开启
  private assertLocationService = (() => {
    let enabledLocationService = false; // 手机是否开启位置服务
    return () => {
      return Observable.create(observer => {
        if (enabledLocationService) {
          observer.next(true);
        } else {
          this.diagnostic.isLocationEnabled().then(enabled => {
            if (enabled) {
              enabledLocationService = true;
              observer.next(true);
            } else {
              enabledLocationService = false;
              this.alertCtrl.create({
                title: '您未开启位置服务',
                subTitle: '正在获取位置信息',
                buttons: [{ text: '取消' },
                {
                  text: '去开启',
                  handler: () => {
                    this.diagnostic.switchToLocationSettings();
                  }
                }
                ]
              }).present();
              observer.error(false);
            }
          }).catch(err => {
        ////console.log(err, '调用diagnostic.isLocationEnabled方法失败');
            observer.error(false);
          });
        }
      });
    };
  })();

  // 检测app是否有定位权限,如果没有权限则会请求权限
  private assertLocationAuthorization = (() => {
    let locationAuthorization = false;
    return () => {
      return Observable.create(observer => {
        if (locationAuthorization) {
          observer.next(true);
        } else {
          this.diagnostic.isLocationAuthorized().then(res => {
            if (res) {
              locationAuthorization = true;
              observer.next(true);
            } else {
              locationAuthorization = false;
              this.diagnostic.requestLocationAuthorization('always').then(res => {// 请求定位权限
                if (res == 'DENIED_ALWAYS') {// 拒绝访问状态,必须手动开启
                  locationAuthorization = false;
                  this.alertCtrl.create({
                    title: '缺少定位权限',
                    subTitle: '请在手机设置或app权限管理中开启',
                    buttons: [{ text: '取消' },
                    {
                      text: '去开启',
                      handler: () => {
                        this.diagnostic.switchToSettings();
                      }
                    }
                    ]
                  }).present();
                  observer.error(false);
                } else {
                  locationAuthorization = true;
                  observer.next(true);
                }
              }).catch(err => {
            ////console.log(err, '调用diagnostic.requestLocationAuthorization方法失败');
                observer.error(false);
              });
            }
          }).catch(err => {
        ////console.log(err, '调用diagnostic.isLocationAvailable方法失败');
            observer.error(false);
          });
        }
      });
    };
  })();

}

