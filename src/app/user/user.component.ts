import { Component, OnInit } from '@angular/core';
import {HttpService} from "../service/http.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  page: any[] = [];
  totalNum: number; //总数据条数
  pageSize: number; //
  pageData: number;//  每页显示条数
  curPage: number;//当前页码
  constructor(private  http:HttpService) { }

  ngOnInit() {
    this.getUser(0);
  }
  getUser(page) {
    let params = {
      pageNo: page,
      pageSize: 10
    }
    this.http.httpGet('/getUser', params, val => {
      this.page = val.content;
      this.pageData = val.numberofElements;
      this.curPage = page + 1;
      this.totalNum = val.totalElements;
    })
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    this.getUser(event.page - 1);
  }
}
