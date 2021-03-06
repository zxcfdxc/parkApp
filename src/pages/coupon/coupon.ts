import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { ToolsProvider } from '../../providers/tools/tools';

/**
 * Generated class for the CouponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupon',
  templateUrl: 'coupon.html',
})
export class CouponPage {
  pageData=[]
  constructor(public http: BaseserviceProvider, public tools: ToolsProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getPage()
  }
  getPage(){
  //   获取用户已领取的优惠券
	// 接口：Index/usercoupan
	// 参数：user_id用户id,type类型：0未使用，1已使用，2全部
	// 返回：有则返回数据，无则返回空值

    var api = 'Index/usercoupan';
    this.http.httpPost(api, {
      type:0
    }, (data) => {
      if (data.code=="error") {
      }else{
          this.pageData=data;
      }

    })
  }
}
