import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  menuType:string = 'default';



constructor(private route:Router)  {}


ngOnInit() {
  this.route.events.subscribe((val:any)=>{
      if(localStorage.getItem('user')){
        this.menuType ="user"
      }
      else {
        console.warn("Default")
        this.menuType ="default"
      }
  })
}
  logout(){
    localStorage.removeItem('user')
    this.route.navigate([''])

  }



}
