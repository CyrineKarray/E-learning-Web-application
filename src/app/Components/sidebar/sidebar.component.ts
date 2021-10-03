import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../Sevices/token-storage.service'
import {Router} from "@angular/router";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  isLoggedIn =false
  username!:String
  activeClass:string;
  isAdmin=false;

  constructor(private  tokenStorageService:TokenStorageService, private router:Router) {
    this.activeClass='active'
   }

  ngOnInit(): void {
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn = true;
      this.username = this.tokenStorageService.getUser().username;
    }
    else{
      this.router.navigate(['/login']);
    }
    this.tokenStorageService.getUser().roles.forEach((role: any) => {
      if (role.name == "ADMIN"){
        this.isAdmin=true;
      }
    });

  }

  public clickFun(event:any){
    var list: any = document.getElementsByClassName('item');
    for (let item of list) {
    item.removeAttribute('id');
    }
    event.target.setAttribute('id','active');
  }


  public clickReset(){
    var list: any = document.getElementsByClassName('item');
    for (let item of list) {
    item.removeAttribute('id');
    }
  }

  public onLogout(){
    this.tokenStorageService.signOut()
    window.location.reload();
  }
}
