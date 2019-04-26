// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionSheetController, AlertController, ToastController, Platform, App, LoadingController } from 'ionic-angular';
import { LocalStorageService } from 'angular-web-storage';
import { Appconfig } from '../baseservice/app.config';
import { BaseserviceProvider } from '../baseservice/baseservice';
import { WechatChenyu } from "wechat-chenyu";
// import { updateDate } from 'ionic-angular/util/datetime-util';
// import { retry } from 'rxjs/operator/retry';

/*
  Generated class for the ToolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare let appAvailability: any;
declare let startApp: any;
declare let cordova;
// declare var Wechat: any; 
// declare var AMap;
@Injectable()
export class ToolsProvider {
  constructor(public wechatChenyu: WechatChenyu, public http: BaseserviceProvider, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public app: App, public storage: LocalStorageService, public platform: Platform, public alertCtrl: AlertController, public toastCtrl: ToastController) {

  }
  isPoneAvailable($poneInput) {
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test($poneInput)) {
      this.showToast("您输入的手机格式不正确，请重新输入", "middle")
      return false;
    } else {
      return true;
    }
  }
  chargeTimeTN(time) {
    var date = new Date(time);
    var time1 = date.getTime();
    return time1;
  }
  timeLessDay(timee, timest?) {
    if (typeof (timee) == "string") timee = new Date(timee);
    ////console.log(typeof (timee),timee);

    var endDate = this.chargeTimeTN(timee);
    var nowDate = new Date(timest).getTime() || new Date().getTime();
    var diftiem = endDate - nowDate;

    var times = diftiem / 1000;
    ////console.log(endDate);

    //  if(times<0){
    //    times=-times;
    //    chaoTime="已超时："
    //  }
    var day,
      hour,
      minute,
      second;//时间默认值
    if (times > 0) {
      day = Math.floor(times / (60 * 60 * 24));
      hour = Math.floor(times / (60 * 60)) - (day * 24);
      minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
      second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    //  if (day <= 9) day = '0' + day;
    //  if (hour <= 9) hour = '0' + hour;
    //  if (minute <= 9) minute = '0' + minute;
    //  if (second <= 9) second = '0' + second;
    //
    // ////console.log(day+"天:"+hour+"小时："+minute+"分钟："+second+"秒");
    console.log(day);

    return day;
  }
  timeDif(time) {
    var newDate = this.chargeTimeTN(time);
    var nowDate = new Date().getTime();
    var diftiem = nowDate - newDate;
    var date;
    if (diftiem < 0) {
      date = new Date(0);
    } else {
      date = new Date(newDate - nowDate)
    }
    var times = diftiem / 1000;
    //  if(times<0){
    //    times=-times;
    //    chaoTime="已超时："
    //  }
    var day,
      hour,
      minute,
      second;//时间默认值
    if (times > 0) {
      day = Math.floor(times / (60 * 60 * 24));
      hour = Math.floor(times / (60 * 60)) - (day * 24);
      minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
      second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    if (day <= 9) day = '0' + day;
    if (hour <= 9) hour = '0' + hour;
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    //
    ////console.log(day+"天:"+hour+"小时："+minute+"分钟："+second+"秒");
    return hour + "：" + minute + "：" + second;
  }
  timeForm(date) {
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  }
  //秒时间戳转倒计时
  timeStoLiveT(str, isShowM0?) {
    str = str;
    var day,
      hour,
      minute,
      second,
      backs;//时间默认值
    if (str > 0) {
      day = Math.floor(str / (60 * 60 * 24));
      hour = Math.floor(str / (60 * 60)) - (day * 24);
      minute = Math.floor(str / 60) - (day * 24 * 60) - (hour * 60);
      second = Math.floor(str) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    // if (day <= 9) day = '0' + day;
    // if (hour <= 9) hour = '0' + hour;
    if (minute <= 9) minute = '0' + minute;
    // if (second <= 9) second = '0' + second;
    //
    ////console.log(day+"天:"+hour+"小时："+minute+"分钟："+second+"秒");
    if (day > 0) {
      backs = day + "天" + hour + "小时 " + minute + "分钟";
    } else {
      if (!isShowM0 && minute == "00") {
        backs = hour + "小时 ";
      } else {
        backs = hour + "小时 " + minute + "分钟";
      }

    }
    if (str < 60) {
      backs = "0分钟"
    } else
      if (str < 60 * 60) {
        backs = Number(minute) + "分钟";
      }
    return backs;
  }
  //判断是否微信登陆
  isWeiXin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) as any == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }


  openMapActionSheet(data, bdata?) {
    ////console.log(this.platform);
    if (this.isAndroid()) {
      this.actionSheetCtrl.create({
        buttons: [
          {
            text: "高德地图",
            handler: () => {
              this.openGaoMap(data);
            }
          },
          {
            text: "百度地图",
            handler: () => {
              //             var TO_GLNG = function(lng){return lng-0.0065;};
              // var TO_GLAT = function(lat){return lat-0.0060;};
              var data1 = [data[0] * 1 + 0.0065 + "", data[1] * 1 + 0.0060 + ""]
              ////console.log(data1);

              this.openBaiduMap(data1)
            }
          },
          {
            text: "取消",
            role: 'cancel'
          }
        ]
      }).present();
    } else if (this.isIos()) {
      this.actionSheetCtrl.create({
        buttons: [
          {
            text: "高德地图",
            handler: () => {
              this.openGaoMap(data);
            }
          },
          {
            text: "百度地图",
            handler: () => {
              //             var TO_GLNG = function(lng){return lng-0.0065;};
              // var TO_GLAT = function(lat){return lat-0.0060;};
              var data1 = [data[0] * 1 + 0.0065 + "", data[1] * 1 + 0.0060 + ""]
              ////console.log(data1);

              this.openBaiduMap(data1)
            }
          },
          {
            text: "苹果地图",
            handler: () => {
              //             var TO_GLNG = function(lng){return lng-0.0065;};
              // var TO_GLAT = function(lat){return lat-0.0060;};
              if (this.isWeiXin()) {
                this.showAlert("请点击微信右上角...按钮，使用Safari或其它浏览器打开")
              }
              this.openIosMap(data)
            }
          },
          {
            text: "取消",
            role: 'cancel'
          }
        ]
      }).present();
    }
  }
  openPayActionSheet(fun1?, fun2?) {
    if (this.isWeiXin()) {
      this.actionSheetCtrl.create({
        buttons: [

          {
            text: "微信支付",
            handler: () => {
              fun2()
              // this.weiXinPay(data);
            }
          },
          {
            text: "取消",
            role: 'cancel'
          }
        ]
      }).present();
    } else {
      this.actionSheetCtrl.create({
        buttons: [
          {
            text: "  支付宝支付",
            handler: () => {
              fun1()
              // this.alipay(data);
            }
          },
          {
            text: "微信支付",
            handler: () => {
              fun2()
              // this.weiXinPay(data);
            }
          },
          {
            text: "取消",
            role: 'cancel'
          }
        ]
      }).present();
    }

  }
  /***缴费
   * fun1 支付宝支付
   * fun2 微信支付
   * fun3 预存支付
   */
  openJiaoFeiSheet(fun1?, fun2?, fun3?, ti = "停车缴费") {
    var actionsheet;
    if (this.isWeiXin()) {
      actionsheet = this.actionSheetCtrl.create({
        title: ti,
        buttons: [
          {
            text: "预存支付",
            handler: () => {
              fun3()
              // this.alipay(data);
            }
          },

          {
            text: "取消",
            role: 'cancel'
          }
        ]
      })
      if (fun2) {
        actionsheet.addButton({
          text: "微信支付",
          handler: () => {
            fun2 && fun2()
            // this.weiXinPay(data);
          }
        })
      }
      actionsheet.present();

    } else {
      actionsheet = this.actionSheetCtrl.create({
        title: ti,
        buttons: [
          {
            text: "预存支付",
            handler: () => {
              fun3()
              // this.alipay(data);
            }
          },
          {
            text: "取消",
            role: 'cancel'
          }
        ]
      })
      if (fun2) {
        actionsheet.addButton({
          text: "微信支付",
          handler: () => {
            fun2 && fun2()
            // this.weiXinPay(data);
          }
        })
      }
      if (fun1) {
        actionsheet.addButton({
          text: "  支付宝支付",
          handler: () => {
            fun1 && fun1()
            // this.alipay(data);
          }
        })
      }
      actionsheet.present();
    }

  }
  //支付转码
  unescapeHTML(a) {
    let aNew = "" + a;
    return aNew.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
  }
  alipay(data, nav?) {

    let payInfo = this.unescapeHTML(data);
    ////console.log(data,payInfo);
    if (data) {

      cordova.plugins.alipay.payment(payInfo, (success) => {
        success.resultStatus === "9000" ? this.paySuccess(nav) : this.payFailed();
        //支付成功
        // this.paySuccess();
      }, (error) => {
        //支付失败
        ////console.log(error);

        this.payFailed(error.memo);
      });

    }

  }
  //按升序排列
  up(item?, isDown?) {
    var name = "distance";
    if (item) name = item;
    if (isDown) {
      return function (x, y) { return y[name] - x[name] };
    } else {
      return function (x, y) { return x[name] - y[name] };
    }

  }
  //检查登录信息
  checkLog(navCtrl) {
    if (!this.get("loginKey")) return;
    var api = 'Index/is_login';
    this.http.httpPost(api, {
      // user_id:123456
    }, (data) => {
      if (data.code == "error") {
      } else if (data.code == "success") {
        this.outLog(navCtrl)
      }
    }, "",
      () => {

      })
  }

  outLog(navCtrl) {
    this.showConfirm("", () => {
      this.outLogmainDeng(navCtrl)
    }, "信息过期，是否重新登录?")
  }
  outLogmainDeng(navCtrl) {
    this.resetS();
    navCtrl.push("LoginPage", {

    })
  }
  weChatPay(pageData, nav?, isZ?) {
    ////console.log(isZ);
    var loading = this.showLoading("支付中...");
    if (isZ && this.isWeiXin()) {
      pageData.paytype = "wx";
      var apiw1 = 'Wxapp/createOrder';
      this.http.httpPost(apiw1, pageData, (data) => {
        ////console.log(data)
        if (data.code == 'error') {
        } else if (data.code == '100') {
          this.showToast(data.info)
        } else if (data.code == 'success') {
          this.showToast(data.info)
          nav.pop();
        } else {

        }
      }, () => {
        loading.dismiss();
      }, () => {
        loading.dismiss();
      })

    } else
      if (this.isWeiXin()) {
        this.set("outbackName", nav.getActive().id)
        this.wxPubilcPay(pageData);
      } else {
        pageData.paytype = "app";
        // var loading=this.showLoading("支付中...");
        var apiw = 'Wxapp/createOrder';
        this.http.httpPost(apiw, pageData, (data) => {
          ////console.log(data)
          if (data.code == 'error') {
          } else if (data.code == '100') {
            this.showToast(data.info)
          } else if (data.code == 'success') {
            this.showToast(data.info)
            nav.pop();
          }
          else {
            ////console.log(data)
            //payinfo已经是json对象了,封装了调起支付的各个参数
            // let payinfo: JSON = JSON.parse(data);
            this.wechatChenyu.sendPaymentRequest(data).then((data) => {
              //成功之后的跳转...
              this.paySuccess(nav)
            }, error => {
              this.payFailed(error);
            }
            );
          }
        }, () => {
          loading.dismiss();
        }, () => {
          loading.dismiss();
        })

      }
  }
  //公众账号支付
  wxPubilcPay(upData) {
    upData.paytype = "wx";
    if (this.storage.get("loginId")) {
      upData.user_id = this.storage.get("loginId");
    }
    let upPramer = '';
    for (var item in upData) {
      upPramer += item + "," + upData[item] + "."
    }


    upPramer = upPramer.substr(0, upPramer.length - 1);
    ////console.log(upPramer);
    //  window.open("http://www.cdparking.cn/index.php/index/Browser/index?data="+upPramer)
    window.location.href = "http://www.cdparking.cn/index.php/index/Browser/index?data=" + upPramer;
  }
  paySuccess(nav?) {
    nav.pop();
    this.showToast("支付成功");
  }
  payFailed(err?) {
    this.showToast(err || "支付失败");
  }
  showLoading(con?) {
    ////console.log(con);

    var cont = '载入中...';
    if (con) cont = con;
    let loading = this.loadingCtrl.create({
      content: cont
    });

    loading.present();

    return loading;
  }
  /**
   * 日期对象转为日期字符串
   * @param date 需要格式化的日期对象
   * @param sFormat 输出格式,默认为yyyy-MM-dd                        年：y，月：M，日：d，时：h，分：m，秒：s
   * @example  dateFormat(new Date())                               "2017-02-28"
   * @example  dateFormat(new Date(),'yyyy-MM-dd')                  "2017-02-28"
   * @example  dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss')         "2017-02-28 13:24:00"   ps:HH:24小时制
   * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         "2017-02-28 01:24:00"   ps:hh:12小时制
   * @example  dateFormat(new Date(),'hh:mm')                       "09:24"
   * @example  dateFormat(new Date(),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
   * @example  dateFormat(new Date('2017-02-28 13:24:00'),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
   * @returns {string}
   */
  dateFormat2(date: Date, sFormat: String = 'yyyy-MM-dd'): string {
    let time = {
      Year: 0,
      TYear: '0',
      Month: 0,
      TMonth: '0',
      Day: 0,
      TDay: '0',
      Hour: 0,
      THour: '0',
      hour: 0,
      Thour: '0',
      Minute: 0,
      TMinute: '0',
      Second: 0,
      TSecond: '0',
      Millisecond: 0
    };
    time.Year = date.getFullYear();
    time.TYear = String(time.Year).substr(2);
    time.Month = date.getMonth() + 1;
    time.TMonth = time.Month < 10 ? "0" + time.Month : String(time.Month);
    time.Day = date.getDate();
    time.TDay = time.Day < 10 ? "0" + time.Day : String(time.Day);
    time.Hour = date.getHours();
    time.THour = time.Hour < 10 ? "0" + time.Hour : String(time.Hour);
    time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
    time.Thour = time.hour < 10 ? "0" + time.hour : String(time.hour);
    time.Minute = date.getMinutes();
    time.TMinute = time.Minute < 10 ? "0" + time.Minute : String(time.Minute);
    time.Second = date.getSeconds();
    time.TSecond = time.Second < 10 ? "0" + time.Second : String(time.Second);
    time.Millisecond = date.getMilliseconds();

    return sFormat.replace(/yyyy/ig, String(time.Year))
      .replace(/yyy/ig, String(time.Year))
      .replace(/yy/ig, time.TYear)
      .replace(/y/ig, time.TYear)
      .replace(/MM/g, time.TMonth)
      .replace(/M/g, String(time.Month))
      .replace(/dd/ig, time.TDay)
      .replace(/d/ig, String(time.Day))
      .replace(/HH/g, time.THour)
      .replace(/H/g, String(time.Hour))
      .replace(/hh/g, time.Thour)
      .replace(/h/g, String(time.hour))
      .replace(/mm/g, time.TMinute)
      .replace(/m/g, String(time.Minute))
      .replace(/ss/ig, time.TSecond)
      .replace(/s/ig, String(time.Second))
      .replace(/fff/ig, String(time.Millisecond))
  }


  //时间格式
  dateFormat = function (fmt, dateT) {
    var o = {
      "M+": dateT.getMonth() + 1,                 //月份 
      "d+": dateT.getDate(),                    //日 
      "h+": dateT.getHours(),                   //小时 
      "m+": dateT.getMinutes(),                 //分 
      "s+": dateT.getSeconds(),                 //秒 
      "q+": Math.floor((dateT.getMonth() + 3) / 3), //季度 
      "S": dateT.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (dateT.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }
  //storage,set,get,remove
  get(id) {
    var item = this.storage.get(id);
    return item;
  }
  set(id, val) {
    this.storage.set(id, val);
  }
  remove(id) {
    this.storage.remove(id);
  }
  clear() {
    this.storage.clear();
  }

  //判断设备
  isAndroid() {
    var is = this.platform.is("android");
    return is;
  }
  isIos() {
    var is = this.platform.is("ios");
    return is;
  }
  isMobileweb() {

    var is = this.platform.is("mobileweb") || this.isWeiXin();
    return is;
  }
  /**
* 是否真机环境
*/
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb') && !this.isWeiXin();
  }
  //显示在地图上的数据
  quAndMap(data) {
    var dataMain = data;
    var dataZoons = []
    dataMain.forEach(item => {
      var dataIZ = []
      // var i=0;
      item.zone.forEach(itemz => {
        // i+=0.01;
        if (itemz.InMap == 1) {
          itemz.ParkAmapX = itemz.zoneAmapX;
          itemz.ParkAmapY = itemz.zoneAmapY;
          itemz.ParkName = itemz.ZoneName;
          dataIZ.push(itemz);
        }
      });

      ////console.log(dataIZ);

      dataZoons = dataZoons.concat(dataIZ);
    });

    dataMain = dataMain.concat(dataZoons);
    ////console.log(dataMain);

    return dataMain;
  }
  //算距离，根据距离排序,InList筛选
  sortData(data, point) {
    ////console.log(point);

    var redata = data.map((item, index) => {
      var dis = this.mathDistant(point, item.ParkAmapX, item.ParkAmapY)

      item.disText = dis.disText;
      item.distance = dis.distance;
      if (item.zone.length > 0) {
        item.zone = item.zone.filter((itemzf) => {
          return itemzf.InList == 1;
        }).map((itemz) => {
          if (itemz.zoneAmapX) {
            var dis = this.mathDistant(point, itemz.zoneAmapX, itemz.zoneAmapY)
            itemz['disText'] = dis.disText;
          }
          return itemz
        })
        ////console.log(item.zone);

      }


      ////console.log(data);
      return item;
      //  var api="http://restapi.amap.com/v3/direction/driving";
      //  var params={
      //   origin:'116.45925,39.910031',
      //   destination:'116.587922,40.081577',
      //   output:'xml',
      //   key:Appconfig.AmapKey
      //  }
    }).sort(this.up()).sort(this.up("IsOpen", true));//根据距离排序
    ////console.log(data);
    return redata
  }
  //算距离
  mathDistant(point, endx, endy) {
    point && this.storage.set("myPosition", point)
    var start = this.LngLat(point.lng, point.lat);
    var end = this.LngLat(endx, endy);
    var distance = this.calculateLineDistance(start, end);
    var disText = "";
    if (Math.round(distance) > 1000) {
      disText = parseInt(distance / 1000 + '') + 'km';
    } else {
      disText = parseInt(distance + "") + 'm';
    }
    return { "distance": distance, "disText": disText }
  }
  //退出登录
  resetS() {
    // var first=this.get('firstIn');
    // var androidV= this.storage.get("androidV");
    // var iosV= this.storage.get("iosV");
    // var myPosition= this.storage.get("myPosition");
    // var Weather= this.storage.get("Weather");
    this.remove("loginKey");
    this.remove("loginId");
    this.remove("useerData");
    // this.set('firstIn',first);
    // this.set('androidV',androidV);
    // this.set('iosV',iosV);
    // this.set('myPosition',myPosition);
    // this.set('Weather',Weather)
  }
  // getAppTName(){
  //   var n=this.platform
  // }
  //平台参数：1安卓，2ios，3公众号
  getWhatApp() {
    ////console.log(this.platform.is("android"));
    if (this.platform.is("android")) {
      return 1;
    } else
      if (this.platform.is("ios")) {
        return 2;
      } else {
        return 3;

      }
  }
  clearAlert() {

  }
  showEmpAlert(ti, con?) {
    let alert = this.alertCtrl.create({
      cssClass: "myPrompt",
      title: ti,
      subTitle: con || '',
      enableBackdropDismiss: false,
    });
    alert.present();
    return alert;
  }
  showAlert(ti, funOk?, con?) {
    let alert = this.alertCtrl.create({

      title: ti,
      subTitle: con || '',

      buttons: [{
        text: '确定',
        handler: () => {
          funOk && funOk();
        }
      }]
    });
    alert.present();
    return alert;
  }
  showPrompt(ti, funOk, placeholder?, funNot?, con?) {
    let prompt = this.alertCtrl.create({
      title: ti,
      message: con || "",
      cssClass: "myPrompt",
      inputs: [
        {
          name: 'prompt',
          placeholder: placeholder || ""
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: () => {
            funNot && funNot();
          }
        },
        {
          text: '确定',
          handler: data => {
            funOk(data);
          }
        }
      ]
    });
    prompt.present();
  }
  showConfirm(ti?, funOk?, con?, funNot?, okText = "确定") {
    let confirm = this.alertCtrl.create({
      title: ti,
      message: con || "",
      cssClass: "myConfirm",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: '取消',
          handler: () => {
            funNot && funNot();
          }
        },
        {
          text: okText,
          handler: () => {
            funOk();
          }
        }
      ]
    });
    confirm.present();
  }
  /**
   * 请求车牌(需登录情况)
   * @param goName 添加车牌后跳转的地方
   *  @param hasOther 请搜索其他车牌,-1没有
   *   @param backT 清空返回次数
   * 
   */
  rePlateLog(nav, funCho, goName?, isChong?, hasOther?, backT = 1, carAddLen = 0) {
    var load = this.showLoading();
    if (this.storage.get("loginKey")) {
      var api = 'User/myCarInfo';
      this.http.httpPost(api, {
      }, (data) => {
        if (data.code == "error") {
        } else {

          // 没有添加，1个自动，多个选择
          if (data.length <= carAddLen) {
            ////console.log(111);
            if (carAddLen == 1) {
              this.showToast("您只有一个车牌，请先添加")
            }
            nav.push('AddCarPage', {
              type: carAddLen,//0没有车牌、1一个车牌、2多个
              save: 1,//0不保存，1保存
              goTo: goName,//打算去哪
              isChong: isChong,
              backT: backT || 1
            }, {
                animate: false
              }).then(() => {
                nav.remove(nav.getActive().index - 1);
              })
            return false;
          } else if (data.length == 1) {
            ////console.log(2);
            funCho(data[0].PlateNumber);
            // this.page.iPlate=data[0].PlateNumber;
          } else {
            ////console.log(3);
            this.showRadio("请选择车牌", (datain) => {
              if (datain == -1) {
                this.goFindplate(nav, goName);
                return false;
              }
              funCho(datain);
              this.storage.set("chosePlate", datain);
            }, data, ["PlateNumber", "PlateNumber"], () => {
              nav.pop();
            }, hasOther)
          }
        }

      }, () => { load.dismiss() }, () => { load.dismiss() })
    } else {
      this.showConfirm(null, () => {
        nav.push("LoginPage");
        load.dismiss();
      }, "请您先登录", () => { nav.pop(); load.dismiss(); })
      // this.showAlert("请您先登录",()=>{
      //   nav.push("LoginPage");
      //   load.dismiss();
      // })
    }
  }

  //1请求车牌（可不登陆）
  requirePlate(nav, funCho, goName?) {
    var loading = this.showLoading();
    if (this.storage.get("loginKey")) {

      var api = 'User/myCarInfo';
      this.http.httpPost(api, {
      }, (data) => {
        if (data.code == "error") {
        } else {
          this.plateGoorCho(nav, data, (data) => { funCho(data) }, goName)
        }
      }, () => { loading.dismiss() }, () => {
        loading.dismiss();
      })

    } else {
      nav.push('AddCarPage', {
        type: 0,//0没有车牌、1一个车牌、2多个
        save: 0,//0不保存，1保存
        goTo: goName,//打算去哪
        backT: 1
      }, {
          animate: false
        }).then(() => {
          loading.dismiss();
          nav.remove(nav.getActive().index - 1)
        })
      return false;
    }
  }

  //2车牌是否选择还是跳转
  plateGoorCho(nav, data, funCho, goName?, hasOther?, backT?) {
    // 没有添加，1个自动，多个选择
    if (data.length == 0) {
      ////console.log(111);

      this.goFindplate(nav, goName, 1, true);
      return false;
    } else {
      ////console.log(3);
      this.showPlateL(nav, data, (datain) => {
        this.storage.set("chosePlate", datain);
        if (datain == -1) {
          this.goFindplate(nav, goName, backT);
          return false;
        }
        funCho(datain);
      }, hasOther)
      //  this.tools.showRadio("请选择车牌",(datain)=>{
      //    ////console.log(datain);

      //  },data,["PlateNumber","PlateNumber"],()=>{
      //         nav.pop();
      //  })
    }
  }
  //3查看车牌
  showPlateL(nav, data, funok, hasOther?) {
    this.showRadio("请选择车牌", (datain) => {
      ////console.log(datain);
      this.storage.set("chosePlate", datain);
      funok(datain);
    }, data, ["PlateNumber", "PlateNumber"], () => {
      nav.pop();
    }, hasOther)
  }
  //4车牌选项
  showRadio(ti, funOk, con, name = ["name", "id"], funNot?, hasOther?) {
    let alert = this.alertCtrl.create({ enableBackdropDismiss: false });
    alert.setTitle(ti);


    con.forEach((item, i) => {
      alert.addInput({
        type: 'radio',
        label: item[name[0]],
        value: item[name[1]],
        checked: i == 0
      });
    });
    if (hasOther == -1) {
    } else {
      alert.addInput({
        type: 'radio',
        label: "搜索其他车牌",
        value: "-1",
        // checked: i==0
      });
    }


    alert.addButton({
      text: '取消',
      handler: data => {
        funNot && funNot(data);
      }
    });
    alert.addButton({
      text: '确定',
      handler: data => {
        funOk(data);
      }
    });

    alert.present();
  }
  //跳转寻找车牌
  goFindplate(nav, goName?, backT?, deletself?) {
    nav.push('AddCarPage', {
      type: 0,//0没有车牌、1一个车牌、2多个
      save: 0,//0不保存，1保存
      goTo: goName,//打算去哪
      backT: backT//nav.remove次数
    }, {
        animate: false
      }).then(() => {
        if (deletself) {
          nav.remove(nav.getActive().index - 1);
        }
        // nav.remove(nav.getActive().index-1);
      })
    return false;
  }
  showToast(text, position = "middle", time = 2500) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: time,
      position: position,
      cssClass: "toastTheme"
    });

    // toast.onDidDismiss(() => {
    //////console.log('Dismissed toast');
    // });

    toast.present();
    return toast;
  }

  /**
   * 只有1说明登录了
   */
  isLogin() {
    let key = this.storage.get("loginKey");
    if (!key) {
      return 'LoginPage';
    } else {
      return 1;
    }
  }
  //判断是否登录
  isLoginGo(nav) {
    let key = this.storage.get("loginKey");
    if (!key) {
      // let control:NavController=this.app.getActiveNav();
      nav.push("LoginPage");
      return false;
    } else {
      return true;
    }
  }
  /**
   * 存储经纬度
   * @param {Object} longitude
   * @param {Object} latitude
   */
  LngLat(longitude, latitude) {
    var point = {
      longitude: longitude,
      latitude: latitude
    }
    return point;
  }

  calculateLineDistance(start, end) {
    var d1 = 0.01745329251994329;
    var d2 = start.longitude;
    var d3 = start.latitude;
    var d4 = end.longitude;
    var d5 = end.latitude;
    d2 *= d1;
    d3 *= d1;
    d4 *= d1;
    d5 *= d1;
    var d6 = Math.sin(d2);
    var d7 = Math.sin(d3);
    var d8 = Math.cos(d2);
    var d9 = Math.cos(d3);
    var d10 = Math.sin(d4);
    var d11 = Math.sin(d5);
    var d12 = Math.cos(d4);
    var d13 = Math.cos(d5);
    var arrayOfDouble1 = [];
    var arrayOfDouble2 = [];
    arrayOfDouble1.push(d9 * d8);
    arrayOfDouble1.push(d9 * d6);
    arrayOfDouble1.push(d7);
    arrayOfDouble2.push(d13 * d12);
    arrayOfDouble2.push(d13 * d10);
    arrayOfDouble2.push(d11);
    var d14 = Math.sqrt((arrayOfDouble1[0] - arrayOfDouble2[0]) * (arrayOfDouble1[0] - arrayOfDouble2[0]) +
      (arrayOfDouble1[1] - arrayOfDouble2[1]) * (arrayOfDouble1[1] - arrayOfDouble2[1]) +
      (arrayOfDouble1[2] - arrayOfDouble2[2]) * (arrayOfDouble1[2] - arrayOfDouble2[2]));

    return (Math.asin(d14 / 2.0) * 12742001.579854401);
  }

  //去广告IFrame
  goGuanUrl(nav, url, gTit = "广告") {
    if (!url) return;
    nav.push("AdvertDetailPage", {
      browser: {
        title: gTit,
        url: url
      }
    });
  }

  // ios地图   点击时打开
  openIosMap(end: Array<string>, start?: Array<string>, nm?) {
    var point = this.storage.get("myPosition");
    ////console.log(end);

    // var name=nm?nm:{d:"终点",s:"起点"};
    if (!start) {
      start = [point.lat, point.lng];
    }

    // window.location.href = 'baidumap://map/direction?origin=latlng:'+start[0]+','+start[1]+'|name:'+name.s+'&destination=latlng:'+end[1]+','+end[0]+'|name:'+name.d+'&mode=driving&src=webapp.navi.wuhanglingdu.lingdupark"':
    window.location.href = "http://maps.apple.com/?daddr=" + end[1] + "," + end[0] + "&dirflg=d&t=m"
  }
  // 百度地图   点击时打开
  openBaiduMap(end: Array<string>, start?: Array<string>, nm?) {
    var point = this.storage.get("myPosition");
    ////console.log(end);

    var name = nm ? nm : { d: "终点", s: "起点" };
    if (!start) {
      start = [point.lat, point.lng];
    }
    // start=['116.19208','39.93769'];
    //////console.log("baidumap已下载",'bdapp://map/direction?&origin=latlng:'+start[0]+','+start[1]+'|name:'+name.s+'&destination=latlng:'+end[1]+','+end[0]+'|name:'+name.d+'&mode=driving');

    // http://api.map.baidu.com/direction?origin=latlng:34.264642646862,108.95108518068|name:我家&destination=大雁塔&mode=driving&region=西安&output=html&src=yourCompanyName|yourAppName
    if (!this.isMobile()) {
      window.open(' http://api.map.baidu.com/direction?origin=latlng:' + start[0] + ',' + start[1] + '|name:' + name.s + '&region=武汉&destination=latlng:' + end[1] + ',' + end[0] + '|name:' + name.d + '&mode=driving&output=html&src=lingdupark');
      return;
    }
    var avname = "baidumap://";
    if (!this.isIos()) {
      avname = "com.baidu.BaiduMap";
    }
    function hasIosPackage(goUrlIos) {  // 存在对应APP    
      ////console.log("hasIosPackage");
      // goUrlIos
      var sApp = startApp.set(goUrlIos);
      sApp.start(function () { //跳转成功    
        console.log("OK");

      }, function (error) { //失败   


        ////console.log(error);    
      });
    }
    appAvailability.check(
      avname,
      () => {  // 已下载
        ////console.log("baidumap已下载",'bdapp://map/direction?&origin=latlng:'+start[0]+','+start[1]+'|name:'+name.s+'&destination=latlng:'+end[1]+','+end[0]+'|name:'+name.d+'&mode=driving');
        // "baidumap://map/direction?origin=34.264642646862,108.95108518068&destination=40.007623,116.360582&mode=driving&src=webapp.navi.yourCompanyName.yourAppName"
        // window.location.href = 'baidumap://map/direction?origin='+start[0]+','+start[1]+'&destination='+end[1]+','+end[0]+'&mode=driving&src=webapp.navi.wuhanglingdu.lingdupark':
        var iosUrl = 'baidumap://map/direction?origin=' + start[0] + ',' + start[1] + '&destination=' + end[1] + ',' + end[0] + '&mode=driving&src=webapp.navi.wuhanglingdu.lingdupark';
        !this.platform.is("android") ? hasIosPackage(iosUrl) :
          window.location.href = 'bdapp://map/direction?&origin=latlng:' + start[0] + ',' + start[1] + '|name:' + name.s + '&destination=latlng:' + end[1] + ',' + end[0] + '|name:' + name.d + '&mode=driving'
      },
      function () { // 未下载
        ////console.log("baidumapnot下载");
        if (this.isIos()) {
          window.open("https://itunes.apple.com/cn/app/id452186370");
        } else {
          // 打开浏览器
          window.open(' http://api.map.baidu.com/direction?origin=latlng:' + start[0] + ',' + start[1] + '|name:' + name.s + '&region=武汉&destination=latlng:' + end[1] + ',' + end[0] + '|name:' + name.d + '&mode=driving&output=html&src=lingdupark');
        }

      }
    );
  }
  //高德地图
  openGaoMap(end: Array<string>, start?: Array<string>, nm?) {
    var _this = this;
    let schemeIntent;   // 地图APP Package Name  
    var point = this.storage.get(Appconfig.myPosition);
    var startP = start ? start : [point.lat, point.lng];
    var name;
    let goUrl, goUrlIos;
    start = startP;
    ////console.log(start,end);

    if (this.isAndroid()) {
      name = nm ? nm : { d: "起点", s: "终点" };
    } else {
      name = nm ? nm : { d: "end", s: "start" };
    }

    if (start) {
      goUrl = "amapuri://route/plan/?slat=" + start[0] + "&slon=" + start[1] + "&sname=" + name.s + "&dlat=" + end[1] + "&dlon=" + end[0] + "&dname=" + name.d + "&dev=0&t=0";
      //  "iosamap://path?sourceApplication=applicationName&sid=BGVIS1&slat=39.92848272&slon=116.39560823&sname=A&did=BGVIS2&dlat=39.98848272&dlon=116.47560823&dname=B&dev=0&t=0"
      goUrlIos = "iosamap://path?sourceApplication=applicationName&sid=BGVIS1&slat=" + start[0] + "&slon=" + start[1] + "&sname=" + name.s + "&did=BGVIS2&dlat=" + end[1] + "&dlon=" + end[0] + "&dname=" + name.d + "&dev=0&t=0";
    } else {
      goUrl = "amapuri://route/plan/?dlat=" + end[1] + "&dlon=" + end[0] + "&dname=" + name.d + "&dev=0&t=0";
      goUrlIos = "iosamap://path?sourceApplication=applicationName&sid=BGVIS1&dlat=" + end[1] + "&dlon=" + end[0] + "&dname=" + name.d + "&dev=0&t=0";
    }
    ////console.log(goUrlIos);
    if (!this.isMobile() || this.isMobileweb()) {

      window.location.href = ' http://uri.amap.com/navigation?from=' + start[1] + ',' + start[0] + ',我的位置&to=' + end[0] + ',' + end[1] + ',终点&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=1';
      return;
    }
    if (this.isIos()) {
      ////console.log("iosappAvailability")    
      schemeIntent = "iosamap://"
      appAvailability.check(schemeIntent, hasIosPackage, notIosPackage);   //IOS  
    } else if (this.platform.is("android")) {
      schemeIntent = 'com.autonavi.minimap';
      appAvailability.check(schemeIntent, hasAndroidPackage, () => notAndroidPackage(_this));
    }
    //Android                        function hasAndroidPackage() {  // 存在对应APP      
    function hasAndroidPackage() {
      var sApp = startApp.set({  //跳转对应APP   
        "action": "ACTION_VIEW",
        "category": "CATEGORY_DEFAULT",
        "type": "text/css",
        "package": "com.autonavi.minimap",
        "uri": goUrl,   //我是选择路径规划然后导航的，当然你也可以直接用导航路径或者其他路径    
        "flags": ["FLAG_ACTIVITY_CLEAR_TOP", "FLAG_ACTIVITY_CLEAR_TASK"],
        "intentstart": "startActivity",
      }, { /* extras */
          "EXTRA_STREAM": "extraValue1",
          "extraKey2": "extraValue2"
        });
      sApp.start(function () { //跳转成功    
        console.log("OK");

      }, function (error) { //失败   
        ////console.log(error);    
      });

    }
    function notAndroidPackage(t) {  // 不存在对应APP   
      t.showToast('请更换地图APP或下载该地图APP');
      // this.openBaiduMap(end,startP,name||""); 
    }


    function hasIosPackage() {  // 存在对应APP    
      ////console.log("hasIosPackage");
      // goUrlIos
      var sApp = startApp.set(goUrlIos);
      sApp.start(function () { //跳转成功    
        console.log("OK");

      }, function (error) { //失败   
        ////console.log(error);    
      });
    }
    function notIosPackage() {  // 不存在对应APP   
      alert('请更换地图APP或下载该地图APP');
      // _this.openBaiduMap(end,startP,name||"");  
    }



  }


}


