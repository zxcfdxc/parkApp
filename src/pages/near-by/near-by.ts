import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { Appconfig } from '../../providers/baseservice/app.config';
import { LocalStorageService } from 'angular-web-storage';
/**
 * Generated class for the NearByPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var AMap: any;
@IonicPage()
@Component({
  selector: 'page-near-by',
  templateUrl: 'near-by.html',
})


export class NearByPage {
  @ViewChild('containern') mapElement: ElementRef;
  constructor(public change: ChangeDetectorRef, public http: BaseserviceProvider, public tools: ToolsProvider, public storge: LocalStorageService, public navCtrl: NavController, public navParams: NavParams) {
    this.allPark();
  }
  page = {
    data: [],
    myPoint: {

    },
    dataMap:[]
  };
  map;

  ionViewDidLoad() {

  }
  ionViewDidEnter() {
    this.inFoWindow()
  }
   //信息窗体
   inFoWindow(){
    var _this=this;
    if(!this.map)return;
    // for(var i = 0; i < _this.page.dataMap.length; i += 1){
    //   //TODO 根据类别创建不同样式的marker
    //   if(!_this.page.dataMap[i].ParkAmapX)break;
    // var  marker = new AMap.Marker({
    //   position: [_this.page.dataMap[i].ParkAmapX, _this.page.dataMap[i].ParkAmapY],
    //   title: _this.page.dataMap[i].ParkName,
    //   map: _this.map,
    //   icon:"./assets/imgs/P.png",
    //       });
    //       marker.content=_this.page.dataMap[i].ParkName;
    //       //给Marker绑定单击事件
    //       marker.on('click', markerClick);
    //       if(i==0){
    //     ////console.log([_this.page.dataMap[i].ParkAmapX, _this.page.dataMap[i].ParkAmapY]);
    //         marker.emit('click',{target:marker});
    //       }
    //     }
    // map.setFitView();
  //   function markerClick(e){
  //     var infoWindow = new AMap.InfoWindow({
  //       offset: new AMap.Pixel(0, -30)
  //     });
  //     infoWindow.setContent(e.target.content);
  //     infoWindow.open(_this.map, e.target.getPosition());
  // }
  _this.map.setCenter([_this.page.dataMap[0].ParkAmapX, _this.page.dataMap[0].ParkAmapY])
   
  }
  loadMap() {
    var _this = this;
    _this.map = new AMap.Map(this.mapElement.nativeElement, {
      resizeEnable: true,
      zoom: 15,
      center: [_this.page.dataMap[0].ParkAmapX, _this.page.dataMap[0].ParkAmapY],
      mapStyle: 'amap://styles/a0a98dd724ab8fc5b36652cd84498a5c'//样式URL          
    });
 
 
    AMap.plugin(['AMap.ToolBar', 'AMap.OverView', 'AMap.Geolocation'], () => {
      _this.map.addControl(new AMap.ToolBar());

      //定位
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 30000,          //超过10秒后停止定位，默认：无穷大
        maximumAge:30000,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      _this.map.addControl(geolocation);
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
      function onComplete(data) {
    console.log(data.position);

    ////console.log(Appconfig.myPosition, data.position);
        _this.storge.set(Appconfig.myPosition, data.position);
        _this.sortData(data.position);

        for(var i = 0; i < _this.page.dataMap.length; i += 1){
          //TODO 根据类别创建不同样式的marker
          if(!_this.page.dataMap[i].ParkAmapX)break;
        var  marker = new AMap.Marker({
          position: [_this.page.dataMap[i].ParkAmapX, _this.page.dataMap[i].ParkAmapY],
          title: _this.page.dataMap[i].ParkName,
          map: _this.map,
          icon:"./assets/imgs/P.png",
              });
              marker.content=_this.page.dataMap[i].ParkName;
              //给Marker绑定单击事件
              marker.on('click', markerClick);
              if(i==0){
            ////console.log([_this.page.dataMap[i].ParkAmapX, _this.page.dataMap[i].ParkAmapY]);
                marker.emit('click',{target:marker});
              }
            }
        // map.setFitView();
        function markerClick(e){
          var infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -30)
          });
          infoWindow.setContent(e.target.content);
          infoWindow.open(_this.map, e.target.getPosition());
      }
      _this.map.setCenter([_this.page.dataMap[0].ParkAmapX, _this.page.dataMap[0].ParkAmapY])
        
      }
    })
  }
  //跳转第三方地图
  goMapApp(item) {
    this.tools.openMapActionSheet([item.zoneAmapX||item.ParkAmapX, item.zoneAmapY||item.ParkAmapY])
  }
  allPark() {
    var api = 'Index/allparks';

    this.http.httpPost(api, {
    }, (data) => {
      // this.tools.showToast(data.info);
      if (data) {
        this.page.data = data.sort(this.tools.up("IsOpen",true));
        this.page.dataMap=this.tools.quAndMap(this.page.data)
    ////console.log(this.page.data);
        this.lastDistant();
        // this.navCtrl.push(ContactPage);
        this.loadMap();
      }
    })
  }
  //去车场详情
  goDetail(id) {
    if (!id) {
      this.tools.showToast("没有车场信息");
      return;
    }
    this.navCtrl.push('ParkDetailPage', {
      id: id
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
  //上次距离
  lastDistant() {
    var piont = this.storge.get(Appconfig.myPosition)
    if (piont) {
      this.sortData(piont)
    }

  }
  //算距离，根据距离排序
  sortData(point) {
  
    this.page.data=this.tools.sortData(this.page.data,point)
    this.change.detectChanges();
////console.log(this.page.data);
  }



}
