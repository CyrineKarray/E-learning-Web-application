import { Component, OnInit } from '@angular/core';
import { Domain } from '../../Models/domain';
import { DomainService } from '../../Sevices/domain.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../Sevices/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css'],
})
export class DomainComponent implements OnInit {
  title = 'formation';
  public domains: Domain[] = [];
  public editDomain!: Domain;
  public deleteDomain: any;
  constructor(
    private domainService: DomainService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.getDomains();
    } else {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }
  }
  public getDomains(): void {
    this.domainService.getDomains().subscribe(
      (Response: Domain[]) => {
        this.domains = Response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  public onAddDomain(addForm: NgForm): void {
    document.getElementById('add-domain-form')?.click();
    this.domainService.addDomain(addForm.value).subscribe(
     async (response: Domain) => {
        console.log(response);
        this.toastr.success("Domaine ajouté avec succès!","Félicitations")
        await this.delay(2510);
        window.location.reload();
        this.getDomains();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message,"Une erreur s'est produite :(");
        addForm.reset();
      }
    );
  }

  public onUpdateDomain(domainId: any, domain: Domain): void {
    this.domainService.updateDomain(domainId, domain).subscribe(
      (response: Domain) => {
        console.log(response);
        this.getDomains();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteDomain(domainId: number): void {
    this.domainService.deleteDomain(domainId).subscribe(
      (response: void) => {
        console.log(response);
        window.location.reload();
        this.getDomains();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(domain: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addDomainModal');
    }
    if (mode === 'edit') {
      this.editDomain = domain;
      button.setAttribute('data-target', '#updateDomainModal');
    }
    if (mode === 'delete') {
      this.deleteDomain = domain;
      button.setAttribute('data-target', '#deleteDomainModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
