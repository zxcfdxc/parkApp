import { Component ,ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import{Appconfig}from '../../providers/baseservice/app.config';
import { LocalStorageService } from 'angular-web-storage';
/**
 * Generated class for the AllParkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-park',
  templateUrl: 'all-park.html',
})
export class AllParkPage {
  interval: number;
  constructor(public change:ChangeDetectorRef ,public http:BaseserviceProvider,public tools:ToolsProvider,public storge:LocalStorageService,public navCtrl: NavController, public navParams: NavParams) {
  
  }
  page = {
   data:[],
   myPoint:{
   },
   isChong:this.navParams.get("id")==1//1：充电
  };
  
  ionViewDidLoad() {
    this.allPark();
  }
  ionViewDidEnter(){
    // this.interview()
  }
ionViewWillLeave(){
//  console.log('logionViewWillLeave');
//  clearInterval(this.interval);
 
}
  // interview() {
  //   var this_=this;
  //   var myFunction = function(){
  //       clearInterval(this_.interval);
  //    console.log("11");
     
      
  //     this_.interval = setInterval(()=>{myFunction()}, 2000);
  // }
  // this.interval = setInterval(()=>{myFunction()}, 2000);
  // }

  //跳转第三方地图
  goMapApp(item)
{
  this.tools.openMapActionSheet([item.zoneAmapX||item.ParkAmapX, item.zoneAmapY||item.ParkAmapY])
  //  this.tools.openMapActionSheet([item['ParkAmapX'],(item as any).ParkAmapY]);
} 
 allPark(){
    var api = 'Index/allparks';
    this.http.httpPost(api, {
    }, (data) => {
      console.log(data);
      
      // this.tools.showToast(data.info);
      if (data) {
       this.page.data=data.sort(this.tools.up("IsOpen",true)).map((item)=>{
        item["ishowQu"]=false;
        return item
      });
   ////console.log(this.page.data);
       this.lastDistant();
        // this.navCtrl.push(ContactPage);
      }
    })
  }
  //去车场详情
  goDetail(id){
    if(!id){
      this.tools.showToast("没有车场信息");
    return;
    }
      this.navCtrl.push('ParkDetailPage',{
        id:id
      })
  }
   //去预约
   goChose(id,quId){
    if(!id){
      this.tools.showToast("没有车场信息");
    return;
    }
      this.navCtrl.push('ChoseCarportPage',{
        id:id,
        quId:quId,
        isChong:this.navParams.get("id")==1
      })
  }
//去充电
  goChong(id){
    if(!id){
      this.tools.showToast("没有车场信息");
    return;
    }
      this.navCtrl.push('ChongCheweiPage',{
        id:id,
      })
  }
  //上次距离
 lastDistant(){
  var piont=this.storge.get(Appconfig.myPosition)
  if(piont){
   this.sortData(piont)
  }
 
}
  //算距离，根据距离排序
  sortData(point){
    this.page.data=this.tools.sortData(this.page.data,point)

    this.change.detectChanges();
    ////console.log(this.page.data);
  }
  
  

}
