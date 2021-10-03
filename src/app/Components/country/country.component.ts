import { Component, OnInit } from '@angular/core';
import { Country } from '../../Models/country';
import { CountryService } from '../../Sevices/country.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../Sevices/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  title = 'formation';
  public countries: Country[] = [];
  public editCountry!: Country;
  public deleteCountry: any;
  base64textString: any;
  flagCountry: any;
  constructor(
    private countryService: CountryService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.getCountries();
    } else {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }
  }

  public getCountries(): void {
    this.countryService.getCountries().subscribe(
      (Response: Country[]) => {
        this.countries = Response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public onAddCountry(addForm: NgForm): void {
    document.getElementById('add-country-form')?.click();
    addForm.value.flag=this.base64textString;
    console.log(addForm.value)
    this.countryService.addCountry(addForm.value).subscribe(
      async (response: Country) => {
        console.log(response);
        this.toastr.success("Pays ajouté avec succès!","Félicitations")
        await this.delay(2510);
        window.location.reload();
        this.getCountries();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message,"Une erreur s'est produite :(");
        addForm.reset();
      }
    );
  }

  public onUpdateCountry(countryId: any, country: Country): void {
    country.flag=this.base64textString;
    this.countryService.updateCountry(countryId, country).subscribe(
      (response: Country) => {
        console.log(response);
        window.location.reload();
        this.getCountries();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCountry(countryId: number): void {
    this.countryService.deleteCountry(countryId).subscribe(
      (response: void) => {
        console.log(response);
        window.location.reload();
        this.getCountries();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onFileChanged(event:any){
    var files = event.target.files;
    var file = files[0];

  if (files && file) {
      var reader = new FileReader();
      reader.onload =this.handleFile.bind(this);
      reader.readAsBinaryString(file);
  }
  }


  handleFile(event:any) {
    var binaryString = event.target.result;
           this.base64textString= btoa(binaryString);
           console.log(this.base64textString);
   }



  public onOpenModal(country: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCountryModal');
    }
    if (mode === 'edit') {
      this.editCountry = country;
      button.setAttribute('data-target', '#updateCountryModal');
    }
    if (mode === 'delete') {
      this.deleteCountry = country;
      button.setAttribute('data-target', '#deleteCountryIdModal');
    }
    if(mode === 'flag'){
      country.flag='data:image/jpeg;base64,'+country.flag
      this.flagCountry = country;
      console.log("***************")
      console.log(this.flagCountry)
      button.setAttribute('data-target','#flagCountryModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
