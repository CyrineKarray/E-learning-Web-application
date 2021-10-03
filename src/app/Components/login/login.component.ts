import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Sevices/auth.service';
import { TokenStorageService } from '../../Sevices/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: any;
  username: any;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = '';
      this.tokenStorage.getUser().roles.forEach((element: any) => {
        this.roles = this.roles + element.name;
      });
      this.username = this.tokenStorage.getUser().username;
      this.router.navigate(['/participant']);
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.tokenStorage.getUser().roles.forEach((element: any) => {
          this.roles = this.roles + element.name;
        });
        this.username = this.tokenStorage.getUser();
        this.router.navigate(['/participant']).then(() => {
          window.location.reload();
        });
        //this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
