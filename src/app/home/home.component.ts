import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menu = [{
    title: '商品管理',
    _open: true, //默认打开第一级
    items: [{
      title: '所有商品',
      items: [
        {
          name: '1.1.1',
          title: 'xxx',
          items: []
        }
      ]
    }, {
      title: '新增商品',
      items: []
    }
    ]
  }, {
    title: '订单管理',
    _open: false, //默认打开第一级
    items: [{
      title: '所有订单',
      items: [
        {
          name: '1.1.1',
          title: 'xxx',
          items: []
        }
      ]
    }, {
      title: '新增订单',
      items: []
    }
    ]
  }]

  constructor() {
  }

  ngOnInit() {
  }

}
