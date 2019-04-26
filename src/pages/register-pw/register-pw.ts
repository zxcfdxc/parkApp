import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
// import { Appconfig } from '../../providers/baseservice/app.config';
/**
 * Generated class for the RegisterPwPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var $: any;
@IonicPage()
@Component({
  selector: 'page-register-pw',
  templateUrl: 'register-pw.html',
})

export class RegisterPwPage {
  tel; sec = 60;
  page = {
    key: "",//密码
    inType: "password",//是否看密码
    lessSec: this.sec,//剩余秒数
    isSent: false,//是否发送
    yanKey: "",//验证码
    saveYan:"",//返回验证码
    timeCleanY:null,
    interCleanY:null
  };
  miForm = new FormGroup({
    passMi: new FormControl()
  });
  @ViewChild('mySquares') squaresInput: ElementRef;
  constructor(public http: BaseserviceProvider, public tools: ToolsProvider, public navCtrl: NavController, public navParams: NavParams) {

    this.tel = navParams.data.tel;
     
  }

  ionViewDidLoad() {
////console.log('ionViewDidLoad RegisterPwPage');
    this.sendMsg();
  }
  saveData(data){
////console.log(data);
    
    this.page.saveYan=data.saveYan;
    this.page.yanKey=data.yanKey
  }
 
  //下一步
  next() {
    if(!this.page.saveYan){
      this.tools.showToast("验证码已过期或未发送");
      return;
    }
    if(this.page.saveYan!=this.page.yanKey){
      this.tools.showToast("验证码不正确,请您重新确认");
      return;
    }
    this.navCtrl.push("RegisterPw2Page",{yan:this.page.saveYan,tel:this.tel}).then(()=>{
      this.navCtrl.remove(this.navCtrl.getActive().index-1);
    })
  }
  // 验证
  sendMsg() {
    if(this.page.interCleanY)clearInterval(this.page.interCleanY);
    this.page.interCleanY=setInterval(() => {
      this.page.lessSec--;
  ////console.log(this.page.saveYan);
      
      if (this.page.lessSec < 1) {
        this.page.isSent = false;
        this.page.lessSec == this.sec;
        // this.page.saveYan="";
        return;
      }
    }, 1000)
    var api = 'login/sendMsgs';
    
    this.http.httpPost(api, {
      tel: this.tel || 13754011478
    }, (data) => {
  ////console.log(data);
      this.page.isSent = true;
      this.page.lessSec = this.sec;
    //清理timeout
    if(this.page.timeCleanY){
      clearTimeout(this.page.timeCleanY);
    }
    this.page.timeCleanY=setTimeout(() => {
      this.page.saveYan=null;
    }, 3*60*1000);
      if (data.code == 'success') {
        this.page.saveYan=data.codenum;
        this.tools.showToast(data.info);
      }else{
        this.navCtrl.pop();
      } 
      // else {
      //   this.tools.showToast("发送失败");
      // }
    })

  }
  

}
