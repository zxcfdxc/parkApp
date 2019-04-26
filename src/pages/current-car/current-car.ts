import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appconfig } from '../../providers/baseservice/app.config';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';

/**
 * Generated class for the CurrentCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-current-car',
  templateUrl: 'current-car.html',
})
export class CurrentCarPage {

  pageData={
    about:{},
    space:{},
   };
   lastTime="";
   dataPlate=[]
   isShow=false;
   intersal;
   baseImgUrl=Appconfig.baseImgUrl;
  constructor(public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.getPage();
  }
  ionViewCanEnter(){
  
  }
 
  ionViewDidLoad() {
   
  }
  ionViewWillLeave(){
    clearInterval(this.intersal)
  }
  goDetail(plate){
    this.navCtrl.push("CurrentCarPage",{
      plate:plate
    })
  }

  getPage(plate?){
////console.log(plate);
   
    var api = 'User/realTimeInfo';
    this.http.httpPost(api, {
      plate:123456||plate||123456,
    }, (data) => {
      if (data.code=="error") {
        //  this.tools.showToast(data.info);
      }else{
        if(!data.space){
          this.tools.showAlert("没有该车的停车信息",()=>{
            this.navCtrl.pop();
          })
          return;
        }
    ////console.log(data);
        this.isShow=true;
          this.pageData=data;
          data.record&& this.showLastTime(data.record.TimeEnter);
      }

    })
  }
  
  
  
//时间戳转换2018-04-16 11:18:29
changeTime(){
  
}
showLastTime(time){
  this.lastTime= this.tools.timeDif(time);
  this.intersal=setInterval(()=>{
    this.lastTime= this.tools.timeDif(time);
  },1000);

 }
  goCarMap() {
    clearInterval(this.intersal)
    this.navCtrl.push("FindCarMapPage");
  }
  //我已到达
  freeCarInfo(id){
    // var api = 'Book/cancelBook';
    // this.http.httpPost(api, {
    //   id:id
    // }, (data) => {
    //////console.log(data)
    //   if (data.info) {
    //      this.tools.showToast(data.info);
    //   }else{
      
    //   }

    // })
  }
    //取消预约Book/cancelBook
    yuYueCancel(id){
      var api = 'Book/cancelBook';
      this.http.httpPost(api, {
        id:id
        // user_id:10,
        // park_id:1,
        // car_plate:123456,
       
      }, (data) => {
    ////console.log(data)
        if (data.info) {
           this.tools.showToast(data.info);
        }else{
        
        }
  
      })
    }

}
