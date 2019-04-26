import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
/**
 * Generated class for the RechargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// declare var $:any;
@IonicPage()
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
})
export class RechargePage {
  pageData={
    data:[],
    type:"",
    zen:0,
    chongM:0,
    inputM:"" as any,
    payType:1,
  };
  
  constructor(public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getPage()
  }
  getPage(){
    var api = 'User/money_type';
    this.http.httpPost(api, {
     id:this.navParams.get("id")
    }, (data) => {
      if (data.code=="error") {
      }else{
          this.pageData.data=data;
          this.check(data[0]);
      }

    })
  }

   
/**
 * 1微信，2支付宝
 */
  pay(){
    if(this.pageData.inputM&&this.pageData.inputM<10&&this.pageData.chongM<10){
      this.tools.showToast("最小充值金额10元");
      return;
    }
    if(this.pageData.chongM==0||!this.pageData.chongM){
      this.tools.showToast("请您选择充值金额");
      return;
    }
if(this.pageData.payType==2){
  var api = 'Alipay/prestore';
  this.http.httpPost(api, {
    dt:this.tools.getWhatApp()||3,
    type_id:this.pageData.type,//充值类型id
    money:this.pageData.chongM
  }, (data) => {
////console.log(data)
    if (data.code=='error') {
    }else if(data.code=='100'){
       this.tools.showToast(data.info)
    }else{
       this.tools.alipay(data,this.navCtrl);
    
    }
  })
}else if(this.pageData.payType==1){
  this.tools.weChatPay({
    dt:this.tools.getWhatApp()||3,
    type_id:this.pageData.type,//充值类型id
    money:this.pageData.chongM,
    payway:"cz"
  },this.navCtrl);
  // var apiw = 'Wxapp/createOrder';
  // this.http.httpPost(apiw, {
  //   dt:this.tools.getWhatApp()||3,
  //   type_id:this.pageData.type,//充值类型id
  //   money:this.pageData.chongM,
  //   payway:"cz"
  // }, (data) => {
  //////console.log(data)
  //   if (data.code=='error') {
  //   }else if(data.code=='100'){
  //      this.tools.showToast(data.info)
  //   }else{
  // ////console.log(data)
  //    this.tools.weChatPay(data,this.navCtrl);
    
  //   }
  // })
}
  }
  check(item){
    this.pageData.type=item.id;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    this.pageData.zen=item.present;
    this.pageData.chongM=item.money
  }
  inputIn(){
////console.log( this.pageData.inputM);
    
    this.pageData.inputM&&(this.pageData.inputM=this.pageData.inputM.replace(/\D/g,''));
    // this.pageData.inputM=<number>this.pageData.inputM;
    var a=this.pageData.inputM*1;
      this.pageData.chongM=this.pageData.inputM
      if(a>1000){
   this.pageData.inputM=this.pageData.chongM=1000;
      }
//     if(a<=1000){
//     this.pageData.chongM=this.pageData.inputM
//     }else if(a>1000&&a<=1000){
//         this.pageData.inputM=this.pageData.chongM=Math.floor(a/100)*100; 
//     }
//     else if(a>1000){
//  this.pageData.inputM=this.pageData.chongM=1000;
//     }
    this.pageData.zen=this.findZfromM(this.pageData.chongM).z;
    this.pageData.type=this.findZfromM(this.pageData.chongM).t as any;
  }
  inputBlur(){
     var a=this.pageData.inputM*1;
////console.log(a)
    if(a==0)return;
    if(this.pageData.inputM<100&&(this.pageData.type as any==0)){
      this.pageData.chongM=this.pageData.inputM=100;
    }
     if(a>100&&a<=1000){
      this.pageData.inputM=this.pageData.chongM=Math.floor(a/100)*100; 
    }else if(a>1000){
 this.pageData.inputM=this.pageData.chongM=1000;
    }
      this.pageData.zen=this.findZfromM(this.pageData.chongM).z;
      this.pageData.type=this.findZfromM(this.pageData.chongM).t as any;
  }
  //根据money找赠
  findZfromM(m){
    var f={
      z:0,
      t:0
    };
    this.pageData.data.forEach((v,i)=>{
         if(Number(v.money)==m){
           f.z=v.present;
            f.t=v.id;
           return;
         }
    })
    return f;
  }
}
