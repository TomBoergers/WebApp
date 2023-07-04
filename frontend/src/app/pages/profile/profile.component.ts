import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import {HttpClient} from "@angular/common/http";
import {LoginuserService} from "../../services/loginuser.service";
import {TableService} from "../../services/table.service";
import {Router} from "@angular/router";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {DiagramService} from "../../services/diagram.service";
import {CanvasJS} from "@canvasjs/angular-charts";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
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


  constructor(private diagramService: DiagramService, private httpClient: HttpClient, private loginuserService: LoginuserService, private tableService: TableService, private router: Router) {
  }

  ngAfterViewInit(): void {
    // Call the method to render the chart after the view has been initialized
    this.renderChart();
  }

  private renderChart(): void {
    const chart = new CanvasJS.Chart('chartContainer', this.diagramService.chartOptions);
    chart.render();
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
      this.showImage();
      this.favoriteTable();

    }
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
    this.chartOptions = this.diagramService.getSterbefaellePie();
  }

  getGeburtenP(){
    this.chartOptions =this.diagramService.getGeburtenPie();
  }

  getArbeitssuchendeP(){
    this.chartOptions = this.diagramService.getArbeitssuchendePie();
  }

  getArbeitsloseP(){
    this.chartOptions= this.diagramService.getArbeitslosePie();
  }

}
