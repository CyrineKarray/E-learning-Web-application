import { Component, OnInit } from '@angular/core';
import { Role } from '../../Models/role';
import { RoleService } from '../../Sevices/role.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../Sevices/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  title = 'formation';
  public roles: Role[] = [];
  public editRole!: Role;
  public deleteRole: any;
  constructor(
    private roleService: RoleService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.getRoles();
    } else {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }
  }
  public getRoles(): void {
    this.roleService.getRoles().subscribe(
      (Response: Role[]) => {
        this.roles = Response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  public onAddRole(addForm: NgForm): void {
    document.getElementById('add-role-form')?.click();
    this.roleService.addRole(addForm.value).subscribe(
      async(response: Role) => {
        console.log(response);
        this.toastr.success("Role ajouté avec succès!","Félicitations")
        await this.delay(2510);
        window.location.reload();
        this.getRoles();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message,"Une erreur s'est produite :(");
        addForm.reset();
      }
    );
  }

  public onUpdateRole(roleId: any, role: Role): void {
    this.roleService.updateRole(roleId, role).subscribe(
      (response: Role) => {
        console.log(response);
        this.getRoles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteRole(roleId: number): void {
    this.roleService.deleteRole(roleId).subscribe(
      (response: void) => {
        console.log(response);
        this.getRoles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(role: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addRoleModal');
    }
    if (mode === 'edit') {
      this.editRole = role;
      button.setAttribute('data-target', '#updateRoleModal');
    }
    if (mode === 'delete') {
      this.deleteRole = role;
      button.setAttribute('data-target', '#deleteRoleModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
