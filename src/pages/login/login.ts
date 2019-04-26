import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import{Appconfig}from '../../providers/baseservice/app.config';
import { LocalStorageService } from 'angular-web-storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  page = {
    key: "",//密码
    inType: "password",//是否看密码
    tel: "",//手机号
    type:"",//平台参数：1安卓，2ios，3公众号
  };
  paseKey=Appconfig.getZkey();
  constructor(public navCtrl: NavController,public http:BaseserviceProvider,public storge:LocalStorageService,public tools:ToolsProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.isLogin();
  }
  //过滤
  filtNum(event,data){
    this.page[data]=(event.target.value+"").replace(/\D/g,'');
  }
  filtKey(event,data){
    this.page[data]=(event.target.value+"").replace(/[\W]/g,'');
  }
  goForget(){
     this.navCtrl.push("ForgetmPage")
  }
  goRegister(){
    this.navCtrl.push("RegisterPhonePage")
  }
  login(){
    var api = 'login/login';
    if (!this.paseKey.test(this.page.key)) {
      this.tools.showToast("登录密码格式不对,请您重新确认");
      return;
    }
    
    if(!this.tools.isPoneAvailable(this.page.tel))return;
    this.http.httpPost(api, {
      username: this.page.tel  ,
      password: this.page.key,
      type: this.tools.getWhatApp()||3,
      jpushId:this.tools.get("Jpush")
    }, (data) => {
      if (data.code == 'success') {
       this.storge.set("loginKey",data.key);
       this.storge.set("loginId",data.result.id);
        // this.navCtrl.push("AccountPage");
        this.navCtrl.pop()
      }
    })
  }
  //判断是否登录
  isLogin(){
    let key=this.storge.get("loginKey");
    if(key){
      // this.navCtrl.pop();
    }
  }

}
