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

      if(localStorage.getItem('admin')){
        this.menuType ="admin"
      }
      else if(localStorage.getItem('user')){
        this.menuType ="user"
      }
      else {
        this.menuType ="default"
      }
  })
}
  logout(){
    localStorage.removeItem('admin')
    localStorage.removeItem('user')
    localStorage.removeItem('picture')
    localStorage.removeItem('table')
    localStorage.removeItem('favoriteTable');
    localStorage.removeItem('favoriteTableIdentifier')
    this.route.navigate([''])

  }



}
