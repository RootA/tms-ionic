import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { from } from 'rxjs';
import { Storage } from '@ionic/storage';

declare var require: any;
const localforage: LocalForage = require("localforage");

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage {
  user_types: any;
  categories: any;
  public is_logged_in: any;
  

  signupcard: any;
  accountcard: any;
  logincard: any;

  account_details: any;

  auth_token = this.storage.get('auth_token');

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

  constructor(public httpClient: HttpClient, private storage: Storage, public loadingController: LoadingController, public toastController: ToastController){
    this.getSessionID();
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
        this.getAccountDetails();
        this.accountcard=true;
      }else{
        this.logincard=true;
      }
    });
  }

  getSessionID2(refresher){
    this.storage.get('public_id').then((public_id) => {
      if(public_id != null){
        this.getAccountDetails();
        this.accountcard=true;
        refresher.target.complete();
      }else{
        this.logincard=true;
        refresher.target.complete();
      }
    });
  }

  getAccountDetails(){
    this.account_details = {
      'full_name': this.storage.get('full_name'),
      'user_type': this.storage.get('user_type'),
      'phone_number' : this.storage.get('phone_number'),
      'email' : this.storage.get('email'),
      'company_name' : this.storage.get('company_name')
    }
  }

  showSignup(){
    this.logincard = false;
    this.signupcard = true;
    let url = 'http://0.0.0.0:5000/api/v1/usertypes'
    this.httpClient.get(url).subscribe(data => {this.user_types = data;});

    let url1 = 'http://0.0.0.0:5000/api/v1/'
    this.httpClient.get(url1).subscribe(data => {this.categories = data;});
  }

  showLogin(){
    this.logincard = true;
    this.signupcard = false;
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
    if (this.credentials.email == "" && this.credentials.password == ""){
      this.presentToast('Email or Password is not provided', 'warning');
    } else {
      let url = 'http://0.0.0.0:5000/api/v1/login'
      var headers = new HttpHeaders();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new HttpRequest("JSONP", url, this.credentials, {headers: headers});

      this.httpClient.post(url, this.credentials).subscribe(data => {
      this.presentToast('Welcome, '+(data.full_name), 'success');

      this.storage.set('auth_token', data.auth_token);
      this.storage.set('user_type', data.user_type);
      this.storage.set('public_id', data.public_id);
      this.storage.set('type_id', data.type_id);
      this.storage.set('full_name', data.full_name);
      this.storage.set('company_name' , data.company_name);
      this.storage.set('email' , data.email);
      this.storage.set('phone_number' , data.phone_number);

      this.getAccountDetails();

      this.accountcard = true;
      this.logincard = false;
      this.is_logged_in = true;

      }, error => {
        this.presentToast(error, 'warning');
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

    this.httpClient.post(url, this.account).subscribe(data => {
      console.log(data['_body'])
    }, error => {console.log(error)});
  }

  signOut(){
    this.accountcard = false;
    this.logincard = true;
    this.storage.clear()
  }
}
