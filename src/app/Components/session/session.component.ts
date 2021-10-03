import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {Session} from "../../Models/session";
import {SessionService} from "../../Sevices/session.service";
import {OrganismeService} from "../../Sevices/organisme.service";
import {NgForm} from "@angular/forms";
import {Organisme} from "../../Models/organisme";
import {Formation} from "../../Models/formation";
import {Formateur} from "../../Models/formateur";
import {FormationService} from "../../Sevices/formation.service";
import {FormateurService} from "../../Sevices/formateur.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  public sessions:Session[] = []
  public sessionId : any
  public organismes:any
  public formations:any
  public formateurs:any


  public organismeId : any
  public formateurId : any
  public formationId:any
  public myObject!: Session
  editSession!:Session
  deleteSession : any
  participantsForSessionId: any;
  participantsForSession: any;
  constructor(private sessionService:SessionService,
              private organismeService:OrganismeService,
              private formationService:FormationService,
              private formateurService:FormateurService,
              private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getSessions()
    this.getFormations()
    this.getOrganismes()
    this.getFormateurs()
  }
  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  public getSessions(): void{
    this.sessionService.getSessions().subscribe((response:Session[])=>{
      this.sessions = response
      console.log("sessions:")
      console.log(this.sessions);
    },(error:HttpErrorResponse)=>{
      console.error(error.message)
    })
  }

  public getOrganismes(): void{
    this.organismeService.getOrganismes().subscribe((response:Organisme[])=>{
      this.organismes = response
      console.log("organismes:")
      console.log(this.organismes);
    },(error:HttpErrorResponse)=>{
      console.error(error.message)
    })
  }

  public getFormations(): void{
    this.formationService.getFormations().subscribe((response:Formation[])=>{
      this.formations = response
      console.log("formations:")
      console.log(this.formations);

    },(error:HttpErrorResponse)=>{
      console.error(error.message)
    })
  }

  public getFormateurs(): void{
    this.formateurService.getFormateurs().subscribe((response:Formateur[])=>{
      this.formateurs = response
      console.log("formateurs:")
      console.log(this.formateurs);
    },(error:HttpErrorResponse)=>{
      console.error(error.message)
    })
  }



  public onAddSession(addForm: NgForm):void{
    document.getElementById('add-session-form')?.click()
    this.formateurId = addForm.value.formateur
    this.organismeId = addForm.value.organisme
    this.formationId = addForm.value.formation
    this.myObject = {
      lieu:addForm.value.lieu,
      dateDeb:addForm.value.dateDeb,
      dateFin:addForm.value.dateFin,
      nbrParticipants:addForm.value.nbParticipant,
      organisme:null,
      formateur:null,
      formation:null,
    }
    console.log(this.myObject)
    console.log(this.formateurId)
    console.log(this.organismeId)

    this.sessionService.addSession(this.myObject).subscribe(
      async ( response:any)=> {
        console.log(response);
        this.toastr.success("Session ajouté avec succès!","Félicitations")
        await this.delay(2510);
        window.location.reload();
        this.getSessions()
        this.sessionId = response.id
        console.log("inside addSession")
        this.organismeService.linkToSession(this.sessionId,this.organismeId).subscribe(
          (response:any)=>{
            console.log("inside link org/sess")
            console.log(response)
          },(error:HttpErrorResponse)=>{
            console.log(error.message)
          }
        )
        await this.delay(1000)
        this.formateurService.linkToSession(this.sessionId,this.formateurId).subscribe(
          (response:any)=>{
            console.log("inside link form/sess")
            console.log(response)
          },(error:HttpErrorResponse)=>{
            console.log((error.message))
          }
        )
        await this.delay(1000)
        this.formationService.linkToSession(this.sessionId,this.formationId).subscribe(
          (response:any)=>{
            console.log("inside link formation/sess")
            console.log(response)
          },(error:HttpErrorResponse)=>{
            console.log((error.message))
          }
        )
        await this.delay(1000)
        this.getSessions()

      },(error:HttpErrorResponse)=>{
        this.toastr.error(error.message,"Une erreur s'est produite :(");
        addForm.reset();
      }
    )
  }

  public onUpdateSession(session: Session):void{
    this.myObject={
      lieu:session.lieu,
      dateDeb:session.dateDeb,
      dateFin:session.dateFin,
      nbrParticipants:session.nbrParticipants
    }
    this.sessionId = session.id

    console.log(session.id)
    this.sessionService.updateSession(this.myObject,this.sessionId).subscribe(
      async (response:any)=>{
        console.log(response)

        if(session.organisme){
          await this.delay(1000)
          this.organismeService.linkToSession(this.sessionId,session.organisme).subscribe(
            (response:any)=>{
              console.log("inside link org/sess")
              console.log(response)
            },(error:HttpErrorResponse)=>{
              console.log(error.message)
            }
          )
        }
        if(session.formateur){
          await this.delay(1000)
          this.formateurService.linkToSession(this.sessionId,session.formateur).subscribe(
            (response:any)=>{
              console.log("inside link form/sess")
              console.log(response)
            },(error:HttpErrorResponse)=>{
              console.log((error.message))
            }
          )
        }
        if(session.formation){
          await this.delay(1000)
          this.formationService.linkToSession(this.sessionId,session.formation).subscribe(
            (response:any)=>{
              console.log("inside link formation/sess")
              console.log(response)
            },(error:HttpErrorResponse)=>{
              console.log((error.message))
            }
          )
        }
        await this.delay(1000)
      this.getSessions()
      },(error:HttpErrorResponse)=>{
      }
    )
  }

  public onDeleteSession(sessionId:number):void{
    this.sessionService.deleteSession(sessionId).subscribe(
      (response:any)=>{
        this.getSessions()
      }, (error:HttpErrorResponse)=>{
        console.log(error.message)
      }
    )
  }


  public onOpenModal(session:any, mode:string):void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button')
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');

    if(mode === 'add'){
      button.setAttribute('data-target','#addSessionModal');
    }
    if(mode === 'edit'){
      console.log("****************************************")
      console.log(session)
      this.editSession = session;
      button.setAttribute('data-target','#editSessionModal');
    }
    if(mode === 'delete'){
      this.deleteSession = session;
      button.setAttribute('data-target','#deleteSessionModal'); 
    }
    if (mode === 'details') {
      this.sessionService.getParticipantsOfSessions(session).subscribe(
        (response:any)=>{
          console.log(response);
          this.participantsForSession=response;
        },(error:HttpErrorResponse)=>{
          console.log(error.message)
        }
      )
      button.setAttribute('data-target', '#participantDetailsModal');
    }

    container?.appendChild(button);
    button.click();
  }
}


