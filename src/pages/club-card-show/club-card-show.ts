import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the ClubCardShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-club-card-show',
  templateUrl: 'club-card-show.html',
})
export class ClubCardShowPage {
  Explain: any;

  constructor(   private sanitizer: DomSanitizer,public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.getExplain()
  }
   pageData={
    canTime:""
    }
    pageTools={
      iPlate:{}
    }
  ionViewDidLoad() {
////console.log('ionViewDidLoad ClubCardPage');
    // 
  }
  getExplain() {
    var api = 'Agreement/MonthlyCardExplain';
    this.http.httpPost(api, {
    }, (data) => {
  
    },err => {
      
      this.Explain = this.sanitizer.bypassSecurityTrustHtml(err.error.text);
    })
  }
  ionViewWillEnter(){
    this.getPage();
  }
  canTimeInit(item){
    let text="";
    if(!item.sTime||(item.sTime=="00:00:00"&&item.eTime=="23:59:59")){
      text="全天";
    }else{
     text = item.sTime+"-"+item.eTime;
    }
    return  text;
       
   }
  choseP(item){
    this.tools.rePlateLog(this.navCtrl,(d)=>{this.pageTools.iPlate=d;this.changeP(item)},"ClubCardShowPage",null,-1,1,1)
  }
  
  changeP(item){

  //   添加/更改月卡车牌
	// User/monthly_plate
	// 参数：type类型：添加add--更改update，user_id，plate，id月卡id
  // 返回值：code，info
  var api = 'User/monthly_plate';
  this.http.httpPost(api, {
    type:"update",
    plate:this.pageTools.iPlate,
    id:item.id
  }, (data) => {
if(data.code="success"){
  this.tools.showToast(data.info);
  this.getPage();
}
  // ////console.log(this.pageData);
   
  })


  }
 
  getPage(){
    var loading=this.tools.showLoading();
    var api = 'User/userinfo';
    this.http.httpPost(api, {
    }, (data) => {
     this.pageData=data;
     this.canTimeInit(data)
 ////console.log(this.pageData);
     loading.dismiss();
    },()=>{
      loading.dismiss();
    })
  }
  goBuy(){
    this.navCtrl.push('ClubCardPage')
 }
}
