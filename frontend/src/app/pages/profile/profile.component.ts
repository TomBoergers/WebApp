import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/classes/user';
import {HttpClient} from "@angular/common/http";
import {LoginuserService} from "../../services/loginuser.service";
import {TableService} from "../../services/table.service";
import {Router} from "@angular/router";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {DiagramService} from "../../services/diagram.service";
import {CanvasJS} from "@canvasjs/angular-charts";
import {ProfileService} from "../../services/profile.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email: string = '';
  dateOfBirth: string = '';
  userVorname: string = '';
  userNachname: string = '';
  chartOptions:any;
  tableData: any[] = []
  tableID!: number;
  identifier!: string;
  menuType : string ='default';
  profileImageUrl!: string;
  favTableID!: number;
  favTableIdent!: string;
  profilePrivacy!: boolean;


  constructor(private diagramService: DiagramService, private httpClient: HttpClient, private loginuserService: LoginuserService, private tableService: TableService, private router: Router,
              private profileService: ProfileService) {
  }


  ngOnInit() {


    if(localStorage.getItem('admin')){
      this.menuType ="admin"
    }
    else if(localStorage.getItem('user')){
      this.menuType ="user"
    }
    else {
      this.menuType ="default"
    }
    if(localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.userVorname = userData.vorname;
      this.userNachname = userData.nachname;
      this.email = userData.email;
      this.dateOfBirth = userData.geburtsdatum;
      this.user = this.loginuserService.user
      this.showImage();
      // this.getPie();

      this.favoriteTable();
    }
    if(localStorage.getItem('admin')){
      let adminStore = localStorage.getItem('admin');
      let adminData = adminStore && JSON.parse(adminStore);
      this.userVorname = adminData.vorname;
      this.userNachname = adminData.nachname;
      this.email = adminData.email;
      this.dateOfBirth = adminData.geburtsdatum;

      this.user = this.loginuserService.user
      // this.getPie();


      this.showImage();
      this.favoriteTable();

    }
    this.getChart();
  }

  editEmail(): void {
    const newEmail = prompt('Deine Email:');
    if (newEmail) {
      this.email = newEmail;
    }
  }

  editDateOfBirth(): void {
    const newDateOfBirth = prompt('Dein Geburtsdatum');
    if (newDateOfBirth) {
      this.dateOfBirth = newDateOfBirth;
    }
  }

  url: string|null|ArrayBuffer  ="assets/profile/WhatsApp-Profilbild-mit-Fliege.png"
  onFileSelected(files: FileList | null) {
    if (files) {
      var reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = (event:Event) => {
        let fileReader = event.target as FileReader
        this.url = fileReader.result;
      }
    }
  }

  favoriteTable() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);


    this.httpClient.get<User>("http://localhost:8080/nutzer/get/" + userData.id).subscribe(result =>{
      this.tableID = result.favTableID;

      // Hier muss noch statt email der Ident rein!!!!
      if(result.favTable == "csv") {
        return this.httpClient.get<any[]>(`http://localhost:8080/CSV/nameAndYear/${this.tableID}`).subscribe(data => {
          console.log(data);
          this.tableData = data;
        });
      } else if(result.favTable == "xml") {
        return this.httpClient.get<any[]>(`http://localhost:8080/XML/nameAndYear/${this.tableID}`).subscribe(data => {
          console.log(data);
          this.tableData = data;
        });
      } else {
        return console.log("Tabelle nicht gefunden");
      }




    })







    // this.tableID = parseInt(localStorage.getItem("favoriteTable") || "0");
