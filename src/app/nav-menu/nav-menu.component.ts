import {Component, OnInit} from '@angular/core';
import {MenusService} from '../service/menus.services';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  menus = [];

  constructor(private _menusService: MenusService) {
  }

  ngOnInit() {
    this._menusService.getMenu().subscribe(data => {
      this.menus = data;
    });
  }
}
