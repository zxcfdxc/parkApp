import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';

/**
 * Generated class for the ChongStatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chong-state',
  templateUrl: 'chong-state.html',
})
export class ChongStatePage {
  // 声明变量
  applicationInterval:any; // 定时器
  canInter=true;
   pageData={
   }
   timeData={
    usetime:5
   }
  interval: number;
  constructor(public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  ionViewDidEnter(){

    this.getPage();
    var time=1;
    var timeLen=90000;
  //   this.applicationInterval = setInterval(() => {
  //     this.intervalPage()

  //     if(time==1){
  //       timeLen=30000;
  //     }else{
  //       timeLen=90000;
  //     }
  //     time++;
  // ////console.log(timeLen,time);


  // }, timeLen);
  var this_=this;
  var myFunction = function(){
      clearInterval(this_.interval);
    if(!this_.canInter)return;
    this_.intervalPage()

    if(time==1){
      timeLen=60000;
    }else{
      timeLen=30000;
    }
    time++;
////console.log(timeLen,time);
  
    console.log(this_.canInter);
    
    this_.interval = setInterval(()=>{myFunction()}, timeLen);
}
this.interval = setInterval(()=>{myFunction()}, timeLen);
  }
  ionViewWillLeave(){
    // console.log("111");
    clearInterval(this.interval);
    // 停止定时器
    this.canInter=false;
  }

  intervalPage(){
    var api = 'Equip/charge_heartbeat';
      this.http.httpPost(api,{}, (data) => {
    ////console.log(data)
        if (data.code=="error")
        {
          if(!this.canInter)return;
          this.navCtrl.pop();
        }else{
        //	有预约返回：
		// code：100，
    // 没有预约/错误返回：code：101，info：信息
    // 正在充电中：code：200，data： 充电信息

    // if(data.code=="error"){
    // }
    // if (data.code==100) {
    //   this.navCtrl.push("ChongLeiPage",{data:data})
    // }
    // if (data.code==101) {
    // // this.tools.showToast(data.info)
    // this.tools.showConfirm(null,()=>{

    //   this.navCtrl.push("AllParkPage");

    // },data.info+"是否选择普通流程充电？")
    // }
    if (data.code==200) {
      this.pageData=data.data
      if(this.pageData['type']==3){
        this.pageData["typeText"]="设置定时充电："+ (this.pageData['times']||0)+"分钟";
      }else if(this.pageData['type']==4){
        // 额充电
        this.pageData["typeText"]="设置定额充电："+ (this.pageData['money']||0)+"元";
      }

    }else{
      this.canInter=false;
      this.tools.showToast(data.info)
      this.navCtrl.pop();
    }
        }

      })
  }

  getPage(){
    var parmR=this.navParams.get("dataS");

   if(parmR){
    this.pageData=parmR;
   }else{
      var api = 'Equip/charge_type';
      this.http.httpPost(api,{}, (data) => {
        if (data.code=="error") {
          this.navCtrl.pop();
        }else{
        //	有预约返回：
		// code：100，
    // 没有预约/错误返回：code：101，info：信息
    // 正在充电中：code：200，data：充电信息

    // if(data.code=="error"){
    // }
    // if (data.code==100) {
    //   this.navCtrl.push("ChongLeiPage",{data:data})
    // }
    // if (data.code==101) {
    // // this.tools.showToast(data.info)
    // this.tools.showConfirm(null,()=>{

    //   this.navCtrl.push("AllParkPage");

    // },data.info+"是否选择普通流程充电？")
    // }
    if (data.code==200) {
      this.pageData=data.data
      if(this.pageData['type']==3){
        this.pageData["typeText"]="设置定时充电："+ (this.pageData['times']||0)+"分钟";
      }else if(this.pageData['type']==4){
        // 额充电
        this.pageData["typeText"]="设置定额充电："+ (this.pageData['money']||0)+"元";
      }

    }else{
      this.tools.showToast(data.info)
      this.navCtrl.pop();
    }
        }

      })

    }
  }
  chanceChong(){
    
    this.timeData.usetime=120;
    let alert= this.tools.showEmpAlert(`<div class="okAlert"><img src="./assets/imgs/chongtit.png" alt=""> <div class="okAlertText">停止充电中<br>充电将于 <span class="colorRed">${this.timeData.usetime}</span> 秒内停止</div>   </div>`)
    let interval= setInterval(()=>{
      this.timeData.usetime--;
      let title = document.getElementsByClassName('alert-title')[0];
      title && (title.innerHTML = `<div class="okAlert"><img src="./assets/imgs/chongtit.png" alt=""> <div class="okAlertText">停止充电中<br>充电将于 <span class="colorRed">${this.timeData.usetime}</span> 秒内停止</div>   </div>` );
      this.timeData.usetime--;
      if(this.timeData.usetime<=0){
        dismissInAlert()
        this.tools.showToast("请求超时");
      }

    },1000)
    function dismissInAlert(){
      clearInterval(interval);
      alert.dismiss();
    }
    // 停电
    // Equip/charging
    // 参数：e_id：充电桩id，park停车场id，type:5
    var api = 'Equip/charging';
    this.http.httpPost(api,
       {r_id:this.pageData['id'],
       park:this.pageData['park'],
      type:5
      },
       (data) => {
        dismissInAlert();
  ////console.log(data)
      if (data.code=="error") {

      }else{
        this.tools.showToast(data.info)
        this.navCtrl.pop();
      }

    },()=>{
      dismissInAlert()
    })
  }
}
