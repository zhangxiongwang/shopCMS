import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {HttpService} from "../../service/http.service";
import {Cloth} from '../shop'
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-addshop',
  templateUrl: './addshop.component.html',
  styleUrls: ['./addshop.component.css']
})
export class AddshopComponent implements OnInit {

  form: FormGroup;
  categories: any;
  category: any;

  constructor(private formBuilder: FormBuilder, private  toast: ToastrService, private http: HttpService, private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      shoptitle: ['', Validators.compose([Validators.required])],
      nick: ['', Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      volume: ['', Validators.compose([Validators.required])],
      picturl: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])]
    });
    this.init();
  }

  // 初始化数据
  init() {
    this.http.httpGet('/getcategories', null, val => {
      this.categories = val.data;
      this.category = this.categories[0].favoritesid;
    })
  }

  update() {
    let v: Cloth = {
      id: null,
      clickurl: '',
      itemurl: 'http://h5.m.taobao.com/awp/core/detail.htm?id=528276118820',
      nick: '',
      picturl: '',
      provcity: '',
      reserveprice: '',
      shoptitle: '',
      title: '',
      zkfinalprice: 0,
      zkfinalpricewap: 0,
      volume: 0,
      favoritesid: '',
      status: 0,
      sellerid: 0,
      numiid: 0,
      images: []
    };
    v.shoptitle = this.form.get('shoptitle').value;
    v.nick = this.form.get('nick').value;
    v.title = this.form.get('title').value;
    v.zkfinalprice = v.zkfinalpricewap = v.reserveprice = this.form.get('price').value;
    v.volume = this.form.get('volume').value;
    v.picturl = this.form.get('picturl').value;
    v.favoritesid = this.form.get('category').value;
    if(v.zkfinalprice>0 && v.volume>0){
      this.http.httpPost('/savecloth', v, val => {
        if (val.data == 'ok') {
          this.toast.success('添加成功');
          this.router.navigate(['home/shop'])
        } else {
          this.toast.warning('添加失败');
        }
      })
    }else {
      this.toast.warning('价格或者数量不能小于0');
    }

  }

}
