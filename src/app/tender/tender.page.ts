import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { NavController } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.page.html',
  styleUrls: ['./tender.page.scss'],
})

export class TenderPage implements OnInit {
  tender: any;

  constructor(public httpClient: HttpClient, private navCtrl: NavController, private apiService: ApiService, private route: ActivatedRoute,
    private router: Router){
  }

  ngOnInit(){
    let tenderId = this.route.snapshot.paramMap.get('id');
    console.log('tenderId', tenderId);
    this.openDetails(tenderId);
  }

  openDetails(public_id){
    let url = `http://0.0.0.0:5000/api/v1/tenders/${public_id}`
    this.httpClient.get(url).subscribe(data => {this.tender = data});
  }
}

