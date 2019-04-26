import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';

/**
 * Generated class for the HelpDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help-detail',
  templateUrl: 'help-detail.html',
})
export class HelpDetailPage {

  pageData={}

  constructor(public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
   
  }
  
  ionViewDidLoad() {
    this.getPage();
  }
 
  getPage(){
    var api = 'Settings/helpContent';
    this.http.httpPost(api, {
      id:this.navParams.get("id")
    }, (data) => {
      if (data.code=="error") {
        //  this.tools.showToast(data.info);
      }else{
    ////console.log(data);
        
          this.pageData=data.data;
      }

    })
  }
}
