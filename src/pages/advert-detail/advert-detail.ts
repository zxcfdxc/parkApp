import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ToolsProvider } from '../../providers/tools/tools';
// import { BaseserviceProvider } from '../../providers/baseservice/baseservice';

/**
 * Generated class for the AdvertDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-advert-detail',
  templateUrl: 'advert-detail.html',
})
export class AdvertDetailPage {
  browser: any = {
    isLoaded: false, // 网页是否被加载
    proObj: null, // 进度条对象
    progress: 0, // 网页访问的进度条
    secUrl: '', // 安全链接
    title: '加载中',
    url: '',
    share: null // 是否具有分享功能（传递一个分享对象ShareModel过来）
  };

  shareConfig: any = {
    isShow: false
  }; // 分享控制的配置

  constructor(
    public tools:ToolsProvider,
    public navCtrl: NavController,
              private params: NavParams,
              private sanitizer: DomSanitizer,
              private popoverCtrl: PopoverController) {
    let browser = this.params.get('browser');
    if(browser) {
      this.browser.title = browser.title;
      this.browser.url = browser.url;
      this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(browser.url);

      if(browser.share) {
        this.browser.share = browser.share;
      }

    } else {
      this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.browser.url);
    }
//     let ifram = document.getElementById('iframe');
// if (navigator.userAgent.match(/iPad|iPhone/i)) {
//   let iframe_box = document.getElementById('iframeMain');
//////console.log(iframe_box)
//   // iframe_box.style.width = 100 + '%';
//   // iframe_box.style.overflowX = 'hidden';
//   // iframe_box.style.overflowY = 'scroll';
//   // iframe_box.style.webkitOverflowScrolling = 'touch';
//   ifram.setAttribute('scrolling', 'no');
//   iframe_box.appendChild(ifram)
// }
    this.reload();
  }

  ionViewDidLoad() {
    this.resiveMsg();
    this.sentMsg(this.tools.get("loginId"))
    if(!this.browser.proObj) {
      this.browser.proObj = document.getElementById('progress');
    }
    this.onprogress();
  }

  private resiveMsg(){
    // var resTime;
    window.addEventListener('message', (event) =>{//接收iframe中发送过来的数据（详细用法请直接百度）
  ////console.log(event.data);//这个接收到的data就是在iframe中发送过来那个data 
      let data=event.data
      if(data.type==1){
             if(this.tools.isLoginGo(this.navCtrl)){
              this.sentMsg(this.tools.get("loginId"))
             }
      }     
    },false)
  }
  private sentMsg (name?,type?) {
    
    
    var data = {
      uid: name||'名字',
      type: type||'1'
    }//定义要发送到ionic的数据对象

      var frame, cont;
  
      // Firstly, get the iframe
      frame = document.getElementById('iframe');
  ////console.log(frame);
      // In some versions of IE, frame.document is the document the iFrame 
      // is in, not the document in the iFrame. Also, some browsers
      // use contentWindow and others contentDocument.
      // In some browsers, contentDocument points to the iFrame window,
      // in others to the document, so...
      if (frame) {
          cont = frame.contentWindow || frame.contentDocument;
  
          // cont might be the iFrame window or the document
          cont.postMessage(data, '*');//创建向ionic代码中发送的事件
      }
  
     
    
  }


  // 生成随机数
  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // 网页访问进度
  private onprogress() {
    // 随机时间
    let timeout = this.random(10, 30);

    let timer = setTimeout(() => {
      if(this.browser.isLoaded) {
        this.browser.proObj.style.width = '100%';
        clearTimeout(timer);
        return;
      }

      // 随机进度
      this.browser.progress += this.random(1, 5);

      // 随机进度不能超过 90%，以免页面还没加载完毕，进度已经 100% 了
      if(this.browser.progress > 90){
        this.browser.progress = 90;
      }

      this.browser.proObj.style.width = this.browser.progress + '%';
      this.onprogress();
    }, timeout);
  }

  // 如果iframe页面加载成功后
  loaded() {
    this.browser.isLoaded = true;
  }

  // 显示Popver选项
  presentPopover(myEvent) {
    let cb = {
      refresh: () => {
        this.reload();
      },
      close: () => {
        this.navCtrl.pop();
      },
      share: null
    };

    if(this.browser.share) {
      cb.share = () => {
        this.share();
      }
    }

    let popover = this.popoverCtrl.create("BrowserPopoverPage", {
      callback: cb
    });
    popover.present({
      ev: myEvent
    });
  }

  // 重新加载页面
  reload() {
    let title = this.browser.title;
    let url = this.browser.secUrl;
    this.browser.title = '加载中';
    this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

    setTimeout(() => {
      this.browser.isLoaded = false;
      this.browser.progress = 0;
      if(!this.browser.proObj) {
        this.browser.proObj = document.getElementById('progress');
      }
      this.onprogress();
      this.browser.title = title;
      this.browser.secUrl = url;
    }, 10);
  }

  // 分享页面（作为popover的回调）
  share() {
    this.shareConfig.isShow = true;
    /*if(this.browser.share) {
      SocialSharing.share(this.browser.share.title, this.browser.share.content, '', this.browser.share.url).then(() => {

      }, (err) => {
        // Error!
        alert('错误：分享失败！' + err);
      });
    }*/
  }
}
