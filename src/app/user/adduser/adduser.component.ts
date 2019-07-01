import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {HttpService} from "../../service/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  public form: FormGroup;
  username: any;
  password: any;
  requirePassword: any;
  nickname: any;
  sex: string = '男';

  constructor(private formBuilder: FormBuilder, private  toast: ToastrService, private http: HttpService,private router:Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      requirePassword: ['', Validators.compose([Validators.required])],
      nickname: ['', Validators.compose([Validators.required])],
      sexs: ['', Validators.compose([Validators.required])]
    });
  }

  save() {
    let usr = {
      username: this.form.get('username').value,
      password: this.form.get('password').value,
      nickname: this.form.get('nickname').value,
      sex: this.sex
    }
    if (usr.password == this.form.get('requirePassword').value) {
      this.http.httpPost('/newUser', usr, val => {
        if (val.data == '注册成功') {
          this.toast.success(val.data);
          this.router.navigate(['/home/user'])
        } else {
          this.toast.warning(val.data);
        }
      })
    } else {
      this.toast.error('两次密码输入不一致');

    }
    console.log(usr);
  }

}
