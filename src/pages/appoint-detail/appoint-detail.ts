import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appconfig } from '../../providers/baseservice/app.config';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';

/**
 * Generated class for the AppointDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appoint-detail',
  templateUrl: 'appoint-detail.html',
})
export class AppointDetailPage {
  pageData={
    user:{},
    
   };
   baseImgUrl=Appconfig.baseImgUrl;
  constructor(public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
    // this.getPage()
  }
   ionViewCanEnter(){
    var is=this.getPage();
////console.log(is);
    
  return is;
   }
  ionViewDidLoad() {
  }
  getPage(){
    var promise = new Promise((resolve, reject)=>{

    
    var api = 'Book/bookRecord';
     this.http.httpPost(api, {
   
    }, (data) => {
  ////console.log(data);
      
      if(!data||!data.about){
        this.tools.showToast("您没有预约信息");
        this.navCtrl.pop();
       reject();
      }else
      if (data.code=="error") {
        reject();
      }else{
    ////console.log(data);
          this.pageData=data;
          this.tools.set("Appointment",data.id)
          resolve();
          
      }

    })
  })
  return promise;
  }
  //跳转第三方地图
  goMapApp() {
     this.tools.openMapActionSheet([this.pageData['ParkAmapX'],(this.pageData as any).ParkAmapY]);
  }
  //我已到达
  hasDone(id){
    this.tools.showConfirm(null,()=>{
    var api = 'Book/destination';
    this.http.httpPost(api, {
      id:id
    }, (data) => {
  ////console.log(data)
      if (data.code=="error") {
      }else{
        this.tools.showToast(data.info);
        // this.navCtrl.push("HomePage");
        this.navCtrl.popToRoot();
      }

    })
  },"您确认到达？")
  }
    //取消预约Book/cancelBook
    yuYueCancel(id){
       this.yuYueCancel1(id,"您确认取消预约？",1)
  
    }
    yuYueCancel1(id,con,type?){
      var load;
      this.tools.showConfirm(null,()=>{
        load=this.tools.showLoading("取消中...");
        var api = 'Book/cancelBook';
        this.http.httpPost(api, {
          id:id,
          type:type
        }, (data) => {
      ////console.log(data)
      load.dismiss();
      if (data.code=="error") {
      }else if(data.code==400){
              this.yuYueCancel1(id,data.info)
            }else{
              this.tools.showToast(data.info);
              if(this.navParams.get("isBTwo")){
                this.navCtrl.popToRoot();
              }else{
                this.navCtrl.pop();
              }
              
            }
        })
      },con)
  
    }

}

