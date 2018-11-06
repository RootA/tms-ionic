import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { NavController } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { ContactPage } from '../contact/contact.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.page.html',
  styleUrls: ['./tender.page.scss'],
})

export class TenderPage implements OnInit {
  tender: any;
  auth_token: any;
  is_logged_in: any;
  is_not_logged_in: any;


  constructor(public httpClient: HttpClient, private navCtrl: NavController,private storage: Storage, private route: ActivatedRoute, private router: Router){
  }

  ngOnInit(){
    this.getSessionID();
    let tenderId = this.route.snapshot.paramMap.get('id');
    this.openDetails(tenderId);
  }

  Apply(public_id){
    this.navCtrl.navigateForward(`/application/${public_id}`);
  }

  openDetails(public_id){
    let url = `http://0.0.0.0:5000/api/v1/tenders/${public_id}`
    this.httpClient.get(url).subscribe(data => {this.tender = data});
  }

  getSessionID(){
    this.storage.get('public_id').then((public_id) => {
      console.log('id' , public_id);
      if(public_id != null){
        this.is_not_logged_in=false;
      }else{
        this.is_not_logged_in=true;
      }
    });
  }

  checkIfLoggedIn(){
    this.auth_token = this.storage.get('auth_token');
    console.log('auth_token', this.auth_token);
    if(this.auth_token){
      this.is_logged_in=true;
    } else{
      this.is_not_logged_in=true;
    }
  }
}

