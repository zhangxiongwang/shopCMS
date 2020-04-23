import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toast: ToastrService, private router: Router, private http: HttpService) {
    const userNameFc = new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]));
    const passwordFc = new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]));

    this.loginForm = this.formBuilder.group({
      userName: userNameFc,
      password: passwordFc
    });
  }

  ngOnInit() {
  }

  login() {
    let usr = {
      username: this.loginForm.get('userName').value,
      password: this.loginForm.get('password').value
    }
    this.http.httpPost('/login', usr, val => {
      console.log(val);
      this.toast.success('登录成功');
      this.router.navigate(['/home'])
    })
  }
}
