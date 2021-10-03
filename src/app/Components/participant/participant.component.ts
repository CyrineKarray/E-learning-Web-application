import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../../Sevices/participant.service';
import { SessionService } from '../../Sevices/session.service';
import { ProfileService } from '../../Sevices//profile.service';
import { CountryService } from '../../Sevices//country.service';
import { Participant } from '../../Models/participant';
import { Session } from '../../Models/session';
import { Profile } from '../../Models/profile';
import { Country } from '../../Models/country';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../../Sevices/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css'],
})
export class ParticipantComponent implements OnInit {
  participants!: Participant[];
  sessions!: Session[];
  profiles!: Profile[];
  countries!: Country[];
  sessionDetails: any;
  deleteParticipant: any;
  editParticipant: any;

  constructor(
    private router: Router,
    private participantService: ParticipantService,
    private sessionService: SessionService,
    private profileService: ProfileService,
    private countryService: CountryService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.getParticipants();
      this.getProfiles();
      this.getSessions();
      this.getCountries();
    } else {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }
  }
  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  public getParticipants(): void {
    this.participantService.getParticipants().subscribe(
      (response: Participant[]) => {
        this.participants = response;
        console.log(this.participants);
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  public getSessions(): void {
    this.sessionService.getSessions().subscribe(
      (response: Session[]) => {
        this.sessions = response;
        console.log(this.sessions);
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  public getProfiles(): void {
    this.profileService.getProfiles().subscribe(
      (response: Profile[]) => {
        this.profiles = response;
        console.log(this.profiles);
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  public getCountries(): void {
    this.countryService.getCountries().subscribe(
      (response: Country[]) => {
        this.countries = response;
        console.log(this.countries);
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  public onAddParticipant(addForm: NgForm): void {
    console.log(addForm.value);
    const participant = {
      firstName: addForm.value.firstName,
      lastName: addForm.value.lastName,
      email: addForm.value.email,
      tel: addForm.value.tel,
      type: addForm.value.type[0],
    };

    this.participantService.addParticipant(participant).subscribe(
      async (response: Participant) => {
        var participantId = response.id;

        addForm.value.sessions.forEach((sessionId: any) => {
          this.participantService
            .linkNewSessionToParticipant(sessionId, participantId)
            .subscribe((response: any) => {
              console.log('session:');
              console.log(response);
            });
        });
        await this.delay(1000);
        this.profileService
          .linkProfileToParticipant(participantId, addForm.value.profile[0])
          .subscribe((response: any) => {
            console.log('profile:');
            console.log(response);
          });
        await this.delay(1000);
        this.profileService
          .linkProfileToParticipant(participantId, addForm.value.profile[0])
          .subscribe((response: any) => {
            console.log('profile:');
            console.log(response);
          });
        this.countryService
          .linkCountryToParticipant(participantId, addForm.value.country[0])
          .subscribe((response: any) => {
            console.log('pays:');
            console.log(response);
          });
        this.countryService
          .linkCountryToParticipant(participantId, addForm.value.country[0])
          .subscribe((response: any) => {
            console.log('pays:');
            console.log(response);
            // this.getParticipants();
            // this.getProfiles();
            // this.getSessions();
            // this.getCountries();
            // addForm.reset();
            window.location.reload();
          });
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  public OnDeleteParticipant(participantId: number): void {
    this.participantService.deleteParticipant(participantId).subscribe(
      (response: any) => {
        console.log(response);
        // this.getParticipants();
        // this.getProfiles();
        // this.getSessions();
        // this.getCountries();
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  public OnEditParticipant(participantEdit: Participant): void {
    console.log(participantEdit);
    const edition = {
      id: participantEdit.id,
      firstName: participantEdit.firstName,
      lastName: participantEdit.lastName,
      email: participantEdit.email,
      tel: participantEdit.tel,
      type: participantEdit.type[0],
    };
    this.participantService
      .updateParticipant(edition, participantEdit.id)
      .subscribe(
        (response: any) => {
          if (participantEdit.sessions) {
            this.participantService
              .clearSessionsForParticipant(participantEdit.id)
              .subscribe();
          }

          if (participantEdit.sessions) {
            participantEdit.sessions.forEach((sessionId: any) => {
              this.participantService
                .linkNewSessionToParticipant(sessionId, participantEdit.id)
                .subscribe((response: any) => {
                  console.log('session:');
                  console.log(response);
                });
            });
          }
          if (participantEdit.profile[0]) {
            this.profileService
              .linkProfileToParticipant(
                participantEdit.id,
                participantEdit.profile[0]
              )
              .subscribe((response: any) => {
                console.log('profile:');
                console.log(response);
              });
            this.profileService
              .linkProfileToParticipant(
                participantEdit.id,
                participantEdit.profile[0]
              )
              .subscribe((response: any) => {
                console.log('profile:');
                console.log(response);
              });
          }

          if (participantEdit.country[0]) {
            this.countryService
              .linkCountryToParticipant(
                participantEdit.id,
                participantEdit.country[0]
              )
              .subscribe((response: any) => {
                console.log('pays:');
                console.log(response);
              });
            this.countryService
              .linkCountryToParticipant(
                participantEdit.id,
                participantEdit.country[0]
              )
              .subscribe((response: any) => {
                this.participantService
                  .updateParticipant(edition, participantEdit.id)
                  .subscribe((response: any) => {});
                console.log('pays:');
                console.log(response);
                // this.getParticipants();
                // this.getProfiles();
                // this.getSessions();
                // this.getCountries();
              });
          }
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          console.error(error.message);
        }
      );
  }

  public onOpenModal(participant: any, mode: string): void {
    const container = document.getElementById('participantContainer');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'details') {
      this.sessionDetails = participant;
      button.setAttribute('data-target', '#sessionDetailsModal');
    }
    if (mode === 'add') {
      button.setAttribute('data-target', '#addParticipantModal');
    }
    if (mode === 'delete') {
      this.deleteParticipant = participant;
      button.setAttribute('data-target', '#deleteParticipantModal');
    }
    if (mode === 'edit') {
      this.editParticipant = participant;
      button.setAttribute('data-target', '#editParticipantModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
