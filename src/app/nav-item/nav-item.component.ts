import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {MenusService} from '../service/menus.services';
@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css'],
  animations: [
    trigger('inOut', [
      state('out', style({opacity: 0, height: 0})),
      transition('void => *', [
        style({opacity: 0, height: 0}),
        animate(150, style({opacity: 1, height: '*'}))
      ]),
      transition('* => void', [
        style({opacity: 1, height: '*'}),
        animate(150, style({opacity: 0, height: 0}))
      ])
    ])
  ]
})
export class NavItemComponent implements OnInit {
  startExpand = []; // 保存刷新后当前要展开的菜单项
  targetUrl = ""; // 保存目标 URL，即当前 url，通过它来定位当前菜单高亮
  source = [];
  sourceItem = "";
  @Input() menu; // 接收父组件传入的值
  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _MenusService: MenusService) {
  }

  ngOnInit() {
    this._MenusService.getMenu().subscribe(data => {
      this.source = data;
      this.setCurrentMenu();
    });
  }

// 展开并设置当前菜单高度
  setCurrentMenu() {
// console.log(this._router);
    this.targetUrl = this._router.url; // 获取当前url
    this.targetUrl = this.targetUrl.substr(1, this.targetUrl.length); // 处理获取的 url, 即截掉 url 前的 “ /”
    this.setExpand(this.source);
  }

  setExpand(source) {
    for (var i = 0; i < source.length; i++) {
      this.sourceItem = JSON.stringify(source[i]); // 把菜单项转为字符串
      if (this.sourceItem.indexOf(this.targetUrl) > -1) { // 查找当前 URL 所对应的子菜单属于哪一个祖先菜单
        if (source[i].type === 'button') { // 一级导航为展开按钮
          this.startExpand.push(source[i]);
          source[i].isSelected = true;
          source[i].expand = true; // 设置为展开
// 递归下一级菜单，以此类推
          this.setExpand(source[i].subMenu);
        }
        break;
      }
    }
  }

  toggleSubMenu(menuItem) {
    if (menuItem.type === 'link') {
// 去掉刷新后展开菜单的高亮（如果有的话）
      if (this.startExpand.length > 0) {
        for (var i = 0; i < this.startExpand.length; i++) {
          delete this.startExpand[i].isSelected;
        }
      }
      this.targetUrl = menuItem.url;
      this.setExpand(this.source);
      this.startExpand = [];
    }
    menuItem.expand = !menuItem.expand;

  }
}
