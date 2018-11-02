import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';

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
    let url = `http://0.0.0.0:5000/api/v1/tenders/${public_id}`
    this.httpClient.get(url).subscribe(data => {this.tenderDetails = data});
    this.navCtrl.navigateForward(`/tender`);
    console.log(this.tenderDetails);
  }

  openPerson(index) {
    this.navCtrl.navigateForward(`/tender/${index}`);
  }
}