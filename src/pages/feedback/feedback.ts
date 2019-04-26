import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { ToolsProvider } from '../../providers/tools/tools';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  pageData={
    data:[],
    type:[],
    content:"",
    lastTime:""
  };
  constructor(public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.getPage();
  }

  ionViewDidLoad() {
////console.log('ionViewDidLoad FeedbackPage');
  }
  getPage(){
    var api = 'Settings/feedbackType';
    this.http.httpPost(api, {
    }, (data) => {
      if (data.code=="error") {
        //  this.tools.showToast(data.info);
      }else{
          this.pageData.data=data.data;
      }

    })
  }

  check(id){
    if(this.pageData.type.indexOf(id)!=-1){
      this.pageData.type.splice(this.pageData.type.indexOf(id),1)
    }else{
      this.pageData.type.push(id);
    }
   
  }

  upMes(){
    if(this.pageData.type.length==0){
      this.tools.showToast("请您选择类型");
      return;
    }
    var api = 'Settings/feedback';
    this.http.httpPost(api, {
      type:this.pageData.type.toString(),//->类型id
      content:this.pageData.content//->内容
    }, (data) => {
      if (data.code=="error") {
        //  this.tools.showToast(data.info);
      }else{
        this.tools.showToast(data.info);
       this.navCtrl.pop();
      }

    })
  }
}
