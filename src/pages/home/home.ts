import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NavController, IonicPage, Slides } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { Appconfig } from '../../providers/baseservice/app.config';
import { LocalStorageService } from 'angular-web-storage';
// import { JPushService } from 'ionic2-jpush/dist'
import { JPush } from '@jiguang-ionic/jpush';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
declare var AMap: any;
// declare var RemoGeoLocation:any;
declare var layer:any;
declare var $:any;
// declare var LocationPlugin;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
    // providers  : [JPushService]  
})
export class HomePage {
  // public map;
  @ViewChild("sildesXian") slides: Slides;
  @ViewChild("sildesg") slides2: Slides;
  @ViewChild("sildesGong") slidesGong: Slides;
  devicePlatform;
  @ViewChild('containerh') mapElement: ElementRef;
  page = {
    data: [{ParkAmapX:"",ParkAmapY:"",ParkName:"",disText:"",distance:0}],
    loop: [],
    push:{},
    nearPoint: {},
    baseImgU:Appconfig.baseImgUrl2,
    one:false,
    positionData:"positionData",
    limit:"双号",
    guang:[],
    wTemper:"",
    wWeather:"",
    appiontText:"我要停车",
    gongGao:[],
    dataMap:[],
    usetime:1
  }
map;
tt;
aaa="1232";

  constructor(private geolocation: Geolocation, statusBar: StatusBar,private jPushPlugin: JPush,public storge: LocalStorageService, public change: ChangeDetectorRef, public navCtrl: NavController, public http: BaseserviceProvider, public tools: ToolsProvider) {
    // statusBar.backgroundColorByHexString("#38bdef");
    this.allPark();
    this.devicePlatform = this.tools.getWhatApp();
    this.limit();
    // this.getWeather(420100)
    this.guangShow();
  
    // document.addEventListener('jpush.receiveNotification', (event: any) => {
    //   var content,edata;
    //////console.log(event);
    //   if (this.devicePlatform == '1') {
    //     content = event.alert;
    //     edata=event.extras.type;
    //   } else { 
    //     content = event.aps.alert;
    //     edata=event.type;
    //   }
 
 
 
    //   this.goAppoint(edata,content)
    //   // alert('Receive notification: ' + JSON.stringify(event));
    // }, false);

    document.addEventListener('jpush.openNotification', (event: any) => {
      var content,edata;
  ////console.log(event);
      if (this.devicePlatform == '1') {
        content = event.alert;
        edata=event.extras.type;
      } else { 
        content = event.aps.alert;
        edata=event.type;
      }
 this.goAppoint(edata,content)
      // alert('open notification: ' + JSON.stringify(event));
    }, false);

    // document.addEventListener('jpush.receiveLocalNotification', (event: any) => {
    //////console.log(event);
    //   // iOS(*,9) Only , iOS(10,*) 将在 jpush.openNotification 和 jpush.receiveNotification 中触发。
    //   var content;
    //   if (this.devicePlatform == '1') {
    //   } else {
    //     content = event.content;
    //   } 
    //   // alert('receive local notification: ' + JSON.stringify(event));
    // }, false);


    // this.jPushPlugin.openNotification()
    //            .subscribe( res => {
    //          ////console.log('收到推送');
    //          ////console.log(res)
    //            });
       
    //          this.jPushPlugin.receiveNotification()
    //            .subscribe( res => {
    //          ////console.log('收到推送');
    //          ////console.log(res)
    //            });
       
    //          this.jPushPlugin.receiveMessage()
    //            .subscribe( res => {
    //          ////console.log('收到推送');
    //          ////console.log(res)
    //            });
}  

ionViewDidLoad() {
  this.loop();
  this.slides2&&(this.slides2.autoplayDisableOnInteraction = false);
  this.slidesGong&&(this.slidesGong.autoplayDisableOnInteraction = false);
  this.getPageImport();
  this.tools.checkLog(this.navCtrl);
  // this.inFoWindow();
  // this.jpush()
}
ionViewDidEnter() {
  this.slides2&&this.slides2.startAutoplay();
  this.slidesGong&&this.slidesGong.startAutoplay();
 this.inFoWindow();
 this.getRegistrationID();

}
ionViewWillEnter(){
  this.checkAppoint()
  this.slides.startAutoplay();
  this.slides2&&this.slides2.startAutoplay();
  this.slidesGong&&this.slidesGong.startAutoplay();
  this.outLogmain();

 ////console.log(document.referrer);
}
outLogmain(){
  var api = 'User/userinfo';
  this.http.httpPost(api, {
  }, (data) => {
////console.log(data);
    
    if (data.code=="error") {
      this.tools.resetS();
    }else{
    }
  },null,null,2)
 
}
ionViewWillLeave(){
  this.slides.stopAutoplay();
  this.slides2&&this.slides2.stopAutoplay();
  this.slidesGong&&this.slidesGong.stopAutoplay();
}
autoPlay(){
  this.slides.startAutoplay();
}
goGong(){
  this.navCtrl.push("MesCenterPage")
}
//公告
getPageImport(){
var api = 'Message/lists';
this.http.httpPost(api, {
 // user_id:123456
 type:2,
 length:5,//条数
 page:1//页数
}, (data) => {
 if (data.code=="error") {
 }else{
   this.page.gongGao=data;
 }
},"",
()=>{

})
}


//推送跳转
goAppoint(id,msg?){
  // 1去我的预约,2公告,3月卡,4优惠券,5充电,6余额
  if(id==1){
    this.navCtrl.push("AppointDetailPage").then(()=>{
      // msg&&this.tools.showToast(msg);
    })
  }else if(id==2){
    this.goGong()
  }else if(id==3){
    this.navCtrl.push("ClubCardShowPage")
  }else if(id==4){
    this.navCtrl.push("CouponPage")
  }else if(id==5){
    this.goAllpark(1);
  }else if(id==6){
    this.navCtrl.push("MyAccountPage");
  }
}
//变文字
checkAppoint(){
 if(this.tools.isLogin()!=1)return;
  
  var api = 'Book/bookRecord';
   this.http.httpPost(api, {
  }, (data) => {
////console.log(data);
    
    if(!data||!data.about){
      this.page.appiontText="我要停车";
    }else
    if (data.code=="error") {
    }else{
      this.page.appiontText="我的预约";
  ////console.log(data);
        
    }

  })

}

/** 
* 获取ID 
*/  
getRegistrationID() {  
  if( this.tools.get("Jpush"))return;
this.jPushPlugin.getRegistrationID()  
.then(res =>{
 ////console.log(res)
   this.tools.set("Jpush",res);
} )  
.catch()  

// this.jPushPlugin.getRegistrationID()
// .then(rId => {
//   this.tools.set("Jpush",rId);
// });

}  

