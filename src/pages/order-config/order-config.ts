import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { LocalStorageService } from 'angular-web-storage';

/**
 * Generated class for the OrderConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-config',
  templateUrl: 'order-config.html',
})
export class OrderConfigPage {
  applicationInterval: number;
  pageData={
    payHe:null,
    couponNum:0,
    couponlen:0,
    couponId:0,
    coupon:"",
    data:{
    "record":{
        PlateNumber:"",
        TimeEnter:""
      },
      "totalprcie":null,
      "fine":null
    },
    PlateNumber:""
   };
   pageTools={
     isShow:false,
     
   }
  constructor(public storge: LocalStorageService,public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  // ionViewCanEnter(){
  //   // return ;
  // }
  ionViewDidLoad(){
////console.log("s");
    this.tools.set("CouponChose",null);
  }
  ionViewWillEnter(){
    this.ifChose()
    this.getCoupan()
    this.applicationInterval = setInterval(() => {
      
      this.pageData.PlateNumber&&this.getPage(null,true)
      
  }, 30000);
  }
  ionViewDidEnter() {

    // this.getPage()
  }
  ionViewWillLeave(){
    // 停止定时器
    clearInterval(this.applicationInterval);
  }
  useCoupon(){
    if(this.pageData.couponlen==0){
     return;
    }
    this.navCtrl.push("CouponChosePage")
  }
  getPage(plant?,isInter=false){
////console.log(plant);
    
    // !plant&&(plant="京B02181");

    if(this.navParams.get('carNum')){
      plant=this.navParams.get('carNum')
    }
    plant&&(this.pageData.PlateNumber=plant);
    if(!this.pageData.PlateNumber)return;
    // var promise = new Promise((resolve, reject)=>{
    var api = 'Payment/price_checking';
    this.http.httpPost(api, {
      plate: this.pageData.PlateNumber,
    }, (data) => {
  ////console.log(data);
  ////console.log(plant);
      if(!data){
        // this.navCtrl.pop();
        // reject();
      }else
      if (data.code=="error"&&!isInter) {
        // reject();
        this.tools.showConfirm(null,()=>{
          this.navCtrl.push('AddCarPage', {
            type: 0,//0没有车牌、1一个车牌、2多个
            save:0,//0不保存，1保存
            goTo:"OrderConfigPage",//打算去哪
            // backT:1
          },{
            animate: false
          }).then(()=>{
        //  this.navCtrl.remove(this.navCtrl.getActive().index-1);
          })
         },data.info+"，是否继续搜索车辆？",()=>{
           this.navCtrl.pop()
         })
      }else if(data.code=="null"&&!isInter){
          //  this.tools.showToast(data.info)
           this.tools.showConfirm(null,()=>{
            this.navCtrl.push('AddCarPage', {
              type: 0,//0没有车牌、1一个车牌、2多个
              save:0,//0不保存，1保存
              goTo:"OrderConfigPage",//打算去哪
            },{
              animate: false
            }).then(()=>{
          //  this.navCtrl.remove(this.navCtrl.getActive().index-1);
            })
           },"您绑定的车牌<"+this.pageData.PlateNumber+">"+data.info+"，是否继续搜索车辆？",()=>{
             this.navCtrl.pop()
           })
     
      }else{
    ////console.log(data);
      this.pageData.data=data;
      this.pageData.payHe= this.pageData.data.totalprcie>this.pageData.couponNum?(this.pageData.data.totalprcie-this.pageData.couponNum):0;
          // this.pageData=data;
          // resolve();
      }
      // plant&&(this.pageData.PlateNumber=plant)
    },null,null,1)
  // })
  // return promise;
  }
  changetoLiveT(s){
   return this.tools.timeStoLiveT(s);
  }
  showJiaosheet(){
    // if(this.pageData.payHe==0){
    //    this.tools.showToast("您目前无需支付费用");
    // }else{
      this.tools.openJiaoFeiSheet(()=>this.upOrder(3),()=>this.upOrder(2),()=>this.upOrder())
    // }

  }
  showFinesheet(){
    this.tools.openJiaoFeiSheet(null,null,()=>this.getFa(),"罚金"+this.pageData.data.fine+"元")
  }
getFa(type=1){
  //缴纳罚金
	// Payment/fine_client
	// 参数：time时间戳，type缴费形式，plate车牌号，record_id停车记录id，price缴费金额
	//缴费形式：1预存缴费，2app微信，3app支付宝，4场内微信扫描，5场内支付宝扫描，6出口微信扫描，7出口支付宝扫描，8现金
  var api = 'Payment/fine_app';
  this.http.httpPost(api, {
    // time:new Date().getTime()//时间戳，
    type:type//缴费形式，
    , plate: this.pageData.PlateNumber//车牌号，
    ,record_id:this.pageData.data.record['id']//停车记录id，
    ,price:this.pageData.data["fine"]//缴费金额
  }, (data) => {
    if (data.code=="error") {
    }else{
      this.tools.showToast(data.info);
    this.getPage(this.pageData.PlateNumber);
    }

  })
}

  getCoupan(){
   let coupanS=this.tools.get("CouponChose")
   if(coupanS){
     if(this.pageData.data.totalprcie<coupanS.amount){
       this.tools.showToast("消费金额需大于优惠券面额才能抵扣使用")
      return;
      }
     this.pageData.couponNum=coupanS.amount;
    this.pageData.coupon=coupanS.amount+"元";
    this.pageData.couponId=coupanS.id;
  return; 
  }


    //   获取用户已领取的优惠券
    // 接口：Index/usercoupan
    // 参数：user_id用户id,type类型：0未使用，1已使用，2全部
    // 返回：有则返回数据，无则返回空值
      var api = 'Index/usercoupan';
      this.http.httpPost(api, {
        type:0
      }, (data) => {
        if (data.code=="error") {
        }else{
          this.pageData.couponNum=0;
          this.pageData.couponId=0;
          if(data.length>0){
            this.pageData.payHe= this.pageData.data.totalprcie>this.pageData.couponNum?(this.pageData.data.totalprcie-this.pageData.couponNum):0
            this.pageData.couponlen=data.length;
            this.pageData.coupon=data.length+"张";
          }else{
            this.pageData.couponlen=0;
            this.pageData.coupon="无优惠券";
          }
        }
  
      })
    }

    // 提交订单
  upOrder(type=1){
    var dataUp={
      coupon  : this.pageData.couponId,//优惠券id
      type    : type,
      dt:this.tools.getWhatApp(),
      plate		:  this.pageData.PlateNumber,//车牌号
    }
    if(type==1){
    this.tools.showConfirm(null,()=>{
      this.getPayData(type);
    },"确定使用预存缴费？"
  )
}else if(type==2){
  dataUp["payway"]='jf';
  this.tools.weChatPay(dataUp,this.navCtrl,this.pageData.payHe==0);
}else if(type==3){
  this.getPayApliy(dataUp);
}
  }
  getPayData(type){
    var api = 'Payment/charges';
    this.http.httpPost(api, {
      coupon  : this.pageData.couponId,//优惠券id
      // time		: (new Date()).getTime(),//缴费时间：时间戳			
      type    : type,//缴费形式：1预存缴费,2出口微信扫描，3出口支付宝扫描，4场内微信扫描，5场内支付宝扫描，
                         //		   6现金+出口微信扫描，7现金+出口支付宝扫描，8现金
      plate		:  this.pageData.PlateNumber,//车牌号
      // record_id	: 1,//停车记录id
      // cash		:1 ,//现金
    }, (data) => {
      if (data.code=="error") {
        if(data.type==1){
          this.navCtrl.push("RechargePage")
        }
      }else{
        this.tools.showToast(data.info)
        this.navCtrl.pop()
    ////console.log(data);
      
      }
  })
  }
  getPayApliy(dataUp){
    var loading=this.tools.showLoading();
    var api = 'Dangmian/alipayment';
    this.http.httpPost(api, dataUp, (data) => {
      if (data.code=="error") {
        if(data.type==1){
          this.navCtrl.push("RechargePage")
        }
      }else if(data.code=='success'){
        this.tools.showToast(data.info)
         this.navCtrl.pop();
      }
      else{
        this.tools.alipay(data,this.navCtrl);

    ////console.log(data);
      
      }
    loading.dismiss();
  },()=>{
    loading.dismiss();
  })
  }
  ifChose(){
   
    // if(this.storge.get("chosePlate")){
    //   this.getPage(this.storge.get("chosePlate"));
    //   return;
    // }
////console.log(this.navParams.get('carNum'));
    
    this.pageTools.isShow=false;
//console.log(this.tools.isLogin());

      
     if(this.tools.isLogin()!=1){
      this.tools.rePlateLog(this.navCtrl,(d)=>{this.getPage(d)},"OrderConfigPage");
      return;
     }

    if(this.navParams.get('carNum')){
      this.getPage(this.navParams.get('carNum'))
      return;
    }
////console.log(this.pageData.PlateNumber);
    
    if(  this.pageData.PlateNumber){
      this.getPage(this.pageData.PlateNumber)
      return;
    }
    // this.myCallbackFunction.then(()=>{})
    //////console.log(this.navCtrl.getByIndex(this.navCtrl.getActive().index+1));
    
    this.tools.rePlateLog(this.navCtrl,(d)=>{this.getPage(d)},"OrderConfigPage")
    // var loading=this.tools.showLoading();
    // if(this.storge.get("loginKey")){
     
    //   var api = 'User/myCarInfo';
    //   this.http.httpPost(api, {
    //   }, (data) => {
    //     if (data.code=="error") {
    //     }else{
    //       // 没有添加，1个自动，多个选择
    //       if(data.length<=0){
    //     ////console.log(111);
            
    //         this.navCtrl.push('AddCarPage', {
    //           type: 0,//0没有车牌、1一个车牌、2多个
    //           save:1,//0不保存，1保存
    //           goTo:"OrderConfigPage",//打算去哪
    //         },{
    //           animate: false
    //         }).then(()=>{
    //        this.navCtrl.remove(this.navCtrl.getActive().index-1);
    //         })
    //         return false;
    //       }else if(data.length==1){
    //     ////console.log(2,data[0].PlateNumber);
    //         this.getPage(data[0].PlateNumber);
    //       }else{
    //     ////console.log(3);
        
    //          this.tools.showRadio("请选择车牌",(datain)=>{
    //            ////console.log(datain);
    //                this.storge.set("chosePlate",datain);
    //                this.getPage(datain);
    //          },data,["PlateNumber","PlateNumber"],()=>{
    //                  this.navCtrl.pop();
    //          })
    //       }
    //     }
  
    //   },()=>{loading.dismiss()},()=>{
    // ////console.log("dfd");
        
    //     loading.dismiss();
    //     this.pageTools.isShow=true;
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
    //     this.pageTools.isShow=true;
    //     this.navCtrl.remove(this.navCtrl.getActive().index-1)
    //   })
    //   return false;
    // }
  }
  // 用于pop 回调的 block
  myCallbackFunction  =(params) => {
    return new Promise((resolve, reject) => {

     if(typeof(params)!='undefined'){
       this.pageData.PlateNumber=params;
         resolve("ok");
     
        // ////console.log('回调1: '+ params);
     }else{

         reject(Error('error'))
     }
           
  });
}
// 按钮点击事件
pushClick(){

  this.navCtrl.push("CouponChosePage", {
   callback: this.myCallbackFunction,
   plant:this.pageData.PlateNumber
})


}
}