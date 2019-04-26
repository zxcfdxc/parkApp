import { Component, Input, OnInit, Output, EventEmitter, DoCheck, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';
import { ToolsProvider } from '../../providers/tools/tools';

/**
 * Generated class for the PMessComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare var $: any;
@Component({
  selector: 'p-mess',
  templateUrl: 'p-mess.html'
})
export class PMessComponent  implements AfterContentInit {
  
  @Input()telN:any;
@Input()eleId:any;
@Input()reqType:any;
@Output()yanN=new EventEmitter();

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.squares();
    }, 10);
   
  }

  sec = 60;
  page = {
    tel:this.telN,//手机号
    key: "",//密码
    inType: "password",//是否看密码
    key2: "",//密码
    inType2: "password",//是否看密码
    lessSec: this.sec,//剩余秒数
    isSent: false,//是否发送
    yanKey: "",//验证码
    saveYan:"",//返回验证码
    imgKey:"",
    timeCleanY:null,
    interCleanY:null,
    rId:"aa"+Math.floor(Math.random()*10000000)
  };
  miForm = new FormGroup({
    passMi: new FormControl()
  });

  constructor( public http: BaseserviceProvider, public tools: ToolsProvider ) {
////console.log(this.telN,this.telN)

  }
 

  //图像验证
  imgVer(){
    this.http.httpPost("login/sdfdsf", {
      captcha: this.page.imgKey,
    }, (data) => {
  
    
    })
  }
   // 验证
   sendMsg() {
////console.log(this.telN,this.telN)
    if(!this.tools.isPoneAvailable(this.telN )){
     this.tools.showToast("请您输入正确手机号")  
      return;
    }
    if(this.page.interCleanY)clearInterval(this.page.interCleanY);
    this.page.interCleanY=setInterval(() => {
      this.page.lessSec--;
      if (this.page.lessSec < 1) {
        this.page.isSent = false;
        this.page.lessSec == this.sec;
       
        return;
      }
    }, 1000)
      var api = 'login/MSGsedout';
     var upData={
      tel: this.telN,
      
      captcha:this.page.imgKey
    }
    if(this.reqType){
         upData["type"]=this.reqType;
    }

    this.http.httpPost(api, upData, (data) => {
  ////console.log(data);
     
      if (data.code == 'success') {
        this.page.isSent = true;
        this.page.lessSec = this.sec;
        //清理timeout
        if(this.page.timeCleanY){
          clearTimeout(this.page.timeCleanY);
        }
        this.page.timeCleanY=setTimeout(() => {
          this.page.saveYan=null;
        }, 3*60*1000);
        this.page.saveYan=data.codenum;
        this.yanN.emit(this.page);
        this.tools.showToast(data.info);
        
      } else {
        // this.tools.showToast("发送失败");
      }
    
    
    })

  }
  //过滤
  filtNum(event,data){
    this.page[data]=(event.target.value+"").replace(/\D/g,'');
    this.yanN.emit(this.page);
  }
  filtKey(event,data){
    this.page[data]=(event.target.value+"").replace(/[\W]/g,'');
  }

   // 方框
   squares() {
 ////console.log(this.eleId);
     
    // var ele=this.squaresInput.nativeElement;
    var inlength = 5;
    var idAdd= '.'+this.page.rId+" ";
    var inputDom = $(idAdd+'.Jpass');//密码框
    var spanDoms = $(idAdd+'.pass-form span');//光标span
    var faguang = $(idAdd+'.Jfaguang');//发光外框
////console.log(idAdd+'.Jpass');
////console.log(inputDom);
    this.miForm.get("passMi").valueChanges.subscribe(data => {
  ////console.log(data);
  ////console.log(this.eleId);
      
      var curInputLen = inputDom.val().length;//输入的文本内容长度
      for (var j = 0; j < inlength; j++) {
        spanDoms.eq(j).html(inputDom.val().charAt(j));
        //////console.log(inputDom.val());

        spanDoms.eq(j).removeClass('active');
        if (curInputLen == 0 && inlength == 12) {

        } else {
          spanDoms.eq(curInputLen).addClass('active');
        }

        faguang.css({
          left: curInputLen * 30 + 'px'
        });
      }

      if (curInputLen === inlength) {
        spanDoms.eq(inlength - 1).addClass('active');
        faguang.css({
          left: (inlength - 1) * 30 + 'px'
        });
        spanDoms.css({
          background: "none!important"
        })

      }

    });
    inputDom.on('focus blur ', function (e) {
      e = e ? e : window.event;
      e.stopPropagation();
      if (e.type === 'focus') {
        var _currFocusInputLen = this.value.length === inlength ? (inlength - 1) : this.value.length;
        spanDoms.eq(_currFocusInputLen).addClass('active');
        faguang.css({ left: _currFocusInputLen * 30 + 'px', opacity: 1 });
      } else if (e.type === 'blur') {
        var _currBlurInputLen = this.value.length === inlength ? (inlength - 1) : this.value.length;
        spanDoms.eq(_currBlurInputLen).removeClass('active');
        faguang.css({ opacity: 0 });
      }
    });
  }

}