  goAllpark(id?) {
    // id=1,充电,id=2判断预约
   
 if(id==2&&this.page.appiontText=="我的预约"){
  this.navCtrl.push("AppointDetailPage");
  return;
 }

    if(id){
      //1判断未登录,2判断预约
      if(!this.tools.isLoginGo(this.navCtrl))return;
          this.isYu(id);

    }else{
      this.navCtrl.push("AllParkPage");
    }
    
  }
  isYu(id?){
    var api = '	Equip/charge_type';
    this.http.httpPost(api, {
    }, (data) => {
      //	有预约返回：
		// code：100，
    // 没有预约/错误返回：code：101，info：信息
    // 正在充电中：code：200，data：充电信息
  
      if(data.code=="error"){
      }else
      if (data.code==100) {
        this.navCtrl.push("ChongLeiPage",{data:data})
      }else
      if (data.code==101) {
      // this.tools.showToast(data.info)
      this.tools.showConfirm(null,()=>{
        
        this.navCtrl.push("AllParkPage",{id:id});

      },data.info+"是否选择普通流程充电？")
      }else if (data.code==104) {
       this.navCtrl.push("AllParkPage",{id:id});
        }else
      if (data.code==200) {
      this.navCtrl.push("ChongStatePage",{dataS:data.data})
      }
    })
  }
  goGuan(){
    //////console.log(i);
    
     var index=this.slides2.getActiveIndex();
    // let index=i+1;
 ////console.log(index);
     if(index==this.page.loop.length+1){
       index=1;
     }
     if(index==0){
      index=this.page.loop.length;
    }
 var url=this.page.loop[index-1].url;
 var gTit=this.page.loop[index-1].remark;
 if(!url)return; 
 this.goGuanUrl(url,gTit);
  }
  goGuanUrl(url,gTit="广告"){
    if(!url)return; 
    this.navCtrl.push("AdvertDetailPage", {
      browser: {
          title: gTit,
          url: url
      }
  });  
  }
  //限行
  limit() {
    var api = 'Index/limitline';
    this.http.httpPost(api, {
     date:this.tools.dateFormat("yyyy-MM-dd",new Date())
    }, (data) => {
      if(data.code=="error"){
        return;
      }
      // this.tools.showToast(data.info);
      if (data) {
        this.page.limit = data.data.Limitline;
        this.tools.set("limit",data.data.Limitline);
      }
    },null,null,0)
  }
  goPay(){
    this.navCtrl.push("OrderConfigPage");
  }
  //信息窗体
  inFoWindow(){
    var _thiss=this;
    if(!this.map)return;
    // for(var i = 0; i < _thiss.page.dataMap.length; i += 1){
    //   //TODO 根据类别创建不同样式的marker
    //   if(!_thiss.page.dataMap[i].ParkAmapX)break;
    // var  marker = new AMap.Marker({
    //   position: [_thiss.page.dataMap[i].ParkAmapX, _thiss.page.dataMap[i].ParkAmapY],
    //   title: _thiss.page.dataMap[i].ParkName,
    //   map: _thiss.map,
    //   icon:"./assets/imgs/P.png",
    //       });
    //       marker.content=_thiss.page.dataMap[i].ParkName;
    //       //给Marker绑定单击事件
    //       marker.on('click', markerClick);
    //       if(i==0){
    //     ////console.log([_thiss.page.dataMap[i].ParkAmapX, _thiss.page.dataMap[i].ParkAmapY]);
    //         marker.emit('click',{target:marker});
    //       }
    //     }
    // map.setFitView();
  //   function markerClick(e){
  //     var infoWindow = new AMap.InfoWindow({
  //       offset: new AMap.Pixel(0, -30)
  //     });
  //     infoWindow.setContent(e.target.content);
  //     infoWindow.open(_thiss.map, e.target.getPosition());
  // }
  _thiss.map.setCenter([_thiss.page.dataMap[0].ParkAmapX, _thiss.page.dataMap[0].ParkAmapY])
   
  }
  // 轮播图
  loop() {

    

    var api = 'Ad/focus';

    this.http.httpPost(api, {
      
    }, (data) => {
      if(data.code=="error"){
        return;
      }
      // this.tools.showToast(data.info);
      if (data) {
        this.page.loop = data;
    ////console.log(this.page.loop);
      }
    })
  }
  public getGPS(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
  ////console.log(resp.coords.latitude,resp.coords.longitude);
    }).catch((error) => {
  ////console.log('Error getting location', error);
    });

  }
    // 推送
    jpush() {
      var api = 'Message/jpush';
       var jid=this.tools.get("Jpush");
      this.http.httpPost(api, {
        id:jid
      }, (data) => {
        if(data.code=="error"){
          return;
        }
        // this.tools.showToast(data.info);
        if (data) {
          this.page.push = data;
      ////console.log(this.page.loop);
  
          // this.navCtrl.push(ContactPage);
        }
      })
    }
    // test(){
    //   LocationPlugin.getLocation(data => {
    //     var datat=JSON.stringify(data)
    //   }, msg => {
    //     alert(JSON.stringify(msg))
    //   });
    // }
  /*地图集合
  *
  */
  //地图
  loadMap() {
    var _thiss = this;
    // var remoGeo = new RemoGeoLocation();

    // //替换方法
    // navigator.geolocation.getCurrentPosition = function() {
    //     return remoGeo.getCurrentPosition.apply(remoGeo, arguments);
    // };

    // //替换方法
    // navigator.geolocation.watchPosition = function() {
    //     return remoGeo.watchPosition.apply(remoGeo, arguments);
    // };
    function onComplete(data) {
      // AMap.convertFrom([data.position.O,data.position.P],"gps",
      // (status,result)=>{

      // ////console.log(status,result);
          
      // })

  ////console.log(data);
      _thiss.getWeather(data);
      //////console.log(Appconfig.myPosition, data.position);
      _thiss.page.positionData=data.position;
     
      _thiss.sortData(data.position);
      
      for(var i = 0; i < _thiss.page.dataMap.length; i += 1){
        //TODO 根据类别创建不同样式的marker
        if(!_thiss.page.dataMap[i].ParkAmapX)break;
      var  marker = new AMap.Marker({
        position: [_thiss.page.dataMap[i].ParkAmapX, _thiss.page.dataMap[i].ParkAmapY],
        title: _thiss.page.dataMap[i].ParkName,
        map: _thiss.map,
        icon:"./assets/imgs/P.png",
            });
            marker.content=_thiss.page.dataMap[i].ParkName;
            //给Marker绑定单击事件
            marker.on('click', markerClick);
            if(i==0){
          ////console.log([_thiss.page.dataMap[i].ParkAmapX, _thiss.page.dataMap[i].ParkAmapY]);
              marker.emit('click',{target:marker});
            }
          }
      // map.setFitView();
      function markerClick(e){
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30)
        });
        infoWindow.setContent(e.target.content);
        infoWindow.open(_thiss.map, e.target.getPosition());
    }
    _thiss.map.setCenter([_thiss.page.dataMap[0].ParkAmapX, _thiss.page.dataMap[0].ParkAmapY])
      
    }

  
    _thiss.map = new AMap.Map(this.mapElement.nativeElement, {
      resizeEnable: true,
      zoom: 15,
      center: [_thiss.page.dataMap[0].ParkAmapX, _thiss.page.dataMap[0].ParkAmapY],
      mapStyle: 'amap://styles/a0a98dd724ab8fc5b36652cd84498a5c'//样式URL          
    });
 
