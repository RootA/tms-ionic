import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';


@Component({
  selector: 'app-application',
  templateUrl: './application.page.html',
  styleUrls: ['./application.page.scss'],
})
export class ApplicationPage implements OnInit {

  tenderId: any;
  sessionId: any;
  bid: any;

  constructor(public httpClient: HttpClient, private route: ActivatedRoute, private storage: Storage, public toastController: ToastController) { }

  ngOnInit() {
    this.tenderId = this.route.snapshot.paramMap.get('id');
    this.getSessionID();
    this.bid = {
      "tender_id" : this.tenderId,
      "duration" : "",
      "amount" : "",
      "session_id" : ""
    }
  }
  async presentToast(message, color1) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: 'success',
    });
    toast.present();
  }

  getSessionID(){
    this.storage.get('public_id').then((public_id) => {
      this.bid.session_id =  public_id;
    });
  }

  createBid(form){
    if(this.bid.duration == "" || this.bid.amount == ""){
      this.presentToast('Amount or Duration is not provided', 'warning');
    } else {
      let url = 'http://0.0.0.0:5000/api/v1/bid'
      var headers = new HttpHeaders();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new HttpRequest("JSONP", url, this.bid, {headers: headers});

      this.httpClient.post(url, this.bid).subscribe(data => {
        this.presentToast(data.message, 'success');
      }, error => {
        this.presentToast('Something went wrong, try again later', 'warning');
      });
    }
  }
}
