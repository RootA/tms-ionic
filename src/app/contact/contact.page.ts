import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { from } from 'rxjs';


@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage {
  user_types: any;
  categories: any;

  account = {
      "first_name" : "",
      "last_name" : "",
      "email" : "",
      "phone_number" : "",
      "user_type" : "",
      "company_name" : " ",
      "category_id" : "",
      "address" : "",
      "description" : ""
  }

  credentials = {
    "email" : "",
    "password" : ""
  }

  constructor(public httpClient: HttpClient, private route: ActivatedRoute, public loadingController: LoadingController, public toastController: ToastController){
    let url = 'http://0.0.0.0:5000/api/v1/usertypes'
    this.httpClient.get(url).subscribe(data => {this.user_types = data;});

    let url1 = 'http://0.0.0.0:5000/api/v1/'
    this.httpClient.get(url1).subscribe(data => {this.categories = data;});
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: color,
    });
    toast.present();
  }

  login(form) {
    // make a post request 
    if (from == null){
      console.log('we are here');
      this.presentToast('Email or Password is not provided', 'warning');
    } else {
      let url = 'http://0.0.0.0:5000/api/v1/login'
      var headers = new HttpHeaders();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new HttpRequest("JSONP", url, this.credentials, {headers: headers});

      this.httpClient.post(url, this.credentials, options).subscribe(data => {
        this.presentToast('Welcome, '+(data.full_name), 'success');
      }, error => {
        this.presentToast('Invalid Credentials', 'warning');
      });
    }
  }

  signUp(form) {
    // make a post request 
    let url = 'http://0.0.0.0:5000/api/v1/signup'
    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new HttpRequest("JSONP", url, this.account, {headers: headers});

    this.httpClient.post(url, this.account, options).subscribe(data => {
      console.log(data['_body'])
    }, error => {console.log(error)});
  }
}
