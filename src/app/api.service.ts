import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, switchMap } from 'rxjs/operators';
import { AlertController, NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public tender: any;
  constructor(public http: HttpClient, private navCtrl: NavController) {
  }

  // openDetails(public_id){
  //   let url = `http://0.0.0.0:5000/api/v1/tenders/${public_id}`
  //   this.http.get(url).subscribe(data => {this.tender = data});
  //   this.navCtrl.navigateForward(`/tender/${public_id}`);
  //   console.log('tender for ApiService',this.tender);
  // }
}
