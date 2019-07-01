import {Component, OnInit, TemplateRef} from '@angular/core';
import {HttpService} from "../service/http.service";
import {ToastrService} from "ngx-toastr";
import {BsModalService, BsModalRef} from "ngx-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  page: any[] = [];
  totalNum: number; //总数据条数
  pageData: number;//  每页显示条数
  curPage: number;//当前页码
  searchTearm: any;
  modalRef: BsModalRef;
  delitem: any;

  constructor(private  http: HttpService, private toast: ToastrService, private modalService: BsModalService, private router: Router) {
  }

  ngOnInit() {
    this.getShop(0);
  }

  // 获取数据
  getShop(page) {
    this.searchTearm = null;
    let params = {
      pageNo: page,
      pageSize: 10
    }
    this.http.httpGet('/getAllOrder', params, val => {
      this.page = val.content;
      this.pageData = val.numberofElements;
      this.curPage = page + 1;
      this.totalNum = val.totalElements;
    })
  }

  // 翻页更新数据
  pageChanged(event: any): void {
    if (this.searchTearm != null) {
      this.searchOrder(event.page - 1)
    }
    this.getShop(event.page - 1);
  }

  // 搜索
  searchOrder(page) {
    if (page == null) {
      page = 0
    }
    let s = this.searchTearm;
    if (s == null || s == "") {
      if (s == '') {
        this.getShop(0);
        return
      }
      this.toast.warning('请先输入要搜索内容');
    } else {
      //请求数据
      let params = {
        description: s,
        pageNo: page,
        pageSize: 10
      }
      this.http.httpGet('/getOrderByDescription', params, val => {
        this.page = val.content;
        this.pageData = val.numberofElements;
        this.curPage = page + 1;
        this.totalNum = val.totalElements;
      })
    }
  }

  // 更新数据
  update(p) {
    this.router.navigate(['home/order/updateorder'], {queryParams: {id: p.id}})
  }

  // 删除数据
  delete(template: TemplateRef<any>, p) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.delitem = p;
  }

  confirm(): void {
    console.log(this.delitem);
    let params = {
      id: this.delitem.id
    }
    this.http.httpGet('/deleteOrderByid',params, val => {
      if (val.data == '删除成功') {
        if (this.searchTearm) {
          this.searchOrder(this.curPage - 1);
        } else {
          this.getShop(this.curPage - 1)
        }
        this.toast.success(val.data);
      } else {
        this.toast.warning(val.data);
      }
      this.modalRef.hide();
    })
  }

  decline(): void {
    this.modalRef.hide();
  }

}
