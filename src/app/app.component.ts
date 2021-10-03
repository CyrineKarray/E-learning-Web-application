import { Component } from '@angular/core';
import { TokenStorageService } from './Sevices/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private roles!: string[];
  isLoggedIn = false;
  /*showAdminBoard = false;
  showModeratorBoard = false;*/
  username!: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorageService.getUser().username;
    } else {
      this.router.navigate(['/login']);
    }
    /*if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      user.roles.forEach(element => {
        this.showAdminBoard = element.name.includes('ADMIN');
        this.showModeratorBoard = this.roles.includes('MODERATOR');
      });
      this.username = user.username;
    }*/
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
