import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../../service/token.service";
import {flatMap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name = '';
  avatar = '';
  checkLogin = false;
  checkRole = false;

  constructor(private tokenService: TokenService,
              private router:Router) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.name = this.tokenService.getName();
      this.avatar = this.tokenService.getAvatar();
      this.checkLogin = true;
    }
    if (JSON.stringify(this.tokenService.getRole()) == JSON.stringify(['ADMIN'])){

        this.checkRole = true;
    }
    console.log(this.tokenService.getRole())
  }

  logOut() {
    sessionStorage.clear();
    window.location.reload();
  }
}
