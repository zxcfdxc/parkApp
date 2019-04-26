import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { Appconfig } from '../../providers/baseservice/app.config';
/**
 * Generated class for the ParkDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-park-detail',
  templateUrl: 'park-detail.html',
})

export class ParkDetailPage {
  pageData={
    user:{},
    
   };
   baseImgUrl=Appconfig.baseImgUrl;
  constructor(public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.getPage();
  }

  ionViewDidLoad() {
  }
  getPage(){
    var api = 'Index/parkInfo';
    this.http.httpPost(api, {
     id:this.navParams.get("id")
    }, (data) => {
      if (data.code=="error") {
      }else{
          this.pageData=data;
      }

    })
  }
  //跳转第三方地图
  goMapApp() {
     this.tools.openMapActionSheet([this.pageData['ParkAmapX'],(this.pageData as any).ParkAmapY]);
  }
  //去预约
  goChose(id) {
    if (!id) {
      this.tools.showToast("没有车场信息");
      return;
    }
    this.navCtrl.push('ChoseCarportPage', {
      id: id
    })
    
  }
}