//  if(_thiss.tools.isIos()){
//    //ios特殊方法
//   LocationPlugin.getLocation(data => {
//     var datat;
//     datat.position.lng=datat.position.O=data.longitude;
//     datat.position.lat=datat.position.P=data.latitude;
//     onComplete(datat);
//   }, msg => {
//     alert(JSON.stringify(msg))
//   });
   

//  }else{
  AMap.plugin(['AMap.ToolBar', 'AMap.Geolocation'], () => {
    _thiss.map.addControl(new AMap.ToolBar());
//console.log("loadMap");
    //定位
    var geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,//是否使用高精度定位，默认:true
      timeout: 10000,          //超过10秒后停止定位，默认：无穷大
      maximumAge: 100000,           //定位结果缓存0毫秒，默认：0
      convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      showButton: true,        //显示定位按钮，默认：true
      buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
      buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
      showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
      panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
      zoomToAccuracy: false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });
    _thiss.map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    
    AMap.event.addListener(geolocation, 'error', onError);
    function onError(data) {
      
       // gps转换
       _thiss.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        AMap.convertFrom([resp.coords.latitude,resp.coords.longitude],"gps",
        (status,result)=>{
       console.log(status,result);
            // locations[0],
            onComplete(result.locations[0]);
            
        })
        //////console.log(resp.coords.latitude,resp.coords.longitude);
      }).catch((error) => {
    ////console.log('Error getting location', error);
      });

    

      }

  })
