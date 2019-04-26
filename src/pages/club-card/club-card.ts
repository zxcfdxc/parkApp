import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { DomSanitizer } from '@angular/platform-browser';
// import{ laydate} from  'layui-laydate/dist/laydate'

/**
 * Generated class for the ClubCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var $: any;
declare var laydate: any;
@IonicPage()
@Component({
  selector: 'page-club-card',
  templateUrl: 'club-card.html',
})
export class ClubCardPage {

  dataPlate: any;
  Explain: any;
  constructor(
    private sanitizer: DomSanitizer,
    public tools: ToolsProvider, public http: BaseserviceProvider, public navCtrl: NavController, public navParams: NavParams) {
      this.getExplain()

  }
  pageData = {
    parkList: [],
    parkId: "",
    data: [],
    chose: 0,
    cName: "",
    choseDay: 30,
    choseData: {},
    canTime: "",
    iPlate: 0,
    dateStart: new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString(),//计划请假从
    dateEnd: new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString(),//计划请假至
    sqsj: new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString(),//申请时间
    upDate: null
  }
  ionViewDidLoad() {
    this.tools.rePlateLog(this.navCtrl, (d) => { this.pageData.iPlate = d; this.allPark(); }, "ClubCardPage", false, -1)
    // this.getPage();

    var mthis = this;
    laydate.render({
      elem: '#test1'
      , min: 0 //7天前
      , max: 10 //7天后
      , btns: ['now', 'confirm']
      , value: new Date()
      , done: function (value, date) {
        ////console.log(value); //得到日期生成的值，如：2017-08-18
        ////console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
        mthis.pageData.sqsj = new Date(value).toISOString()
        ////console.log( mthis.pageData.upDate);

      }
    });
  }
  ionViewDidEnter() {

  }
  getExplain() {
    var api = 'Agreement/MonthlyCardExplain';
    this.http.httpPost(api, {
    }, (data) => {
  
    },err => {
      
      this.Explain = this.sanitizer.bypassSecurityTrustHtml(err.error.text);
    })
  }
  allPark() {
    var api = 'Index/parks';
    this.http.httpPost(api, {
    }, (data) => {
      // this.tools.showToast(data.info);
      if (data) {
        var newd = []
        data.forEach(item => {
          if (item.IsOpen == 1) {
            newd.push(item)
          }
        });
        this.pageData.parkList = newd;
        this.chosePark()
        //  this.page.item=data[0];
        // this.navCtrl.push(ContactPage);
      }
    })
  }
  choseTimel(item) {
    this.pageData.choseData = item;
    this.canTimeInit(item)

  }

  canTimeInit(item) {
    if (!item.startTime || (item.startTime == "00:00:00" && item.endTime == "23:59:59")) {
      this.pageData.canTime = "全天";
    } else {
      this.pageData.canTime = item.startTime + "-" + item.endTime;
    }

  }

  styleTime() {
    ////console.log(this.pageData.dateEnd);
    setTimeout(() => {
      $(".picker-columns .picker-col").each(function (index, ele) {
        //////console.log($(ele));
        if (index == 0) {

          $(this).find(".picker-opt").each(function (index, ele) {

            var t = $(this).text();
            $(this).text(t + "年 ");

          })
        }
        if (index == 2) {
          $(this).find(".picker-opt").each(function (index, ele) {
            var t = $(this).text();
            $(this).text(t + "日")
          })
        }
        // if(index==3){
        //   $(this).find(".picker-opt").each(function(index,ele){
        //         var t=$(this).text();
        //         $(this).text(t+"分")
        //       })
        //   }

      })
      // let _this2=this;
      $(".picker-columns .picker-col").on('touchstart', function (e) {
        ////console.log(e);
        // _this2.change.detectChanges();
        // $(".picker-columns .picker-col").eq(0).scrollTop(100000);
      });

      $(".picker-columns .picker-col").on('click', function (e) {
        ////console.log(e);
      });
    }, 200);


  }
  /*
      选择时间
      HowlongOrder 提前多长时间可以预约（分钟
     OrderTimeInterval预约时间间隔(分钟)
      */
  choseTime(c?) {
    var nowDate = new Date().getTime();
    if (c) {

      this.pageData.sqsj = new Date(nowDate + (8 * 60) * 60 * 1000).toISOString();
    }
    this.pageData.dateStart = this.pageData.sqsj;
    this.pageData.dateEnd = new Date(nowDate + (8 + 10 * 24) * 60 * 60 * 1000).toISOString();
  }
  //  chosePark(){
  //   var api = 'Index/parks';
  //   this.http.httpPost(api, {
  //   }, (data) => {
  //     // this.tools.showToast(data.info);
  //     if (data) {
  //      this.pageData.parkList=data;
  //      this.tools.showRadio("请选择",(data)=>{
  //       //////console.log(datain);
  //       this.pageData.iPlate=datain;
  // },this.dataPlate,["PlateNumber","PlateNumber"],null,-1)
  //     //  this.page.item=data[0];
  //       // this.navCtrl.push(ContactPage);
  //     }
  //   })
  // }
  chosePlant() {
    var api = 'User/myCarInfo';
    this.http.httpPost(api, {
    }, (data) => {
      if (data.code == "error") {
      } else {
        this.dataPlate = data;
        // 没有添加，1个自动，多个选择
        if (this.dataPlate.length <= 0) {
          this.navCtrl.push('AddCarPage', {
            type: 0,//0没有车牌、1一个车牌、2多个
            save: 1,//0不保存，1保存
            goTo: "ChongCheweiPage",//打算去哪
            isChong: 1
          }).then(() => {
            //  this.navCtrl.remove(this.navCtrl.getActive().index-1);
          })
          return false;
        } else {
          this.tools.showRadio("请选择车牌", (datain) => {
            ////console.log(datain);
            this.pageData.iPlate = datain;
          }, this.dataPlate, ["PlateNumber", "PlateNumber"], null, -1)
        }
      }
    })
  }
  chosePark() {
    this.tools.showRadio("请选择停车场", (datain) => {
      ////console.log(datain);
      this.pageData.parkId = datain;
      this.getPage();
    }, this.pageData.parkList, ["ParkName", "id"], null, -1)
  }
  getPage() {
    this.choseTime();
    var api = 'User/monthly_type';
    this.http.httpPost(api, {
      parkId: this.pageData.parkId
    }, (data) => {
      ////console.log(data)
      if (data && data.info) {
      } else {
        this.pageData.data = data;
        this.pageData.choseData = data[0];
        this.canTimeInit(data[0])
        ////console.log(this.pageData);
      }
    })
  }
  buy() {
    if (!this.pageData.parkId) {
      this.tools.showToast("请选择停车场");
      return;
    }
    var loading;
    var dataup = {
      dt: this.tools.getWhatApp(),//平台，
      // money:99,//金额，
      plate: this.pageData.iPlate,//时间:
      startTime: this.pageData.sqsj,
      monthly_id: this.pageData.choseData['id'] || 1, //月卡类型id
      parkId: this.pageData.parkId
    }
    this.tools.openPayActionSheet(() => {
      loading = this.tools.showLoading("支付中...");
      var api = 'Alipay/card';
      this.http.httpPost(api, dataup, (data) => {
        ////console.log(data)
        if (data.info) {
        } else {
          this.tools.alipay(data);
        }

      }, () => {
        loading.dismiss();
      }, () => {
        loading.dismiss();
      })
    }, () => {
      dataup['payway'] = "yk";
      this.tools.weChatPay(dataup, this.navCtrl)
    })

  }
}
