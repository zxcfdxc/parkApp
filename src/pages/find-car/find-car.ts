import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appconfig } from '../../providers/baseservice/app.config';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { LocalStorageService } from 'angular-web-storage';
/**
 * Generated class for the FindCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-find-car',
  templateUrl: 'find-car.html',
})
export class FindCarPage {
    nextPageD={"space":{}}
  pageData={
    about:{},
    space:{},
   };
   useTime="";
   lastTime="";
   dataPlate=[]
   isShow=false;
   baseImgUrl=Appconfig.baseImgUrl2;
   intersal;
   chosePlate;//选择的车牌
  constructor(public storge: LocalStorageService,public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
 
  }
  ionViewCanEnter(){
  
  }
   ionViewWillEnter(){
   this.ifChose()
  // this.getPage("粤BD12345")
   this.errorImg()
   }
  ionViewDidLoad() {
    // this.getPage();
  }
  ionViewWillLeave(){
   

   clearInterval(this.intersal)
  }
  goDetail(plate){
    clearInterval(this.intersal)
    this.navCtrl.push("CurrentCarPage",{
      plate:plate
    })
  }
  ifChose(){
   
    // if(this.storge.get("chosePlate")){
    //   this.getPage(this.storge.get("chosePlate"));
    //   return;
    // }
    if(this.navParams.get("carNum")){
      this.getPage(this.navParams.get("carNum"));
      return;
    }
    if(this.chosePlate){
      this.getPage(this.chosePlate);
      return;
    }
    this.tools.requirePlate(this.navCtrl,(a)=>{this.getPage(a)},"FindCarPage")
    // var loading=this.tools.showLoading();
    // if(this.storge.get("loginKey")){
     
    //   var api = 'User/myCarInfo';
    //   this.http.httpPost(api, {
    //   }, (data) => {
    //     if (data.code=="error") {
    //     }else{
    //       this.dataPlate=data;
    //       this.tools.plateGoorCho(this.navCtrl,data,()=>{this.getPage(data)})
    //     }
  
    //   },()=>{loading.dismiss()},()=>{
    //     loading.dismiss();
    //   })
    // }else{
    //   this.navCtrl.push('AddCarPage', {
    //     type: 0,//0没有车牌、1一个车牌、2多个
    //     save:0,//0不保存，1保存
    //     goTo:"CurrentCarPage",//打算去哪
    //   },{
    //     animate: false
    //   }).then(()=>{
    //     loading.dismiss();
    //     this.navCtrl.remove(this.navCtrl.getActive().index-1)
    //   })
    //   return false;
    // }
  }
  getPage(plate?){
////console.log(plate);
   plate&&(this.chosePlate=plate);
    var api = 'User/realTimeInfo';
    this.http.httpPost(api, {
      plate:plate,
    }, (data) => {
      if (data.code=="error") {
        this.storge.remove("chosePlate");
        this.tools.showConfirm(null,()=>{
          this.navCtrl.push('AddCarPage', {
            type: 0,//0没有车牌、1一个车牌、2多个
            save:0,//0不保存，1保存
            goTo:"FindCarPage",//打算去哪
          },{
            animate: false
          }).then(()=>{
        //  this.navCtrl.remove(this.navCtrl.getActive().index-1);
          })
        },"没有该车的停车信息",()=>{
          this.navCtrl.pop();
        },"换个车牌")
        return;
        //  this.tools.showToast(data.info);
      }else{
        if(data.space.zone.length==0){
        this.tools.showToast("无法获得车位信息")
        }
    ////console.log(data);
        this.isShow=true;
          this.pageData=data;
          this.nextPageD=data;
          this.nextPageD["space"]['about']=data.about;
          data.record&&this.showLastTime(data.record.TimeEnter);
          this.showUseTime(this.pageData['real'].time_length)
      }

    },null,null,2)
  }
  //点击选择多个车牌
  f_chosePlate(){
    if(this.tools.isLogin()!=1){
      this.navCtrl.push('AddCarPage', {
        type: 0,//0没有车牌、1一个车牌、2多个
        save:0,//0不保存，1保存
        goTo:"FindCarPage",//打算去哪
      }).then(()=>{
     this.navCtrl.remove(this.navCtrl.getActive().index-1);
      })
      return;
    }
    var api = 'User/myCarInfo';
    this.http.httpPost(api, {
    }, (data) => {
      if (data.code=="error") {
      }else{
        this.dataPlate=data;
     // 没有添加，1个自动，多个选择
  if(this.dataPlate.length==1){
      this.navCtrl.push('AddCarPage', {
        type: 0,//0没有车牌、1一个车牌、2多个
        save:1,//0不保存，1保存
        goTo:"FindCarPage",//打算去哪
      }).then(()=>{
     this.navCtrl.remove(this.navCtrl.getActive().index-1);
      })
      return false;
    }else{
       this.tools.showRadio("请选择车牌",(datain)=>{
         ////console.log(datain);
             this.storge.set("chosePlate",datain);
             this.getPage(datain);
       },this.dataPlate,["PlateNumber","PlateNumber"])
    }
  }
})
  }
  
  
//时间戳转换2018-04-16 11:18:29
changeTime(){
  
}
showUseTime(time){
  let times=time
  this.useTime=this.tools.timeStoLiveT(time*1+60)
  this.intersal= setInterval(()=>{
    times=times*1+60
    this.useTime= this.tools.timeStoLiveT(times)
      },60000);
}
showLastTime(time){
  this.lastTime= this.tools.timeDif(time);
//  this.intersal= setInterval(()=>{
//     this.lastTime= this.tools.timeDif(time);
//   },1000);

 }
  goCarMap() {
    if(this.pageData.space['Camera']){
      this.navCtrl.push("FindCarMapPage",{data:this.nextPageD.space});
    }else{
     this.tools.showToast("无法获取车位信息")

    }
 
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

  //买
  pay(){
    // if(this.tools.isLoginGo())
    this.navCtrl.push("OrderConfigPage",{carNum:this.chosePlate})
  }
  errorImg(){
    document.addEventListener("error", function (e) {
////console.log(e);
   
      var elem:any = e.target;
      if (elem.tagName.toLowerCase() == 'img'&&( elem.src!= "./assets/imgs/errorload.jpg")) {
        elem.src = "./assets/imgs/errorload.jpg";
      }
    },true);
    // $("img").each(function () {
    //   if (!this.complete || (typeof this.naturalWidth == "undefined" && this.naturalWidth == 0) || !this.src) {
    //     $(this).attr("src", "./assets/imgs/che.png");
    //   }
    // });
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
        }else{
        
        }
  
      })
    }

}
