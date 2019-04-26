import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
/**
 * Generated class for the MycarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var layer: any;
declare var $: any;
@IonicPage()
@Component({
  selector: 'page-mycar',
  templateUrl: 'mycar.html',
})

export class MycarPage {
  pageData={
    data:[],
    user:{},
    
   };
  constructor(public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
////console.log('ionViewDidLoad MycarPage');
  }
  ionViewWillEnter(){
    this.getPage();
  }
  getPage(){
    var api = 'User/myCarInfo';
    this.http.httpPost(api, {
    }, (data) => {
      if (data.code=="error") {
      }else{
          this.pageData.data=data;
      }

    })
  }
  clishowTip(id) {
    // !id && (id = 1);
    //tips层-上

    layer.tips('<span  class="reCar" >解除车牌</span>', '#'+id, {
      tips: [1, '#fff'], //还可配置颜色
      skin: 'tipclass',
      time: 0,
      shade: 0.3,
      shadeClose: true
      // closeBtn:1
    });
    this.cliTip(id)
  }
  remove(id) {
    var api = 'User/delCar';
    this.http.httpPost(api, {
      id:id
    }, (data) => {
      if (data.code=="error") {
      }else{
        this.getPage();
      }

    })
  }
  cliTip(id) {

    $(".reCar").click((e) => {

  ////console.log(id);
      this.tools.showConfirm(
        "", () => {
          this.remove(id);
        }, `是否确认解除绑定`)
      layer.closeAll("tips");
    })
  }




addCar(){
  this.navCtrl.push("AddCarPage");
}

 
}
