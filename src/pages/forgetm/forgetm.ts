import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * Generated class for the ForgetmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forgetm',
  templateUrl: 'forgetm.html',
})
export class ForgetmPage {
   sec = 60;
  page = {
    tel:null,//手机号
    key: "",//密码
    inType: "password",//是否看密码
    key2: "",//密码
    inType2: "password",//是否看密码
    lessSec: this.sec,//剩余秒数
    isSent: false,//是否发送
    yanKey: "",//验证码
    saveYan:"",//返回验证码
    timeCleanY:null,
    interCleanY:null,
    isNoTel:false,
    reqType:"zhmm"
  };
  pData;
  miForm = new FormGroup({
    passMi: new FormControl()
  });
  // @ViewChild('mySquares') squaresInput: ElementRef;
  constructor(public http: BaseserviceProvider, public tools: ToolsProvider, public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewWillEnter(){
    this.page.isNoTel=this.tools.get("useerData")&&this.tools.get("useerData").user.UserName;
   this.page.tel=this.tools.get("useerData")&&this.tools.get("useerData").user.UserName;
  }
  //过滤
  filtNum(event,data){
    this.page[data]=(event.target.value+"").replace(/\D/g,'');
  }
  filtKey(event,data){
    this.page[data]=(event.target.value+"").replace(/[\W]/g,'');
  }
  saveData(data){
////console.log(data);
    
    this.page.saveYan=data.saveYan;
    this.page.yanKey=data.yanKey
  }
  //下一步
  next() {
    var keyZhen = /^[a-zA-Z0-9]{6,}$/;//登录密码格式
    var api = 'login/retrieve_password';
    if (!keyZhen.test(this.page.key)) {
      this.tools.showToast("登录密码格式不对,请您重新确认");
      return;
    }
    if(!this.page.saveYan){
      this.tools.showToast("验证码已过期或未发送");
      return;
    }
    if(!this.page.yanKey||this.page.saveYan!=this.page.yanKey){
      this.tools.showToast("验证码不正确,请您重新确认");
      return;
    }
    if (this.page.key!=this.page.key2) {
      this.tools.showToast("两次输入的密码不同,请您重新确认");
      return;
    }
    if(!this.tools.isPoneAvailable(this.page.tel))return;
    
    // sub();
    //注册
    // function sub(){
    //   $.post("http://192.168.0.214/park/index.php/index/login/register",
    //   {
    //     username: _this.tel || 13754011478,
    //     password: _this.page.key,
    //     // code: _this.page.yanKey
    //   },function(msg){
    //     _this.tools.showToast(msg.info);
    //     if (msg.code == 'success') {
    //       _this.navCtrl.push("Login");
    //     }
    //   },'json');
    
    // }
    this.http.httpPost(api, {
      tel: this.page.tel ,
      password: this.page.key
    }, (data) => {
      if (data.code == 'success') {
        this.tools.showToast(data.info)

        // this.navCtrl.pop();
        // if(this.navParams.get("goTo")=="back"){
        //   this.navCtrl.pop();
        //   return;
        // }
       this.outLogmain()
      }
      
    })
  }
  outLogmain(){
    var first=this.tools.get('firstIn');
    this.tools.clear();
    this.tools.set('firstIn',first)
    this.navCtrl.push("LoginPage",{
    
    }).then(()=>{
    
     this.navCtrl.remove(this.navCtrl.getActive().index-1);
     if(  !this.page.isNoTel){
      this.navCtrl.remove(this.navCtrl.getActive().index-1);
     }
    })
  }
  // 验证
  sendMsg() {
    if(!this.tools.isPoneAvailable(this.page.tel )){
     this.tools.showToast("请您输入正确手机号")  
      return;
    }
    if(this.page.interCleanY)clearInterval(this.page.interCleanY);
    this.page.interCleanY=setInterval(() => {
      this.page.lessSec--;
      if (this.page.lessSec < 1) {
        this.page.isSent = false;
        this.page.lessSec == this.sec;
       
        return;
      }
    }, 1000)
      var api = 'login/sendMsgs';
    
    this.http.httpPost(api, {
      tel: this.page.tel,
      type:'zhmm'
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
        
      } else {
        // this.tools.showToast("发送失败");
      }
    
    
    })

  }


}

