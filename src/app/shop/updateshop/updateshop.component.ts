import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../../service/http.service";
import {Cloth} from '../shop'
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-updateshop',
  templateUrl: './updateshop.component.html',
  styleUrls: ['./updateshop.component.css']
})
export class UpdateshopComponent implements OnInit {
  clotheid: string;
  cloth: Cloth;
  categories: any;
  cates: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, private toast: ToastrService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.clotheid = queryParams.id;
      this.init(this.clotheid);
    });
  }

  // 初始化数据
  init(id) {
    this.http.httpGet('/getClothById', {id: id}, val => {
      this.cloth = val.data;
      console.log(this.cloth)
    })
    this.http.httpGet('/getcategories', null, val => {
      this.categories = val.data;
      this.cates = this.categories.favoritesid;
      console.log(JSON.stringify(this.categories) + '=========categories')
    })
  }

  update() {
    let v = this.cloth;
    console.log(v.favoritesid);
    if (v.title && v.favoritesid && v.nick && v.picturl && v.shoptitle && v.volume && v.zkfinalprice) {
      if (v.zkfinalprice > 0 && v.volume > 0) {
        this.http.httpPost('/savecloth', v, val => {
          if (val.data == 'ok') {
            this.toast.success('更新成功');
            this.router.navigate(['home/shop'])
          } else {
            this.toast.warning('更新失败');
          }
        })
      }else {
        this.toast.warning('价格或者数量不能小于0');
      }
    } else {
      this.toast.warning('请先填写必填项');
    }
  }

  // 返回上一页
  goback() {
    this.router.navigate(['home/shop']);
  }
}
