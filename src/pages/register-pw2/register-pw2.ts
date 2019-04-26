import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { ToolsProvider } from '../../providers/tools/tools';

/**
 * Generated class for the RegisterPw2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-pw2',
  templateUrl: 'register-pw2.html',
})
export class RegisterPw2Page {
  page = {
    key: "",//密码
    inType: "password",//是否看密码
    key2: "",//密码
    inType2: "password",//是否看密码
  };
tel;
  constructor(public http: BaseserviceProvider, public tools: ToolsProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
////console.log('ionViewDidLoad RegisterPw2Page');
  }
   //过滤
   filtNum(event,data){
    this.page[data]=(event.target.value+"").replace(/\D/g,'');
  }
  filtKey(event,data){
    this.page[data]=(event.target.value+"").replace(/[\W]/g,'');
  }
    //下一步
    next() {
      this.alertok()
      // this.tools.showConfirm("",()=>{this.alertok()},"您确认设置为此密码？")
    }
    alertok(){
      var keyZhen = /^[a-zA-Z0-9]{6,}$/;//登录密码格式
      var api = 'login/register';
      if (!keyZhen.test(this.page.key)) {
        this.tools.showToast("登录密码格式不对,请您重新确认");
        return;
      }
      if (this.page.key!=this.page.key2) {
        this.tools.showToast("两次输入的密码不同,请您重新确认");
        return;
      }
     
      this.http.httpPost(api, {
        username: this.navParams.get("tel") ,
        password: this.page.key,
        type: this.tools.getWhatApp()||3,
      }, (data) => {
        if (data.code == 'success') {
          this.tools.showToast(data.info);
          this.navCtrl.push("LoginPage",{

          }).then(()=>{
            this.navCtrl.remove(this.navCtrl.getActive().index-1);
            this.navCtrl.remove(this.navCtrl.getActive().index-1)
          });
        }
      })
    }

}
