import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Formation } from 'src/app/Models/formation';
import { FormationService } from 'src/app/Sevices/formation.service';
import { DomainService } from 'src/app/Sevices/domain.service';
import { Domain } from 'src/app/Models/domain';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})

export class FormationComponent implements OnInit {

  title = 'Excellent training';
  public formations!: Formation[];
  public editFormation!: Formation;
  public deleteFormation!: any;
  public domains: any;


  public domainId : any;
  public formationId : any;
  public myObject!: Formation;


  constructor(private formationService:FormationService, private domainService:DomainService,     private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getFormations();
    this.getDomains();

  }
public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

public getFormations(): void {
    this.formationService.getFormationEntity().subscribe(
      (response: Formation[]) => {
        this.formations = response;
        console.log(this.formations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    }

    public getDomains(): void {
      this.domainService.getDomains().subscribe((response:Domain[])=>{
        this.domains=response;
        console.log(this.domains)
      },
      (error:HttpErrorResponse)=>{
        console.error(error.message);
      })
    }

    // public onAddFormation(addForm: NgForm):void{
    //   document.getElementById('add-formation-form')?.click();
    //   this.formationService.addFormationEntity(addForm.value).subscribe(
    //     (response: Formation) => {
    //       console.log(response);
    //       this.getFormations();
    //       addForm.reset();
    //     },
    //     (error: HttpErrorResponse) => {
    //       alert(error.message);
    //       addForm.reset();
    //     }
    //   );
    // }

    public onAddFormation(addForm: NgForm):void{
      document.getElementById('add-formation-form')?.click();
      this.domainId = addForm.value.domain
      this.myObject = {
        titre:addForm.value.titre,
        type:addForm.value.type,
        duree:addForm.value.duree,
        budget:addForm.value.budget,
        nb_session:addForm.value.nb_session,
        domain:null,
        session:null
      }
      console.log(this.myObject)
      console.log(addForm.value)
      console.log(addForm.value.domain)

      this.formationService.addFormationEntity(this.myObject).subscribe(
        async ( response:any)=> {
          console.log(response);
          this.toastr.success("Formation ajoutée avec succès!","Félicitations")
          await this.delay(2510);
          window.location.reload();
          this.getFormations()
          this.formationId = response.id
          this.domainService.linkDomainToFormation(this.formationId,this.domainId).subscribe(
            (response:any)=>{
              console.log('***********************')
              console.log(response)
            },(error:HttpErrorResponse)=>{
              console.log(error.message)
            }
          )
          await this.delay(1000)
          this.getFormations()
        },(error:HttpErrorResponse)=>{
          this.toastr.error(error.message,"Une erreur s'est produite :(");
          console.log(error.message)
        }
      )
    }

    public onDeleteFormation(formationId: number): void {
      this.formationService.deleteFormationEntity(formationId).subscribe(
        (response: void) => {
          console.log(response);
          this.getFormations();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public onUpdateFormation(formation: Formation): void {
      this.myObject={
        titre:formation.titre,
        type:formation.type,
        duree:formation.duree,
        budget:formation.budget,
        nb_session:formation.nb_session,
        domain:formation.domain,
        session:formation.session,
      }
      this.formationId = formation.id

      console.log(formation.id)
      this.formationService.updateFormationEntity(this.myObject,this.formationId).subscribe(
        async (response:any)=>{
          console.log(response)
          if(formation.domain){
            this.delay(1000)
            this.domainService.linkDomainToFormation(this.formationId,formation.domain).subscribe(
              (response:any)=>{
                console.log("inside link org/sess")
                console.log(response)
              },(error:HttpErrorResponse)=>{
                console.log(error.message)
              }
            )
          }
          this.delay(1000)
          this.getFormations()
      },(error:HttpErrorResponse)=>{
      }
    )
    }

    public searchFormations(key: string): void {
        console.log(key);
        const results: Formation[] = [];
        for (const formation of this.formations) {
          if (formation.titre.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
            results.push(formation);
          }
        }
        this.formations = results;
        if (results.length === 0 || !key) {
          this.getFormations();
        }
      }

    public onOpenModal(formation: any, mode: string): void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addFormationModal');
      }
      if (mode === 'edit') {
      this.editFormation = formation;
        button.setAttribute('data-target', '#updateFormationModal');
      }

      if (mode === 'delete') {
       this.deleteFormation = formation;
       button.setAttribute('data-target', '#deleteFormationModal');
      }
      container?.appendChild(button);
      button.click();
    }
}
