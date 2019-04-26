import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';

/**
 * Generated class for the HisMonDePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-his-mon-de',
  templateUrl: 'his-mon-de.html',
})
export class HisMonDePage {
  pageData={
  }
  pageTools={
    paytype:["预存缴费","app微信","app支付宝","场内微信扫描","场内支付宝扫描","出口微信扫描","出口支付宝扫描","现金"]
  }
  constructor(public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter(){
   
  
    this.getPage()
  }
  // 1充值，2停车，3充电，4月卡
  getPage(){
    // payment_record_c
    var api = 'User/payment_record_detail';
    this.http.httpPost(api, {
     id:this.navParams.get("id")
    }, (data) => {
      if (data.code=="error") {
      }else{
          this.pageData=data;
      }

    })
  }
}
