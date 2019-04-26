import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { DomSanitizer } from '@angular/platform-browser';
import { Appconfig } from '../../providers/baseservice/app.config';
// import { interval } from 'rxjs/observable/interval';

/**
 * Generated class for the MesCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mes-center',
  templateUrl: 'mes-center.html',
})
export class MesCenterPage {

  pet: string = "import";
 
  pageData={
    sysData:[],
    importData:[],
    transData:[],
    cheP:1,
    monP:1,
    infscroll:true
  }

  constructor(public sanitizer:DomSanitizer,public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
    // this.getPageTrans();
  }
  
  ionViewDidLoad() {
    this.getPageSys();
    this.getPageImport();

  }
  assembleHTML(strHTML:any) {
    var baseImg=Appconfig.baseImgUrl2;
    if(strHTML){
      strHTML=strHTML.replace(/src=\"\/park\/public/g,'src="'+baseImg+'public');
      strHTML=strHTML.replace(/src=\"\/public/g,'src="'+baseImg+'public');
    }
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
  goDetail(id){
////console.log(id);
    this.navCtrl.push("HelpDetailPage",{
      id:id
    })
  }


  //下拉刷型界面
doRefresh(refresher?){
 ////console.log("下拉刷新");
   if(this.pet=="sys"){
       this.getPageSys(refresher);
   }else if(this.pet=="import"){
     this.getPageImport(refresher);
   }
  //  else if(this.pet=="trans"){
  //    this.getPageTrans(refresher);
  //  }
}
//下滑动加载数据
doInfinite(infiniteScroll){
  if(this.pet=="sys"){
    this.getPageSys(infiniteScroll,this.pageData.cheP++);
}else if(this.pet=="import"){
  this.getPageImport(infiniteScroll,this.pageData.monP++);
}
// else if(this.pet=="trans"){
//   this.getPageTrans(infiniteScroll,this.pageData.monP++);
// }

}
//参数：type:1系统消息，2重要通知; length:条数（默认15）； page页数（默认1）
// getPageTrans(flash?,p?){
 
//   !p&&(p=1);
// var api = 'Message/lists';
// this.http.httpPost(api, {
//   // user_id:123456
//   type:3,
//   length:10,//条数
//   page:p||1//页数
// }, (data) => {
//   if (data.code=="error") {
//   }else{
// ////console.log(data);
//     if(p==1){
//       this.pageData.transData=data;
//       this.pageData.infscroll=true;
//     }else{
//       this.pageData.transData=this.pageData.transData.concat(data);
//     }
//      if(p!=1&&data.length==0){
//    ////console.log(this.pageData.infscroll);
       
//      this.pageData.infscroll=false;
//      }
//   }

// },"",
// ()=>{
//   flash&&flash.complete();
// })
// }
//参数：type:1系统消息，2重要通知; length:条数（默认15）； page页数（默认1）
  getPageSys(flash?,p?){
  ////console.log();
      !p&&(p=1);
    var api = 'Message/lists';
    this.http.httpPost(api, {
      // user_id:123456
      type:1,
      length:10,//条数
      page:p||1//页数
    }, (data) => {
      if (data.code=="error") {
      }else{
    ////console.log(data);
        if(p==1){
          this.pageData.sysData=data;
          this.pageData.infscroll=true;
        }else{
          this.pageData.sysData=this.pageData.sysData.concat(data);
        }
         if(p!=1&&data.length==0){
       ////console.log(this.pageData.infscroll);
           
         this.pageData.infscroll=false;
         }
      }

    },"",
    ()=>{
      flash&&flash.complete();
    })
    
  }
  getPageImport(flash?,p?){
       !p&&(p=1)
    var api = 'Message/lists';
    this.http.httpPost(api, {
      // user_id:123456
      type:2,
      length:10,//条数
      page:p||1//页数
    }, (data) => {
      if (data.code=="error") {
      }else{
    ////console.log(data);
        if(p==1){
          this.pageData.importData=data;
          this.pageData.infscroll=true;
        }else{
          this.pageData.importData=this.pageData.importData.concat(data);
        }
        if(p!=1&&data.length==0){
          this.pageData.infscroll=false;
        }
      }
    },"",
    ()=>{
      flash&&flash.complete();
    })
  }

}
