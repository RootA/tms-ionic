import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpErrorResponse,  } from '@angular/common/http';
import { AlertController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage{
  public tenders: any;
  public tenderDetails: any;

  constructor(public httpClient: HttpClient, private navCtrl: NavController){
    let url = 'http://0.0.0.0:5000/api/v1/tenders'
      this.httpClient.get(url).subscribe(data => {this.tenders = data});
  }

  openDetails(public_id){
    this.navCtrl.navigateForward(`/tender/${public_id}`);
  }

  getData(refresher){
    let url = 'http://0.0.0.0:5000/api/v1/tenders'
    this.httpClient.get(url).subscribe(data => {this.tenders = data});
    refresher.target.complete();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getData(refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.target.complete();
    }, 2000);
  }


}