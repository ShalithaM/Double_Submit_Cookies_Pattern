import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  fundjson = {csrf: '', amount: 0};
  cookieValue= '';
  csrftoken='';
  response;
  ngOnInit() {
    this.cookieValue = this.cookieService.get('SessionID');
    this.csrftoken = this.cookieService.get('CSRF');
  }

  transfer() {
    this.http.post('http://localhost:3000/transfer', {
      amount: this.fundjson.amount,
      token: this.csrftoken
    }, {headers: new HttpHeaders().set('SID', this.cookieValue).set('csrf', this.csrftoken)}).subscribe(
      res => {
        let data;
        data = res
        this.response = data.result;
        console.log(res);
      },
      err => {
          console.log(err);
      }
  )
  }

}
