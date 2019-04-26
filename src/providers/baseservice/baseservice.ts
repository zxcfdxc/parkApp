
// import{Http,Jsonp,Headers,RequestOptions} from '@angular/http';
import'rxjs/add/operator/map';
import{Appconfig}from './app.config';
// import { ToolsProvider }  from '../tools/tools';
import { Injectable } from '@angular/core';  
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';  
import { LocalStorageService } from 'angular-web-storage';
import { ToastController } from 'ionic-angular';
@Injectable()  
export class BaseserviceProvider {  
  
  httpOptions = {  
    headers: new HttpHeaders({ 'Content-Type': 'application/json;application/x-www-form-urlencodeed; charset=utf-8'})  
  };  
  
  constructor(public toastCtrl:ToastController,private httpClient : HttpClient,private storage:LocalStorageService) {
    
  }
  private showToasts;
  showToast(text,position="middle") {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position:position,
      cssClass:"toastTheme"
    });
  
    // toast.onDidDismiss(() => {
    //////console.log('Dismissed toast');
    // });
  
    toast.present();
    return toast;
  }
  /** isShowEr
   * @param {Object} isShowEr 1显示，2不显示
   * @param {Object} isIdParam 是否有useid参数
   *
  */
  httpPost(reqUrl : string, json, success,err?,comp?, isShowEr=1,isIdParam=true) {  
    let param = new HttpParams();
   var baseUrl=Appconfig.getBaseUrl();
   if(this.storage.get("loginKey")&&isIdParam){
      json.user_id=json.user_id||this.storage.get("loginId");
      json["key"]=this.storage.get("loginKey");
   }
  //  var body=new HttpParams().set('tel','15911165531');
  Object.keys(json).forEach(function (key) {
    param = param.append(key, json[key]);
});
  if(reqUrl.indexOf("http")==-1){
  reqUrl=baseUrl+reqUrl;
     }

  // ////console.log(param)
    this.httpClient.post(reqUrl, param)  
    .subscribe(  
      (val) => { 
        if (val&&(val as any).code=="error"&&isShowEr==1) {
          this.showToast((val as any).info);
       }
        success(val);
       
        //////console.log('post请求成功', val);  
      
        // if(val['success']){  
        //   comp.postOk(val, flag);  
        // }else{  
        //   comp.postErr(val, flag);  
        // }  
      },  
      error => {  
        
    ////console.log('post请求失败', error); 
////console.log(this.showToasts);
   
        // if(! this.showToasts){
        //   if(error.statusText="Unknown Error") {
        //    this.showToasts= this.showToast('请求失败')
        //   }else{
        //     this.showToasts= this.showToast('网络请求失败')
        //   }  
        // }else{
        //   setTimeout(()=>{
        //     this.showToasts=null;
        //   },2000)
        
        // }
        if(err){
          err(error)
        }
        // comp.postErr(error, flag);  
      } ,
      ()=>{
        if(comp){
          comp()
        }
      }
    );  
      
  }  
  
  httpGet(reqUrl : string, json, success, err?) {  
    let param = new HttpParams();
    var baseUrl=Appconfig.getBaseUrl();
   //  var body=new HttpParams().set('tel','15911165531');
   Object.keys(json).forEach(function (key) {
     param = param.append(key, json[key]);
 });
  //  let api;
  if(reqUrl.indexOf("http")==-1){
    reqUrl=baseUrl+reqUrl;
  }
   // ////console.log(param)
     //后台接收数据 需要 @RequestBody 标签  
     this.httpClient.post(reqUrl, param)  
     .subscribe(  
      val => {  
        //////console.log('get请求成功', val);  
        success(val);  
      },  
      error => {  
    ////console.log('get请求失败', error);  
        err(error);  
      }  
    );  
  }  
  
  show() : string {  
    return '我是 HttpRequestService 调用我干嘛';  
  }  
  
  
  
}  