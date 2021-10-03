import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../../Sevices/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../../Sevices/user.service';
import { User } from '../../Models/user';
import { RoleService } from '../../Sevices/role.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any;
  roles: any;
  deleteUser: any;
  userEdit: any;

  constructor(
    private roleService: RoleService,
    private router: Router,
    private userService: UserService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.getUsers();
      this.getRoles();
    } else {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }
  }
  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public getRoles(): void {
    this.roleService.getRoles().subscribe(
      (response: any[]) => {
        this.roles = response;
        console.log(this.roles);
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  public OnDeleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      (response: any) => {
        console.log(response);
        //this.delay(1000);
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  public OnEditUser(userEdit: User): void {
    const edition = {
      id: userEdit.code,
      login: userEdit.login,
      password: userEdit.password,
    };
    console.log(userEdit);
    this.userService.updateUser(edition, userEdit.code).subscribe(
      (response: any) => {
        console.log(response);
        this.delay(1000);
        if (userEdit.roles) {
          this.userService
            .clearRoles(userEdit.code)
            .subscribe((response: any) => {
              console.log(response);
              this.delay(1000);
              userEdit.roles.forEach((roleId: any) => {
                this.userService
                  .linkUserToRole(userEdit.code, roleId)
                  .subscribe((response: any) => {
                    console.log(response);
                  });
                this.delay(500);
                window.location.reload();
              });
            });
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  public onOpenModal(user: any, mode: string): void {
    const container = document.getElementById('participantContainer');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    if (mode === 'edit') {
      this.userEdit = user;
      button.setAttribute('data-target', '#editUserModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
