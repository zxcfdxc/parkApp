import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GuidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guide',
  templateUrl: 'guide.html',
})
export class GuidePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
////console.log('ionViewDidLoad GuidePage');
  }
  enter(){
    this.navCtrl.push("tabs").then(()=>{
      this.navCtrl.remove(this.navCtrl.getActive().index-1);
    });
  }
}
