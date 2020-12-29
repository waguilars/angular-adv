import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  // public menuItems: any[];
  public user: User;

  constructor(
    public sidebarService: SidebarService,
    private userSV: UserService
  ) {
    // this.menuItems = sidebarService.menu;
    this.user = this.userSV.user;
    // console.log(this.menuItems);
  }

  ngOnInit(): void {}
}
