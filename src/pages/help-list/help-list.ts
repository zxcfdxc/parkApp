import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';

/**
 * Generated class for the HelpListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help-list',
  templateUrl: 'help-list.html',
})
export class HelpListPage {
  
  pageData=[]

  constructor(public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
   
  }
  
  ionViewDidLoad() {
    this.getPage();
  }
  goDetail(id){
////console.log(id);
    
    this.navCtrl.push("HelpDetailPage",{
      id:id
    })

  }
  getPage(){
    var api = 'Settings/helpList';
    this.http.httpPost(api, {
    }, (data) => {
      if (data.code=="error") {
        //  this.tools.showToast(data.info);
      }else{
    ////console.log(data);
        this.tools.showToast(data.info);
          this.pageData=data.data;
      }

    })
  }
}
