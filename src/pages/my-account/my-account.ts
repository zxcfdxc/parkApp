import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  isNewYou: boolean=false;
   pageData:any={
     user:{} 
  };
  Explain: any;
  constructor(
    public tools:ToolsProvider,
    public http:BaseserviceProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private sanitizer: DomSanitizer,) {
  
  }

  ionViewDidLoad() {
   
  }
  ionViewWillEnter(){
    this.page();
    this.getExplain();
    
  }
  page() {
    this.isNewYou=this.tools.get("useerData").new==1;
    var api = 'User/userinfo';
    this.http.httpPost(api, {
    }, (data) => {
     this.pageData = data;
     this.pageData.user.money = (this.pageData.user.money*1).toFixed(2);
     this.tools.set("useerData",data);
     this.isNewYou = this.tools.get("useerData").new==1;
    })

  }
  getExplain() {
    var api = 'Agreement/topUpsExplain';
    this.http.httpPost(api, {
    }, (data) => {
  
    },err => {
      
      this.Explain = this.sanitizer.bypassSecurityTrustHtml(err.error.text);
    })
  }
  clickYou(){
    var api = 'User/newcoupon';
    this.http.httpPost(api, {
    }, (data) => {
    
    })
    this.navCtrl.push('CouponPage');
  }

  tiShi(){
    this.tools.showToast(`请参照充值协议条款。充值剩余金额提现需联系停车场管理部门现场提现。
    地址：***************************
    电话：********`)
  }
 goYue(){
   
   if(this.pageData.monthly&&this.pageData.monthly.length>0){
    this.navCtrl.push('ClubCardShowPage')
   }else{
    this.navCtrl.push('ClubCardPage')
   }
  
 }

   
  buy(){
    this.navCtrl.push("RechargePage")
    // this.tools.openPayActionSheet(()=>{
    //   var api = 'Alipay/prestore';
    //   this.http.httpPost(api, {
    //     dt:this.tools.getWhatApp()||3,
    //     type_id:1,//充值类型id
    //     money:0.01
    //   }, (data) => {
    // ////console.log(data)
    //     if (data.info) {
    //     }else{
    //        this.tools.alipay(data);
    //     }
    //   })
    // },()=>{
    // })
   
   }
}
