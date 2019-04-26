import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import{Appconfig}from '../../providers/baseservice/app.config';
import { ToolsProvider } from '../../providers/tools/tools';
import { LocalStorageService } from 'angular-web-storage';
// import { timestamp } from 'rxjs/operator/timestamp';
/**
 * Generated class for the ChoseCarportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var layer:any;
declare var $:any;
@IonicPage()
@Component({
  selector: 'page-chose-carport',
  templateUrl: 'chose-carport.html',
})
export class ChoseCarportPage {
  page = {
    data:{id:""},
    pepperoni:false,
    dateStart:new Date(new Date().getTime()+8*60*60*1000).toISOString(),//计划请假从
    dateEnd:new Date(new Date().getTime()+9*60*60*1000).toISOString(),//计划请假至
    sqsj:new Date(new Date().getTime()+8*60*60*1000).toISOString(),//申请时间
    zoonId:"" ,//提交区ID
    // upTime:"",//提交时间
    isChong:false,//是否冲电
    parkBack:{},//返回车位
    minShow:"",//可显示的分钟
    minShowA:[],//可显示的分钟Array
    dingChe:"",//订车Id
    iPlate:"请选择车牌",
    isOnlyChong:this.navParams.get("isChong")==1,
    timeLineTolo:0//本地线上时差
  };
  dataPlate=[]
  isShow=false;
  baseImgUrl=Appconfig.baseImgUrl;
  constructor(public change: ChangeDetectorRef,public storge:LocalStorageService, public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
////console.log(this.navParams.get("isChong")==1);
    
  

    this.getPage();
    // this.freeCarInfo();
  
  }
  ionViewWillEnter(){
    this.ifChose()
    }
  getPage(){
    this.navParams.get("id")&&this.tools.set("chosePortId",this.navParams.get("id"));
    if(this.navParams.get("isChong")==1)this.page.isChong=true;
    var api = 'Index/parkInfo';
    this.http.httpPost(api, {
      id:this.tools.get("chosePortId")
    }, (data) => {
  ////console.log(data)
      if (data.info) {
      }else{
        this.page.data=data;
        if(this.navParams.get("quId")){
          this.page.zoonId=this.navParams.get("quId")
        }else{
          this.page.zoonId=data.zone[0].id;
        }
        this.choseTime(data);
        setInterval((data)=>{
          this.choseTime(data);
        },1000*60)
     
      }

    })
  }
  //  选择车区
  chosePlace(){

  }
  styleTime(){
////console.log("df");
    setTimeout(() => {
      $(".picker-columns .picker-col").each(function(index,ele){
        //////console.log($(ele));
        if(index==1){
       
        $(this).find(".picker-opt").each(function(index,ele){
     
              var t=$(this).text();
              $(this).text(t+"日");

            })
        }
        if(index==2){
          $(this).find(".picker-opt").each(function(index,ele){
                var t=$(this).text();
                $(this).text(t+"时")
              })
          }
          if(index==3){
            $(this).find(".picker-opt").each(function(index,ele){
                  var t=$(this).text();
                  $(this).text(t+"分")
                })
            }
           
      })
      // let _this2=this;
      $(".picker-columns .picker-col").on('touchstart',function(e) {
        // _this2.change.detectChanges();
    ////console.log(e);
        $(".picker-columns .picker-col").eq(0).scrollTop(100000);
     });
     
   $(".picker-columns .picker-col").on('click',function(e) {
 ////console.log(e);
  this.change.detectChanges();
  });
    }, 200);

   
  }
  ifChose(){
   
    // if(this.storge.get("chosePlate")){
    //   this.page.iPlate=this.storge.get("chosePlate");
    //   return;
    // }
    if(this.navParams.get("carNum")){
      this.page.iPlate=this.navParams.get("carNum");
      return;
    }
    this.tools.rePlateLog(this.navCtrl,(d)=>{this.page.iPlate=d},"ChoseCarportPage",this.navParams.get("isChong")==1,-1)
    // var load=this.tools.showLoading();
    // if(this.storge.get("loginKey")){
    //   var api = 'User/myCarInfo';
    //   this.http.httpPost(api, {
    //   }, (data) => {
    //     if (data.code=="error") {
    //     }else{
    //       this.dataPlate=data;
    //       // 没有添加，1个自动，多个选择
    //       if(data.length<=0){
    //     ////console.log(111);
            
    //         this.navCtrl.push('AddCarPage', {
    //           type: 0,//0没有车牌、1一个车牌、2多个
    //           save:0,//0不保存，1保存
    //           goTo:"ChoseCarportPage",//打算去哪
    //           isChong:this.navParams.get("isChong")==1
    //         },{
    //           animate:false
    //         }).then(()=>{
    //       //  this.navCtrl.remove(this.navCtrl.getActive().index-1);
    //         })
    //         return false;
    //       }else if(data.length==1){
    //     ////console.log(2);
    //         this.page.iPlate=data[0].PlateNumber;
    //       }else{
    //     ////console.log(3);
    //          this.tools.showRadio("请选择车牌",(datain)=>{
    //            ////console.log(datain);
    //                this.page.iPlate=datain;
    //                this.storge.set("chosePlate",datain);
    //          },data,["PlateNumber","PlateNumber"],()=>{
    //                  this.navCtrl.pop();
    //          })
    //       }
    //     }
  
    //   },null,()=>{load.dismiss()})
    // }else{
    //   this.tools.showAlert("请您先登录",()=>{
    //     this.navCtrl.push("LoginPage");
    //     load.dismiss();
    //   })
    // }
  }

 
 //点击选择多个车牌
  f_chosePlate(){
    var api = 'User/myCarInfo';
    this.http.httpPost(api, {
    }, (data) => {
      if (data.code=="error") {
      }else{
        this.dataPlate=data;
     // 没有添加，1个自动，多个选择
  // if(this.dataPlate.length<=1){
  //     this.navCtrl.push('AddCarPage', {
  //       type: 0,//0没有车牌、1一个车牌、2多个
  //       save:0,//0不保存，1保存
  //       goTo:"ChoseCarportPage",//打算去哪
  //       isChong:1
  //     }).then(()=>{
  //   //  this.navCtrl.remove(this.navCtrl.getActive().index-1);
  //     })
  //     return false;
  //   }else{
       this.tools.showRadio("请选择车牌",(datain)=>{
         ////console.log(datain);
             this.page.iPlate=datain;
             this.storge.set("chosePlate",datain);
       },this.dataPlate,["PlateNumber","PlateNumber"],null,-1)
    }
  // }
})
  }
  /*
    选择时间
    HowlongOrder 提前多长时间可以预约（分钟
   OrderTimeInterval预约时间间隔(分钟)
    */
  choseTime(data?){
   var  dataIn=data?data:this.page.data;
    var nowDate=this.page.data["time_stamp"]*1000;
    var nowLocalD=new Date().getTime();
    var nowLineD=this.page.data["time_stamp"]*1000;
    var timeSort=[];

    if(this.page.timeLineTolo==0){
      this.page.timeLineTolo=nowLineD-nowLocalD;
    }
    nowDate=nowLocalD+this.page.timeLineTolo;//本地线上时差

    // nowDate=nowLocalD

    // new Date().getTime();
    // dataIn.parameter.OrderTimeInterval=10;
////console.log(Math.floor(60/dataIn.parameter.OrderTimeInterval));
////console.log(new Date(nowDate));
    
     this.page.sqsj=new Date(nowDate+(8*60+dataIn.parameter.OrderTimeInterval*1)*60*1000).toISOString();
      this.page.dateStart= this.page.sqsj;
      var bao=dataIn.parameter.HowlongOrder;//保险
      if(dataIn.parameter.HowlongOrder<dataIn.parameter.OrderTimeInterval)bao=dataIn.parameter.OrderTimeInterval
      this.page.dateEnd= new Date(nowDate+(8*60+bao*1)*60*1000).toISOString();    
     this.page.minShow=new Date(nowDate+(8*60+dataIn.parameter.OrderTimeInterval*1)*60*1000).getMinutes()+"";
    //分钟的选择
    for(let i=1;i<Math.floor(60/dataIn.parameter.OrderTimeInterval);i++){
     
      var moremin=(parseInt(this.page.minShow)+dataIn.parameter.OrderTimeInterval*i)%60
      this.page.minShow=this.page.minShow+","+moremin;
     
    }
    timeSort=this.page.minShow.split(",").sort((a ,b)=>{return (a as any)*1-(b as any)*1}).map((a)=>{return Number(a)})
    // this.page.minShow=timeSort.toString();
    this.page.minShowA=timeSort;
////console.log( this.page.minShow);
    // this.change.detectChanges();
////console.log(this.page);

  }
  //显示图片
  showImg(imgUrl?){
    layer.open({
      type: 1,
      skin: 'layui-img', //样式类名
      closeBtn: 2, //不显示关闭按钮
      anim:0,
      area:['70%','90vh'],
      title: false,
      shadeClose: true, //开启遮罩关闭
      content: '<img src='+Appconfig.baseImgUrl+imgUrl+' alt="">'
    });
  }
  //预约
  yuYue(){
    var load=this.tools.showLoading("解锁中...");
    var api = 'Book/index';
    var time=this.tools.dateFormat("yyyy-MM-dd hh:mm:ss",
    new Date(new Date(this.page.sqsj).getTime()-1000*60*60*8 ))
   ////console.log(new Date(this.page.sqsj));
    this.http.httpPost(api, {
      park_id:this.tools.get("chosePortId"),
      car_plate:this.page.iPlate,
      time_of_arrival: time,
      space_id:this.page.dingChe,
      IfCharging:this.page.isChong?1:0,
      jpushId:this.tools.get("Jpush")
    }, (data) => {
  ////console.log(data)
      // this.navCtrl.push("SeeCarPage")
      if (data.code=="error") {
        //  this.tools.showToast(data.info);
        this.handErr(data.errorCode)
      }else{
    ////console.log(data.id);
        // if(!data.id)this.tools.showToast
        this.tools.showToast(data.info);
          this.storge.set("Appointment",data.id)//预约id
          this.navCtrl.push("SeeCarPage").then(()=>{
            this.navCtrl.remove(this.navCtrl.getActive().index-1);
            if(!this.navParams.get("isBackOne")){
              this.navCtrl.remove(this.navCtrl.getActive().index-2);
            }
          })
        }

    },()=>{load.dismiss()},()=>{load.dismiss()})
  }


  //获取某车场某车区的一个空闲车位信息
  freeCarInfo(){
    var api = 'Index/oneSpace';
    this.http.httpPost(api, {
       parkid:this.page.data.id,//停车场id
       zoneid:this.page.zoonId,//停车区Id
       isCharging:this.page.isChong?1:0//充电：1有，0无
    }, (data) => {
      if (data.code!="success") {
        //  this.tools.showToast(data.info);
         
      }else{
        this.page.parkBack=data;
        this.page.dingChe=data.data.id;
        this.tools.showConfirm(
          ` <div class="okAlert"><img src="./assets/imgs/ok.png" alt=""> <div class="okAlertText">您的车牌号为${this.page.iPlate}<br>车位${data.data.SpaceNumber}暂时空闲,<br>是否预约？</div>   </div>`
        // "<div class='okAlert'><img src=\"./assets/imgs/ok.png\" >车位"+data.data.SpaceNumber+"空闲,是否预约？</div>"
        ,()=>{
          this.yuYue();
        })
      }

    })
  }
  //错误码处理
  handErr(errorCode){
    switch (errorCode) {
      case 1://户金额不足无法预约，请先进行充值
        // this.navCtrl.push("recharge");
        this.navCtrl.push("MyAccountPage");
        break;
    
      default:
        break;
    }
  }
  
}
