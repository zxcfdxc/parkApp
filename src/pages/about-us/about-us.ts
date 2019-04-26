import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the AboutUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {
  pageData={};
  constructor(public tools:ToolsProvider,private sanitizer: DomSanitizer,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getPage();
  }
   //信任html
   assembleHTML(strHTML:any) {
////console.log();
    
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
    }
 getPage(){
  var api = 'Settings/ourselves';
  this.http.httpPost(api, {
   
  }, (data) => {
    if (data.code=="error") {
    }else{
        this.pageData=data.data.content;
    }

  })
 }
}
