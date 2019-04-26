import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Appconfig } from '../../providers/baseservice/app.config';
import { LocalStorageService } from 'angular-web-storage';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';

/**
 * Generated class for the FindCarMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-car-map',
  templateUrl: 'find-car-map.html',
})
export class FindCarMapPage {
  // events: any;
 // @ViewChild("left") eleLeft:ElementRef;
 pageData={
  data:{},
  chewei:{},
  baseImgU:Appconfig.baseImgUrl,
  zoom:1,//左边缩放
  zoomR:1,//右边缩放
  lWidth:75,//左边宽
  rWidth:200,//右宽
  zoneId:0,//车场选择Id
  carZoneId:0,//车辆所在车场Id
  zoneData:{}
 };
 constructor( private events: Events,public storage:LocalStorageService,public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
   // this.getPage()
 }

 ionViewDidLoad() {
      if(this.navParams.get("data")){
        this.handlePData(this.navParams.get("data"));
      }else{
        this.getPage();
      }
   
   //   //当页面进入初始化的时候
   // let elements = document.querySelectorAll(".tabbar");
   // if(elements != null) {
   //     Object.keys(elements).map((key) => {
   //         elements[key].style.display ='none';
   //     });
   // }  
 
 }
 goBack(){
  this.navCtrl.pop().then(() => {
       this.events.publish('custom-user-events', this.navParams.get("plate"));
   });
 }
 chosezone(id){
   this.pageData.zoneId=id;
   (this.pageData.data as any).zone.forEach(zitem => {
     if(zitem.id==id){
       this.pageData.zoneData=zitem;
       this.pageData.zoomR=this.pageData.rWidth/zitem.ZonePicX;
   ////console.log(this.pageData.zoomR);
       
       return;
     }
   });
 }
 goYuDetail(){
   this.navCtrl.push("AppointDetailPage");
 }
  //跳转第三方地图
  goMapApp() {
////console.log([this.pageData.data['about']['ParkAmapX'],(this.pageData.data['about'] as any).ParkAmapY]);
    
    this.tools.openMapActionSheet([this.pageData.data['about']['ParkAmapX'],(this.pageData.data['about'] as any).ParkAmapY]);
 }
 getPage(){
   var api = 'Book/spaceInfo';
   this.http.httpPost(api, {
    id: this.storage.get("Appointment")||38
   }, (data) => {
 ////console.log(data);
     
     if (data.code=="error") {
        this.tools.showToast(data.info);
     }else{
       this.handlePData(data);
     //  $(this.eleLeft.nativeElement).find("#"+data.ZoneID).trigger("click");
     // ////console.log( this.eleLeft.nativeElement.querySelector("#"+data.ZoneID));
      
         // $(data.ZoneID).trigger("click");
         //////console.log(this.pageData.chewei, this.pageData.zoom)
     }
   })
 }
//处理页面数据
  handlePData(data){
    this.pageData.data=data;
    //初始化数据 
    this.pageData.chewei=data.about.ZoneNameOC;
    this.pageData.zoom=this.pageData.lWidth/data.about.ZoneNameOC.all.w;
    this.pageData.carZoneId=data.ZoneID;
    this.chosezone(data.ZoneID);//初始化butn
  }

}