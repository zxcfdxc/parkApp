import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the RechargeXiePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recharge-xie',
  templateUrl: 'recharge-xie.html',
})
export class RechargeXiePage {
  pagaData: any;

  constructor(public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams,
    private sanitizer: DomSanitizer,) {
  }

  ionViewDidLoad() {
    this.getPage()
////console.log('ionViewDidLoad RechargeXiePage');

  }
  getPage(){
    var api = 'Agreement/topUps';
    this.http.httpPost(api, {
    //  type:1
    }, (data) => {
      // if (data.code=="error") {
      // }else{
      //    this. = this.sanitizer.bypassSecurityTrustHtml(data);
      // }
    },err => {
      
      this.pagaData = this.sanitizer.bypassSecurityTrustHtml(err.error.text);
    })
  }

}
