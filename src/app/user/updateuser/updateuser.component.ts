import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {HttpService} from "../../service/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private  toast: ToastrService, private http: HttpService, private router: Router) {
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
      oldpassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      newpassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  changePwd() {
    let usr = {
      username: this.form.get('username').value,
      oldpwd: this.form.get('oldpassword').value,
      newpwd: this.form.get('newpassword').value,
    }
    this.http.httpGet('/resetPwd', usr, val => {
      if (val.data == '修改成功') {
        this.toast.success(val.data);
        this.router.navigate(['/home/user'])
      } else {
        this.toast.error(val.data);
      }
    })
  }
}
