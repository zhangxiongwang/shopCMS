import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../service/http.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-updateorder',
  templateUrl: './updateorder.component.html',
  styleUrls: ['./updateorder.component.css']
})
export class UpdateorderComponent implements OnInit {
  orderid: string;
  orders: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, private toast: ToastrService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.orderid = queryParams.id;
      this.init(parseInt(this.orderid));
    });
  }

  // 初始化数据
  init(id) {
    console.log(id);
    this.http.httpGet('/getOrderById', { id: id }, val => {
      this.orders = val.data;
      console.log(this.orders)
    })
  }

  update() {
    let v = this.orders;
    console.log(v);
    if (v.number > 0 && v.price > 0) {
      this.http.httpPost('/saveOrder', [v], val => {
        if (val.data == '保存成功') {
          this.toast.success('更新成功');
          this.router.navigate(['home/order'])
        } else {
          this.toast.warning('更新失败');
        }
      })
    } else {
      this.toast.warning('价格和数量不能为空，并且必须大于0');
    }
  }

  // 返回上一页
  goback() {
    this.router.navigate(['home/order']);
  }
}

