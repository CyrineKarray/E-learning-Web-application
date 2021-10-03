import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Formateur} from 'src/app/Models/formateur';
import {Organisme} from 'src/app/Models/organisme';
import {FormateurService} from 'src/app/Sevices/formateur.service';
import {OrganismeService} from 'src/app/Sevices/organisme.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})

export class FormateurComponent implements OnInit {

  title = 'Excellent training';

  public formateurs: Formateur[] = []
  public organismes: any;
  public editFormateur!: Formateur;
  public deleteFormateur!: any;

  public organismeId: any;
  public formateurId: any;
  public myObject!: Formateur;

  constructor(private formateurService: FormateurService, private organismeService: OrganismeService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getFormateurs();
    this.getOrganismes();
  }

  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public getFormateurs(): void {

    this.formateurService.getFormateurEntity().subscribe(
      (response: Formateur[]) => {
        this.formateurs = response;
        console.log(this.formateurs);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getOrganismes(): void {
    this.organismeService.getOrganisme().subscribe((response: Organisme[]) => {
        this.organismes = response;
        console.log(this.organismes)
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      })
  }


  public onAddFormateur(addForm: NgForm): void {
    document.getElementById('add-formateur-form')?.click();
    this.organismeId = addForm.value.organisme
    this.myObject = {
      firstName: addForm.value.firstName,
      lastName: addForm.value.lastName,
      email: addForm.value.email,
      tel: addForm.value.tel,
      type: addForm.value.type,
      organisme: null,
    }
    console.log(this.myObject)
    console.log(this.organismeId)

    this.formateurService.addFormateurEntity(this.myObject).subscribe(
      async (response: any) => {
        console.log(response);
        this.toastr.success("Formateur ajouté avec succès!","Félicitations")
        await this.delay(2510);
        window.location.reload();
        this.getFormateurs()
        this.formateurId = response.id
        console.log("inside addformateur")
        this.organismeService.linkOrganismeToFormateur(this.formateurId, this.organismeId).subscribe(
          (response: any) => {
            console.log(response)
          }, (error: HttpErrorResponse) => {
            console.log(error.message)
          }
        )
        await this.delay(1000)
        this.getFormateurs()
      }, (error: HttpErrorResponse) => {
        this.toastr.error(error.message,"Une erreur s'est produite :(");
        addForm.reset();
      }
    )
  }


  public searchFormateurs(key: string): void {
    console.log(key);
    const results: Formateur[] = [];
    for (const formateur of this.formateurs) {
      if (formateur.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || formateur.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || formateur.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || formateur.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(formateur);
      }
    }
    this.formateurs = results;
    if (results.length === 0 || !key) {
      this.getFormateurs();
    }
  }


  public onDeleteFormateur(formateurId: number): void {
    this.formateurService.deleteFormateurEntity(formateurId).subscribe(
      (response: void) => {
        console.log(response);
        this.getFormateurs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateFormateur(formateur: Formateur): void {
    this.myObject = {
      firstName: formateur.firstName,
      lastName: formateur.lastName,
      email: formateur.email,
      tel: formateur.tel,
      type: formateur.type,
      organisme: formateur.organisme,
    }
    this.formateurId = formateur.id

    console.log(formateur.id)
    this.formateurService.updateFormateurEntity(this.myObject, this.formateurId).subscribe(
      async (response: any) => {
        console.log(response)
        if (formateur.organisme) {
          this.organismeService.linkOrganismeToFormateur(this.formateurId, formateur.organisme).subscribe(
            (response: any) => {
              console.log("inside link org/sess")
              console.log(response)
            }, (error: HttpErrorResponse) => {
              console.log(error.message)
            }
          )
        }
        this.delay(1000)
        this.getFormateurs()
      }, (error: HttpErrorResponse) => {
      }
    )
  }

  public onOpenModal(formateur: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addFormateurModal');
    }
    if (mode === 'edit') {
      this.editFormateur = formateur;
      button.setAttribute('data-target', '#updateFormateurModal');
    }

    if (mode === 'delete') {
      this.deleteFormateur = formateur;
      button.setAttribute('data-target', '#deleteFormateurModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