//  }

  
  }

  

  //跳转第三方地图
  goMapApp(item) {
////console.log(item);
    
    this.tools.openMapActionSheet([item.zoneAmapX||item.ParkAmapX, item.zoneAmapY||item.ParkAmapY])
    //  this.tools.openMapActionSheet([this.page.data[0].ParkAmapX, this.page.data[0].ParkAmapY]);
  }
  getWeather(data){
    var code;
    if(typeof data==="number"){
      code=data;
    }else{
      code=data.addressComponent.adcode;
    }
    var api = 'http://restapi.amap.com/v3/weather/weatherInfo';
    this.http.httpGet(api, {
      key:"ecc4748a1f986a72ee2bc84934dd3188",
      city:code
    }, (data) => {
      if (data.code=="error") {
      }else{
    ////console.log(data);
        var wd=data.lives[0]
        // if(!this.tools.isWeiXin()){
          this.storge.set("Weather",wd);
        // }
     
        this.page.wTemper=wd.temperature;
        this.page.wWeather=wd.weather;
          // this.pageData.data=data;
      }
  
    })
  }
  //去寻车
  goFindCar(){
    // OrderSettlePage
    // FindCarPage
    this.navCtrl.push("FindCarPage")
    // if(this.storge.get("loginKey")){
    //   var api = 'User/myCarInfo';
    //   this.http.httpPost(api, {
    //   }, (data) => {
    //     if (data.code=="error") {
    //     }else{
       
    //     }
  
    //   })
    // }else{
      
    // }
    // this.navCtrl.push('AddCarPage', {
    //   type: 0,//0没有车牌、1一个车牌、2多个
    //   goTo:"CurrentCarPage",//打算去哪
    // })
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

    //广告
    guangShow() {
      //  this.storge.set("loginId",17);
      // this.storge.set("loginKey","9f8198aea27c427a07a0c4710899d0f6")
    
        var api = 'Ad/index';
        this.http.httpPost(api, {
        }, (data) => {
      ////console.log(data);
          
          if(data.code=="error"){
            return;
          }
          if (data.length>0) {
            this.page.guang = data[0];
            data[0].img&&this.showGImg(data[0])
          }
        })
      }

 

        //显示图片
  showGImg(data){
    var imgUrl=data.img,time=data.showTime,href=data.url;
    var index;
    var obj = new Image(); 
    obj.src = Appconfig.baseImgUrl2+imgUrl; 
    var _thist=this;
    obj.onload = function() { //这个地方可以重复写入，如果错误的话，换到外面即可 
      index=layer.open({
        type: 1,
        skin: 'layui-shouG', //样式类名
        closeBtn: 2, //不显示关闭按钮
        anim:0,
        area:['70%','82.5vw'],
        title: false,
        shadeClose: true, //开启遮罩关闭
        content: '<img id="tu" src='+Appconfig.baseImgUrl2+imgUrl+' alt="">'
        
      });
      $("#tu").click(()=>{
        _thist.goGuanUrl(href)
        layer.close(index);
      })
      setTimeout(() => {
        layer.close(index);
      }, time*1000);
    } 
 
  
   
  }
  //所有车场
  allPark() {
  //  this.storge.set("loginId",17);
  // this.storge.set("loginKey","9f8198aea27c427a07a0c4710899d0f6")

    var api = 'Index/allparks';
    this.http.httpPost(api, {
    }, (data) => {
      // this.tools.showToast(data.info);
      if (data) {
        this.page.data = data.sort(this.tools.up("IsOpen",true)).map((item)=>{
          item["ishowQu"]=false;
          return item
        });
        this.page.dataMap=this.tools.quAndMap(this.page.data);
    ////console.log(this.page.data);
        this.loadMap();
        this.lastDistant();
        // this.navCtrl.push(ContactPage);
      }
    })
  }

//   alipay(){
//  var api = 'Alipay/prestore';
//     this.http.httpPost(api, {
//       dt:3||this.tools.getWhatApp(),
//       money:123
//     }, (data) => {
//       if (data) {
//         // this.page.data = data;
//     ////console.log(data);
//         // this.lastDistant();
//        window.location.href=data;
//         // this.navCtrl.push(ContactPage);
//       }
//     })
//   }

  //去预约
  goChose(id) {
    if (!id) {
      this.tools.showToast("没有车场信息");
      return;
    }
    this.navCtrl.push('ChoseCarportPage', {
      id: id
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
console.log(point);
    this.page.data=this.tools.sortData(this.page.data,point)
    // this.page.data = this.page.data.map((item, index) => {
    //   var dis=this.tools.mathDistant(point,item.ParkAmapX, item.ParkAmapY)
   
    //   item.disText = dis.disText;
    //   item.distance = dis.distance;
    //   item= item['zone'].map((item)=>{
    //     var dis=this.tools.mathDistant(point,item.ParkAmapX, item.ParkAmapY)
    //     item[''] = dis.disText;
    //     return item
    //   })
    //////console.log(this.page.data);
    //   return item;
    //   //  var api="http://restapi.amap.com/v3/direction/driving";
    //   //  var params={
    //   //   origin:'116.45925,39.910031',
    //   //   destination:'116.587922,40.081577',
    //   //   output:'xml',
    //   //   key:Appconfig.AmapKey
    //   //  }
    // }).sort(this.tools.up()).sort(this.tools.up("IsOpen",true));//根据距离排序
    this.change.detectChanges();//刷新数据
////console.log(this.page.data);
  }

}