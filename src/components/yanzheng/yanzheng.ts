import { Component,Input, Output ,EventEmitter, OnChanges} from '@angular/core';
import { Appconfig } from '../../providers/baseservice/app.config';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';

/**
 * Generated class for the YanzhengComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare var $: any;
@Component({
  selector: 'yanzheng',
  templateUrl: 'yanzheng.html'
})
export class YanzhengComponent implements OnChanges {
  ngOnChanges(): void {
    // setTimeout(() => {
      this.baseImgUrl=this.baseImg+'index.php/index/login/imgimg/tel/'+this.tel+'?d='+Math.random();
    // }, 500);
    
  }
  
 
  @Input()tel; 
  @Output() yanNum=new EventEmitter();
   
  text: string;
  yanN='';
  baseImg=Appconfig.baseImgUrl2;
  baseImgUrl="";
  // http://58.49.114.94:33333/index.php/index/login/imgimg/tel/13454546565?d=0.8779060771299356
  constructor(public http: BaseserviceProvider) {
////console.log('Hello YanzhengComponent Component');
    this.text = 'Hello World';
 
  }
  changImg(){
    let _this=this;
    this.baseImgUrl=this.baseImg+'index.php/index/login/imgimg/tel/'+this.tel+'?d='+Math.random();
    // $.post(Appconfig.getBaseUrl()+"login/imgimg", function(data) {
    //   _this.baseImgUrl=data;
    // });
    // this.http.httpPost("login/imgimg", {
    // }, (data) => {
    //   this.baseImgUrl=data;
    
    // })
  }
   //输入
   getYan(event){
    this.yanNum.emit(event.target.value);
  }
}

export class Imgdata{
  
}
