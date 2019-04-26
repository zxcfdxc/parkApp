import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  pet: string = "che";
 
  pageData={
    cheH:[],
    moneyH:[],
    cheP:1,
    monP:1,
    cheOver:false,
    monOver:false,
    infscroll:true,

  }

  constructor(public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.getPageChe();
    this.getPageMon();
  }
  
  ionViewDidLoad() {


  }
  goDetail(id){
////console.log(id);
    this.navCtrl.push("HelpDetailPage",{
      id:id
    })
  }
  goHMDetai(id){
    this.navCtrl.push("HisMonDePage",{id:id});
      }

  //下拉刷型界面
doRefresh(refresher?){
 ////console.log("下拉刷新");
   if(this.pet=="che"){
    this.pageData.cheP=1;
       this.getPageChe(refresher);
   }else if(this.pet=="money"){
    this.pageData.monOver=false;
    this.pageData.monP=1;
     this.getPageMon(refresher);
   }
}
//下滑动加载数据
doInfinite(infiniteScroll){

  if(this.pet=="che"){
    this.getPageChe(infiniteScroll,++this.pageData.cheP);
}else if(this.pet=="money"){
  if(!this.pageData.monOver){
    this.getPageMon(infiniteScroll,++this.pageData.monP);
  }
  }
 
}

  getPageChe(flash?,p?){
  ////console.log();
      !p&&(p=1);
    var api = 'User/parkingRecord';
    this.http.httpPost(api, {
      // user_id:123456
      length:10,//条数
      page:p||1//页数
    }, (data) => {
      if (data.code=="error") {
      }else{
    ////console.log(data);
        if(p==1){
          this.pageData.cheH=data;
          this.pageData.infscroll=true;
        }else{
          this.pageData.cheH=this.pageData.cheH.concat(data);
        }
         if(p!=1&&data.length==0){
       ////console.log(this.pageData.infscroll);
           
         this.pageData.infscroll=false;
         }
      }

    },()=>{
      flash&&flash.complete();
    },
    ()=>{
      flash&&flash.complete();
    })
    
  }

  getSum(item){
    // this.tools.timeStoLiveT
////console.log(item.Epayment-item.ChargeFee||0+item.Cash||0);
    // if(item.CarStatus==0){
    //   return "未出场"
    // }else{
      return item.prcie
    // }
  
  }
  timeFrmate(t,isw?){
    var data=new Date(t.replace(/\-/g, '/'))
    if(isw){
      var weekday=new Array(7)
weekday[0]="日"
weekday[1]="一"
weekday[2]="二"
weekday[3]="三"
weekday[4]="四"
weekday[5]="五"
weekday[6]="六"
        return "周"+weekday[data.getDay()]
    }else{
      return this.tools.dateFormat("MM-dd",data)
    }

  }

  getPageMon(flash?,p?){
       !p&&(p=1)
    var api = 'User/payment_record';
    this.http.httpPost(api, {
      // user_id:123456
      length:15,//条数
      page:p||1//页数
    }, (data) => {
      if (!data||data.length==0||data.code=="error") {
        this.pageData.monOver=true;
      }else{
    ////console.log(data);
        if(p==1){
          this.pageData.moneyH=data;
          this.pageData.infscroll=true;
        }else{
          this.pageData.moneyH=this.pageData.moneyH.concat(data);
        }
        if(p!=1&&data.length==0){
          this.pageData.infscroll=false;
        }
      }
    },()=>{
     
      flash&&flash.complete();
    },
    ()=>{
      flash&&flash.complete();
    })
  }

}
