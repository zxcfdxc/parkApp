import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';

/**
 * Generated class for the AddCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// declare var layer: any;
declare var $: any;
@IonicPage()
@Component({
  selector: 'page-add-car',
  templateUrl: 'add-car.html',
})
export class AddCarPage {
  pageData={
    data:{},
    plate:"",
   index:this.navCtrl.getActive().index,
   isSave:this.navParams.get("save")==1
  }
  constructor(public viewControll: ViewController,public tools:ToolsProvider,public http:BaseserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.addPant()
    this.page();
////console.log('ionViewDidLoad AddCarPage');
  }
  

  page(){
////console.log(this.navCtrl.getActive().index);
    // $(".carLicenseMain li").
    var api = 'User/carType';
    this.http.httpPost(api, {
    }, (data) => {
      if (data.code=="error") {
      }else{
          this.pageData.data=data;
      }
  
    })
  }
   

//车牌号验证方法

isVehicleNumber(vehicleNumber) {

  var xreg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;

  var creg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-IJ-NP-Z0-9挂学警港澳领]{1}$/;

  if(vehicleNumber.length == 7){
//console.log(vehicleNumber,creg.test(vehicleNumber));

    return creg.test(vehicleNumber);

  } else if(vehicleNumber.length == 8){

    return xreg.test(vehicleNumber);

  } else{

    return false;
    
  }
}

  alertR(){
    
    // var regCar1 = /^([冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领][a-zA-Z](([DF](?![a-zA-Z0-9]*[IO])[0-9]{4})|([0-9]{5}[DF])))|([冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领A-Z]{1}[a-zA-Z0-9]{5}[a-zA-Z0-9挂学警港澳]{1})$/; //常规汽车车牌
    var carNum='';
////console.log(carNum);
    let _this=this;
    function goToNew(){
      if(_this.navParams.get("goTo")){
        _this.navCtrl.push(_this.navParams.get("goTo"),{
          carNum:carNum,
          isChong:_this.navParams.get("isChong")==1||_this.navParams.get("isChong")
        },{
         animate:false
        }).then(() => {
          if(_this.navParams.get("backT")==1){
            _this.navCtrl.remove(_this.navCtrl.getActive().index-1);
          }else{
            _this.navCtrl.remove(_this.navCtrl.getActive().index-1);
            _this.navCtrl.remove(_this.navCtrl.getActive().index-2);
          }
        });
      }else{
            _this.navCtrl.pop()
      }
    }
    $(".carLicenseMain li").each(function(){
      carNum+=$(this).text();
    })
////console.log(carNum);
    if(!this.isVehicleNumber(carNum)){
      this.tools.showToast("请检查输入的车牌号！");
      return ;
    }else{
      this.pageData.plate=carNum;
    }
    if(this.navParams.get("type")==0){
     if(this.navParams.get("save")==1){
     this.addCar(null,()=>{  goToNew()})
     }else{
      goToNew()
     }
   
       
          //  this.navCtrl.push(this.navParams.get("goTo"),{
          //    carNum:carNum
          //  },{
          //   animate:false
          //  })
    }else{
      this.addCar();
      // this.tools.showRadio("请选择车型",data=>{
      //   this.addCar(data)
      // },this.pageData.data)
    }
   
  }
  addCar(carType?,okFun?){
    var api = 'User/addCar';
    this.http.httpPost(api, {
      plate:this.pageData.plate,
      // carType:carType
    }, (data) => {
      if (data.code=="error") {
      }else{
        if(okFun){
          okFun()
        }else{
          if(this.navParams.get("goTo")){
            this.navCtrl.push(this.navParams.get("goTo")).then(() => {
              this.navCtrl.remove(this.navCtrl.getActive().index-1);
            });
          }else{
            this.navCtrl.pop().then(()=>{
  
            });
            // this.navCtrl.push("MycarPage").then(()=>{
            //   this.navCtrl.remove(this.navCtrl.getActive().index-1);
            // });
          }
        }
       
        
      }
  
    })
  }
  
    addPant() {
      var num = 6;//需要输入的车牌数
      // $('.carLicenseMain ul li').each(function () {
      //   var reg = new RegExp('active');
      //   if (reg.test($(this).attr('class'))) {
      //     index = $(this).index();
      //   }
      // })
      //切换键盘
      $('.changeContentBtn').click(function () {
        if ($(this).html() == 'ABC') {
          $('#textBox').show();
          $('#provienceBox').hide();
        } else {
          $('#textBox').hide();
          $('#provienceBox').show();
        }
      })
      //新能源点击事件
      $('.xinnengyuan').click(function () {
        num = 7;
        var index = getIndex();
        if(num==7&&index==6){
          $('.carLicenseMain ul li.active').removeClass('active').next().addClass('active');
        }
        $(this).removeClass('xinnengyuan');
      })
      //获取当前车牌数字索引
      function getIndex() {
        var index = 0;
        $('.carLicenseMain ul li').each(function () {
          var reg = new RegExp('active');
          if (reg.test($(this).attr('class'))) {
            index = $(this).index();
          }
        })
        return index;
      }
      //自定义键盘处理函数
      function keyboard(num, self) {
        var index = getIndex();
      
        if (index <= num) {
          if ((index == num)) {
            $('.carLicenseMain ul li.active').html($(self).html());
          } else {
            $('.carLicenseMain ul li.active').html($(self).html()).removeClass('active').next().addClass('active');
          }
          $('#textBox').show();
          $('#provienceBox').hide();
        }
      }
      //省份键盘点击事件
      $('#provienceBox ul li:not(.other)').click(function () {
        var self = this;
        keyboard(num, self);
      })
      //文本键盘点击事件
      $('#textBox ul li:not(.other)').click(function () {
        var self = this;
        keyboard(num, self);
      })
      //回退按钮点击事件
      $('.deleteBtn').click(function () {
        var index = getIndex();
        if (index == num) {
          if ($('.carLicenseMain ul li.active').html() != '') {
            $('.carLicenseMain ul li.active').html('');
          } else {
            if (index == 7) {
              $('.carLicenseMain ul li:last-of-type').addClass('xinnengyuan');
              num = 6;
            }
            $('.carLicenseMain ul li.active').removeClass('active').prev().addClass('active').html('');
          }
  
        } else if (index < num && index > 1) {
          $('.carLicenseMain ul li.active').removeClass('active').prev().addClass('active').html('');
        } else if (index == 1) {
          $('.carLicenseMain ul li.active').removeClass('active').prev().addClass('active').html('省');
        }
      })
  
      //提交按钮点击事件
      $('#submitBtn').click(function () {
        //		window.location.href = "payment.html";
      
      })
    }
  
  
  }
  