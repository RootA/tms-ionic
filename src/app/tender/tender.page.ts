import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { AlertController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-tender',
  templateUrl: './tender.page.html',
  styleUrls: ['./tender.page.scss'],
})

export class TenderPage {
  tender: any;
  constructor(public httpClient: HttpClient, private navCtrl: NavController){
  }

  openDetails(public_id){
    let url = `http://0.0.0.0:5000/api/v1/tenders/${public_id}`
    this.httpClient.get(url).subscribe(data => {this.tender = data});
    this.navCtrl.navigateForward(`/tender`);
    console.log('tender', this.tender);
  }
}

// export class TenderPage implements OnInit {
//   tender: any;

//   constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

//   ngOnInit() {
//     this.route.paramMap
//       .pipe(
//         switchMap((params: ParamMap) => this.apiService.openDetails(params.get('public_id')))
//       ).subscribe(tender => {
//       this.tender = tender;
//     });
//   }

// }
