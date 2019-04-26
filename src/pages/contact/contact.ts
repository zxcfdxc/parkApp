import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';

// @IonicPage({
//   name: 'contact'
// })
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  pageData:object={
    user:{}
   };
  constructor(public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.getPage()
  }

  ionViewDidLoad() {
       
      // this.getPage()

  }
 
  
 changeName(){
  this.tools.showPrompt("修改姓名",(data)=>{
//console.log(data);
     if(data.prompt.length>12){
       this.tools.showToast("最长能设置12位")
       return;
     }    

    var api = 'User/edit_info';
    this.http.httpPost(api, {
     realname:data.prompt
    }, (data) => {
      if (data.code=="error") {
      }else{
         this.getPage();
      }

    })


  },"您的姓名(最长12位)")
 }
  getPage(){
    var api = 'User/userinfo';
    this.http.httpPost(api, {
     
    }, (data) => {
      if (data.code=="error") {
        this.outLogmain();
      }else{
          this.pageData=data.user;
      }

    })
  }
  outLog(){
    this.tools.showConfirm("",()=>{
   this.outLogmain()
    },"您确定要退出吗?")
  }
  outLogmain(){
    this.tools.resetS();
    this.navCtrl.push("LoginPage",{
    
    }).then(()=>{
     this.navCtrl.remove(this.navCtrl.getActive().index-1);
      
    })
  }

  changeP(){
    
    this.navCtrl.push("ForgetmPage",{  goTo:"back"});
  }

}
