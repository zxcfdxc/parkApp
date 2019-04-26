import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import{Appconfig}from '../../providers/baseservice/app.config';

/**
 * Generated class for the ChongLeiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var $;
@IonicPage()
@Component({
  selector: 'page-chong-lei',
  templateUrl: 'chong-lei.html',
})
export class ChongLeiPage {
  pageData={
    select:1,//1自由充,2定时充,3定量充
    timelist:[],
    timeLength:30,//定时充
    money:"",//定量充
    usetime:5

  }
  constructor(public http:BaseserviceProvider,public tools:ToolsProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.buildTime()
  }
  
  buildTime(){
    
    var maxtime=21;
    for(let i=1;i<maxtime;i++){
      var tL=30*i
      this.pageData.timelist.push({
        length:tL,
        name:this.tools.timeStoLiveT(tL*60,false)
      })
    }
  }
  chong(){
    let parGet=this.navParams.get("data")
    let param={
      auto:parGet.auto||2,
      park:parGet.id,
    name:parGet.num,
    type:this.pageData.select+1,
    plate:parGet.plate,
    }

    if(this.pageData.select==1){
      this.upChong(param);
    }else
   if(this.pageData.select==2){
    param["timelength"]=this.pageData.timeLength;
     this.tools.showConfirm(null,()=>{
      this.upChong(param);
     },"您确定定时充"+this.tools.timeStoLiveT(this.pageData.timeLength*60,false)+"吗？")
   }else if(this.pageData.select==3){
     if(this.pageData.money==""||this.pageData.money as any==0){
       this.tools.showToast("请您输入金额")
       return;
     }
    param["money"]=this.pageData.money;  
    this.tools.showConfirm(null,()=>{
      this.upChong(param);
    },"您确定定额充"+this.pageData.money+"元吗？")
   }
  }


  upChong(parmR){
    this.pageData.usetime=120;
    // let alerttext=`<div class="okAlert"><img src="./assets/imgs/chongtit.png" alt=""> <div class="okAlertText">充电启动中，请勿拔枪<br>充电将于 <span class="colorRed">${this.pageData.usetime}</span> 内启动</div>   </div>`
   let alert= this.tools.showEmpAlert(`<div class="okAlert"><img src="./assets/imgs/chongtit.png" alt=""> <div class="okAlertText">充电启动中，请勿拔枪<br>充电将于 <span class="colorRed">${this.pageData.usetime}</span> 秒内启动</div>   </div>`)
    let interval= setInterval(()=>{
      this.pageData.usetime--;
      let title = document.getElementsByClassName('alert-title')[0];  
      title && (title.innerHTML = `<div class="okAlert"><img src="./assets/imgs/chongtit.png" alt=""> <div class="okAlertText">充电启动中，请勿拔枪<br>充电将于 <span class="colorRed">${this.pageData.usetime}</span> 秒内启动</div>   </div>` );  
      if(this.pageData.usetime<=0){
        dismissInAlert()
        this.tools.showToast("请求超时");
      }
    },1000)
    function dismissInAlert(){
      clearInterval(interval);
      alert.dismiss();
    }
    parmR.user_id=this.tools.get("loginId");
    var _thiss=this;
    $.ajax({
      dataType: "json",
      type: "post",
      data:parmR,
      url:Appconfig.getBaseUrl()+'Equip/charging',
      async: true,
      success: function(data) {
        dismissInAlert();
    ////console.log(data)
        if (data.code=="error") {
        
          _thiss.tools.showToast(data.info);
          if(data.type==1){
            // this.tools.showToast(data.info)
            _thiss.navCtrl.push("RechargePage");
          }else{
            _thiss.navCtrl.pop();
          }
         
        }else if(data.code=="04"){
        
          _thiss.navCtrl.push("RechargePage");
        }else{
          _thiss.navCtrl.push("ChongStatePage")
        }
      },
      error: function(e) {
        dismissInAlert();
    ////console.log(e)
      }
})
   // var api = 'Equip/charging';
    // this.http.httpPost(api, parmR, (data) => {
    //////console.log(data)
    //   if (data.code=="error") {
    //     if(data.type==1){
    //       // this.tools.showToast(data.info)
    //       this.navCtrl.push("RechargePage");
    //     }else{
    //       this.navCtrl.pop();
    //     }
       
    //   }else if(data.code=="04"){
    //     this.tools.showToast(data.info)
    //     this.navCtrl.push("RechargePage");
    //   }else{
    //     this.navCtrl.push("ChongStatePage")
    //   }
  
    // })
  }
    
}
