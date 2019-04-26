import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { DownProvider } from '../../providers/down/down';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  pageData={
  up:{},
  nowV:null,
  };
  
  constructor(private platform: Platform, private down: DownProvider, public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
   this.getPage();
  }
  getPage(){
  if(this.platform.is("ios")){
    this.pageData.nowV=this.tools.get("iosV")
  }else if(this.platform.is("android")){
    this.pageData.nowV=this.tools.get("androidV")
  }
    // this.pageData.nowV=this.tools.get("androidV")||"无法获取版本号";
  }

  upApp(){
  this.down.getUpApp(true);
 
  }


}
