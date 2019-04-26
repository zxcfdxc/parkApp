import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { BaseserviceProvider } from '../../providers/baseservice/baseservice';

/**
 * Generated class for the RegisterPhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var layer:any;

@IonicPage()
@Component({
  selector: 'page-register-phone',
  templateUrl: 'register-phone.html',
})
export class RegisterPhonePage {
   tel='';
   ischeck=true;
  agreement: any;
  constructor(public tools:ToolsProvider,public navCtrl: NavController, public navParams: NavParams,public http:BaseserviceProvider,) {
  
  }
  //过滤
  filtNum(event,data){
    this.tel=(event.target.value+"").replace(/\D/g,'');
  }
  ionViewDidLoad() {
////console.log('ionViewDidLoad');
var api = 'Agreement/register';
this.http.httpPost(api, {
//  type:1
}, (data) => {
  console.log(data);
  
  if (data.code=="error") {
  }else{
    this.agreement = data;
  }
},err => {
      
  this.agreement = err.error.text;
})
    
  }
  alertHe(){
     //显示图片
    layer.open({
      type: 1,
      skin: 'layui-xie ', //样式类名
      closeBtn: 2, //不显示关闭按钮
      anim:0,
      area:['80%','80vh'],
      title: false,
      shadeClose: true, //开启遮罩关闭
      content:  this.agreement
//       `
//       <p class="center"> 车都停车用户使用协议</p>
//       <div class="content">
// 一、服务条款的确认和接纳
// 请务必认真阅读和理解本《使用协议》（以下简称《协议》）中规定的所有权利和限制。您一旦注册、登录、使用或以任何方式使用本《协议》所涉及的相关服务的行为将视为对本《协议》的接受，即表示您已阅读并同意接受本《协议》各项条款的约束。如果您不同意本《协议》中的条款，请不要注册、登录或使用本《协议》相关服务。
// <br>二、用户的帐号、密码和安全性
// 您一旦注册成为用户，您将得到一个帐号和密码。如果您未保管好自己的帐号和密码而对您、车都停车或第三方造成的损害，您将负全部责任。另外，您须对帐户中的所有活动和事件负全责。您可随时改变您的密码，也可以结束旧的帐户重开一个新帐户。您同意，若发现任何非法使用用户帐号或安全漏洞的情况，将立即通告车都停车。
// <br>三、服务内容
// <br>3.1 车都停车服务的所有权和运作权归车都停车所有。所提供的服务必须按照其发布的章程、服务条款和操作规则严格执行。
// <br>3.2 通过车都停车手机客户端或微信公众号可以注册、充值、缴纳停车费、发票申领、以及可对停车订单、充值、缴纳、退费记录进行查询和导航，还可以查看与停车相关的停车咨询等。
// <br>四、服务变更、中断或终止
// 如发生下列任何一种情形，车都停车有权在通知用户后中断或终止向用户提供本协议项下的网络服务而无需承担任何责任：
// <br>4.1 用户提供的个人资料不真实；
// <br>4.2 用户违反本协议使用规则；
// <br>4.3 如用户注册的帐号长时间未实际使用，则车都停车有权删除该帐号并停止为该用户提供相关的网络服务。
// <br>五、使用规则
// <br>5.1 用户在申请使用车都停车网络服务时，必须向车都停车提供准确的个人资料，如个人资料有任何变动，应及时更新。
// <br>5.2用或用户将其帐号、密码转让、出租、出借他人或以其他方式许可他人使用而导致任何的客户损失，车都停车不承担任何责任。
// <br>5.3 用户在使用车都停车网络服务过程中，必须遵循以下原则：
// <br>1) 遵守中国有关的法律和法规；
// <br>2) 遵守所有与网络服务有关的网络协议、规定和程序；
// <br>3) 不得为任何非法目的而使用网络服务系统；
// <br>4) 不得利用车都停车网络服务系统进行任何不利于车都停车的行为。
// <br>六、知识产权
// 车都停车提供的服务中包含的任何文本、图片、图形、音频和/或视频资料均受版权、商标和/或其它财产所有权法律的保护，未经相关权利人同意，上述资料均不得在任何媒体直接或间接发布、播放、出于播放或发布目的而改写或再发行，或者被用于其他任何商业目的。所有这些资料或资料的任何部分仅可作为私人和非商业用途而保存在某台计算机内。车都停车为提供服务而使用的任何软件（包括但不限于软件中所含的任何图象、照片、动画、录像、录音、音乐、文字和附加程序、随附的帮助材料）的一切权利均属于该软件的著作权人，未经该软件的著作权人许可，用户不得对该软件进行反向工程、反向编译或反汇编。
// <br>七、隐私保护
// <br>7.1 保护用户隐私是车都停车的一项基本政策，车都停车保证不对外公开或向第三方提供单独用户的注册资料及用户在使用网络服务时存储在车都停车的非公开内容，但下列情况除外：
// <br>1) 事先获得用户的明确授权；
// <br>2) 根据有关的法律法规要求；
// <br>3) 按照相关政府主管部门的要求；
// <br>4) 为维护社会公众的利益；
// <br>5) 为维护车都停车的合法权益。
// <br>7.2 当车都停车与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方允诺严格承担与车都停车同等的保护用户隐私的责任，则视为用户授权车都停车将包含其个人注册资料在内的相关信息提供给该第三方，但车都停车对该第三方的允诺及行为不承担保证责任。
// <br>八、免责声明
// <br>8.1 用户明确同意：因使用车都停车网络服务所存在的风险将完全由自己承担；因使用车都停车网络服务而产生的一切后果也由自己承担；车都停车对用户不承担任何责任。
// <br>8.2 车都停车不保证为向用户提供便利而设置的外部链接的准确性和完整性。同时，对于该等外部链接指向的不由车都停车实际控制的任何网页上的内容，车都停车不承担任何责任。
// <br>8.3 对于因不可抗力、政府行为、黑客攻击、计算机病毒感染或非因车都停车的原因造成的网络服务中断或其它缺陷，车都停车不承担任何责任。
// <br>九、违约赔偿
// <br>9.1 如因车都停车故意违反有关法律、法规或本协议项下的任何条款而给用户造成损失，车都停车同意承担由此造成的损害赔偿责任。
// <br>9.2 用户同意保障和维护车都停车及其他用户的合法利益，如因用户违反有关法律、法规或本协议项下的任何条款而给车都停车或任何其他第三人造成损失，用户同意承担由此造成的一切损害赔偿责任。
// <br>十、协议修改
// <br>10.1 车都停车有权随时修改本协议的任何条款，一旦本协议的内容发生变动，车都停车将会在手机客户端及微信公众号上公布，该公布行为视为车都停车已经通知用户修改内容。
// <br>10.2 如果不同意车都停车对本协议相关条款所做的修改，用户应停止使用网络服务。如果用户继续使用网络服务，则视为用户接受车都停车对本协议相关条款所做的修改。
// <br>十一、通知送达
// <br>11.1 用户如有任何事宜需通知车都停车，应当通过车都停车手机客户端及微信公众号对外正式公布的通信地址、传真号码、电子邮件地址等联系方式进行联系及送达。
// </div>
//       `
    });
  }
  pushPage(){
    if(!this.tools.isPoneAvailable(this.tel))return;
    this.navCtrl.push("RegisterPwPage",{
      tel:this.tel
    }).then(()=>{
      this.navCtrl.remove(this.navCtrl.getActive().index-1);
    })
  }
  
}
