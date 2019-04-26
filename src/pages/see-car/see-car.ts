import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import{Appconfig}from '../../providers/baseservice/app.config';
import { LocalStorageService } from 'angular-web-storage';
/**
 * Generated class for the SeeCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// declare var $:any;
@IonicPage()
@Component({
  selector: 'page-see-car',
  templateUrl: 'see-car.html',
})
export class SeeCarPage {
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
  constructor(public storage:LocalStorageService,public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
    // this.getPage()
  }

  ionViewDidLoad() {
       
    
    //   //当页面进入初始化的时候
    // let elements = document.querySelectorAll(".tabbar");
    // if(elements != null) {
    //     Object.keys(elements).map((key) => {
    //         elements[key].style.display ='none';
    //     });
    // }  
  
  }
  ionViewWillEnter(){
    this.getPage();
  }
  chosezone(id){
    this.pageData.zoneId=id;
////console.log(id);
   
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
    this.navCtrl.push("AppointDetailPage",{isBTwo:true});
  }
   //跳转第三方地图
   goMapApp() {
 ////console.log([this.pageData.data['about']['ParkAmapX'],(this.pageData.data['about'] as any).ParkAmapY]);
     
     this.tools.openMapActionSheet([this.pageData.data['about']['ParkAmapX'],(this.pageData.data['about'] as any).ParkAmapY]);
  }
  getPage(){
////console.log(this.storage.get("Appointment"));
    
    var api = 'Book/spaceInfo';
    this.http.httpPost(api, {
     id: this.storage.get("Appointment")
    }, (data) => {
  ////console.log(data);
      
      if (data.code=="error") {
      }else{
          this.pageData.data=data;
          //初始化数据 
          this.pageData.chewei=data.about.ZoneNameOC;
          this.pageData.zoom=this.pageData.lWidth/data.about.ZoneNameOC.all.w;
          this.pageData.carZoneId=data.ZoneID;
          this.chosezone(data.ZoneID);//初始化butn
          



      //  $(this.eleLeft.nativeElement).find("#"+data.ZoneID).trigger("click");
      // ////console.log( this.eleLeft.nativeElement.querySelector("#"+data.ZoneID));
       
          // $(data.ZoneID).trigger("click");
          //////console.log(this.pageData.chewei, this.pageData.zoom)
      }
    })
  }
}