//     let userStore = localStorage.getItem("user");
//     let userData = userStore && JSON.parse(userStore);
//     this.tableID = userData.favTableID;
//
// // Hier genauso wie bei other Profile
//     if(localStorage.getItem("favoriteTableIdentifier") === "csv") {
//       return this.httpClient.get<any[]>(`http://localhost:8080/CSV/nameAndYear/${this.tableID}`).subscribe(data => {
//         console.log(data);
//         this.tableData = data;
//       });
//     } else if(localStorage.getItem("favoriteTableIdentifier") === "xml") {
//       return this.httpClient.get<any[]>(`http://localhost:8080/XML/nameAndYear/${this.tableID}`).subscribe(data => {
//         console.log(data);
//         this.tableData = data;
//       });
//     } else {
//       return console.log("Tabelle nicht gefunden");
//     }
  }

  openTable(tableId: number, identifier: string) {
    this.tableService.loadTableId = tableId;
    this.tableID = tableId;
    localStorage.setItem("tableID", tableId.toString());
    localStorage.setItem("identifier", identifier);
    this.router.navigate(['/table', tableId]);
  }

  showImage() {
    const imageUrl = localStorage.getItem('picture');

    if(imageUrl) {
      this.profileImageUrl = imageUrl;
    } else {
      this.profileImageUrl = "frontend/src/assets/profile/WhatsApp-Profilbild-mit-Fliege.png";
    }
  }

  protected readonly onselect = onselect;
  user: any;

  getSterbefaelleP(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    this.httpClient.get<User>("http://localhost:8080/nutzer/get/" + userData.id).subscribe(result => {
      this.diagramService.setSterbefaelle(result)
      this.chartOptions = this.diagramService.getSterbefaellePie();

    })
  }

  getGeburtenP(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    this.httpClient.get<User>("http://localhost:8080/nutzer/get/" + userData.id).subscribe(result => {
      this.diagramService.setGeburten(result)
      this.chartOptions = this.diagramService.getGeburtenPie();
    })
  }

  getArbeitssuchendeP(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    this.httpClient.get<User>("http://localhost:8080/nutzer/get/" + userData.id).subscribe(result => {
      this.diagramService.setArbeitssuchende(result)
      this.chartOptions = this.diagramService.getArbeitssuchendePie();


    })



  }

  getGeburtenC(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    this.httpClient.get<User>("http://localhost:8080/nutzer/get/" + userData.id).subscribe(result => {
      this.diagramService.setGeburtenB(result)
      this.chartOptions =this.diagramService.getGeburtenChart();
    })

  }

  getArbeitssuchendeC(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    this.httpClient.get<User>("http://localhost:8080/nutzer/get/" + userData.id).subscribe(result => {
      this.diagramService.setArbeitssuchendeB(result)
      this.chartOptions = this.diagramService.getArbeitssuchendeChart();
    })

  }

  getArbeitsloseC(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    this.httpClient.get<User>("http://localhost:8080/nutzer/get/" + userData.id).subscribe(result => {
      this.diagramService.setArbeitsloseB(result)
      this.chartOptions= this.diagramService.getArbeitsloseChart();
    })

  }


  getArbeitsloseP(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    this.httpClient.get<User>("http://localhost:8080/nutzer/get/" + userData.id).subscribe(result => {
      this.diagramService.setArbeitslose(result)
      this.chartOptions= this.diagramService.getArbeitslosePie();
    })


  }

  getSterbefaelleC(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    this.httpClient.get<User>("http://localhost:8080/nutzer/get/" + userData.id).subscribe(result => {
      this.diagramService.setSterbefaelleB(result)
      this.chartOptions = this.diagramService.getSterbefaelleChart();
    })

  }

  setPrivate() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    this.user = userData;



    this.profileService.getPrivacy(userData.id).subscribe(data => {
        this.profilePrivacy = data;
        if (this.profilePrivacy) {
          this.profileService.setPrivacy(userData).subscribe()
          alert('Niemand kann dein Profil mehr sehen \n Setting: Privat')
        } else {

          this.profileService.setPrivacy(userData).subscribe()
          alert('Jeder kann dein Profil sehen \n Setting: Öffentlich')
        }
      }
    )
  }

  // getPie(){
  //   let userStore = localStorage.getItem('profileUser');
  //   let userData = userStore && JSON.parse(userStore);
  //
  //   if(userData.profileTable=== 1){
  //     this.getSterbefaelleP()
  //     //this.getSterbefaelleC()
  //   }
  //   else  if(userData.profileTable=== 2){
  //     this.getGeburtenP()
  //   }
  //   else  if(userData.profileTable=== 3){
  //     this.getArbeitssuchendeP()
  //
  //   }
  //   else  if(userData.profileTable=== 4){
  //     this.getArbeitsloseP()
  //   }
  //   else{
  //
  //
  //   }
  //
  // }
  showSterbefaelleP(){
    this.chartOptions = this.diagramService.getSterbefaellePie();
  }

  showGeburtenP(){
    this.chartOptions =this.diagramService.getGeburtenPie();
  }

  showArbeitssuchendeP(){
    this.chartOptions = this.diagramService.getArbeitssuchendePie();
  }

  showArbeitsloseP(){
    this.chartOptions= this.diagramService.getArbeitslosePie();
  }

  showSterbefaelleC(){
    this.chartOptions = this.diagramService.getSterbefaelleChart();
  }

  showGeburtenC(){
    this.chartOptions =this.diagramService.getGeburtenChart();
  }
  showArbeitssuchendeC(){
    this.chartOptions = this.diagramService.getArbeitssuchendeChart();
  }

  showArbeitsloseC(){
    this.chartOptions= this.diagramService.getArbeitsloseChart();
  }


  getChart(){
    let userSto = localStorage.getItem('user');
    let userda = userSto && JSON.parse(userSto);
    this.httpClient.get<User>("http://localhost:8080/nutzer/get/" + userda.id).subscribe(result => {
      localStorage.setItem('user', JSON.stringify(result))

      console.log(userdata.profileTable)
    })
    let userStore = localStorage.getItem('user');
    let userdata = userStore && JSON.parse(userStore);

    console.log(userdata.id)


    if(userdata.profileTable=== 1){
      this.showSterbefaelleP()
    }
    else  if(userdata.profileTable=== 2){
      this.showGeburtenP()
    }
    else  if(userdata.profileTable=== 3){
      this.showArbeitssuchendeP()

    }
    else  if(userdata.profileTable=== 4){
      this.showArbeitsloseP()
    }
    else  if(userdata.profileTable=== 5){
      this.showSterbefaelleC()
    }
    else  if(userdata.profileTable=== 6){
      this.showGeburtenC()
    }
    else  if(userdata.profileTable=== 7){
      this.showArbeitsloseC()
    }
    else  if(userdata.profileTable=== 8){
      this.showArbeitssuchendeC()

    }



}


}
