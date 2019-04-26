import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';

/**
 * Generated class for the ChongCheweiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chong-chewei',
  templateUrl: 'chong-chewei.html',
})
export class ChongCheweiPage {
  pageData={
  wei:"",
  iPlate:""
} 
dataPlate;
  constructor(public http:BaseserviceProvider,public tools:ToolsProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getPage()
  }
  ionViewWillLeave(){
  //  console.log("111");
   
  }
 ionViewDidEnter(){

   
  this.navParams.get("id") && this.tools.set("ParkIdDian",this.navParams.get("id"));
  // console.log(this.navParams.get("id"),this.tools.get("ParkIdDian"));
 }
getPage(){

  if(this.navParams.get('carNum')){
    this.pageData.iPlate=this.navParams.get('carNum');
  }else{
    this.tools.rePlateLog(this.navCtrl,(d)=>{this.pageData.iPlate=d},"ChongCheweiPage",null,1)
  }

}

chosePlant(){
  var api = 'User/myCarInfo';
  this.http.httpPost(api, {
  }, (data) => {
    if (data.code=="error") {
    }else{
      this.dataPlate=data;
   // 没有添加，1个自动，多个选择
if(this.dataPlate.length<=0){
    this.navCtrl.push('AddCarPage', {
      type: 0,//0没有车牌、1一个车牌、2多个
      save:1,//0不保存，1保存
      goTo:"ChongCheweiPage",//打算去哪
      isChong:1
    }).then(()=>{
  //  this.navCtrl.remove(this.navCtrl.getActive().index-1);
    })
    return false;
  }else{
     this.tools.showRadio("请选择车牌",(datain)=>{
       ////console.log(datain);
           this.pageData.iPlate=datain;
     },this.dataPlate,["PlateNumber","PlateNumber"],null,-1)
  }
}
})
}

goChose(){
  //////console.log(this.navParams.get("id"));
  
  if(!this.pageData.wei){
     this.tools.showToast("请输入您所需充电桩的编号","middle");
     return;
  }
  if(!/^[0-9a-zA-Z]*$/g.test(this.pageData.wei)){
    this.tools.showToast("输入的充电桩编号不正确！","middle");
    return;
  }
  this.tools.showConfirm(
    ` <div class="okAlert"><img src="./assets/imgs/chongtit.png" alt=""> <div class="okAlertText">请确认插入充电枪后<br>选择充电类型</div>   </div>`
  // "<div class='okAlert'><img src=\"./assets/imgs/ok.png\" >车位"+data.data.SpaceNumber+"空闲,是否预约？</div>"
  ,()=>{
    // this.navCtrl.pop()
    // this.tools.set("ChongWei",this.pageData.wei)
    this.navCtrl.push("ChongLeiPage",{data:{id:this.navParams.get("id")||this.tools.get("ParkIdDian"),num:this.pageData.wei,'plate':this.pageData.iPlate}});
  },null,null,"选择类型")




 
}
}
