import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ToastController, NavController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage implements OnInit {
  tenders: any;
  data: any;
  sessionId: any;

  constructor(public httpClient: HttpClient, private storage: Storage, public toastController: ToastController, private route: ActivatedRoute, public navCtrl: NavController){}

  ngOnInit(){
    this.getSessionID();
  }


  async presentToast(message, color1) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: 'warning',
    });
    toast.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getSessionID2(refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.target.complete();
    }, 2000);
  }

  getSessionID(){
    this.storage.get('public_id').then((public_id) => {
      console.log('id' , public_id);
      if(public_id != null){
        this.sessionId =  public_id;
        this.getMyTenders();
      }else{
        this.data = false;
        this.presentToast('You need to login first', 'warning');
      }
    });
  }
  getSessionID2(refresher){
    this.storage.get('public_id').then((public_id) => {
      console.log('id' , public_id);
      if(public_id != null){
        this.sessionId =  public_id;
        this.getMyTenders();
        refresher.target.complete();
      }else{
        this.data = false;
        this.presentToast('You need to login first', 'warning');
        refresher.target.complete();
      }
    });
  }
  getMyTenders(){
    let url = 'http://0.0.0.0:5000/api/v1/my/tenders/'+this.sessionId
    console.log(url);
    this.httpClient.get(url).subscribe(data => {this.tenders = data; this.data=true});
  }
}
