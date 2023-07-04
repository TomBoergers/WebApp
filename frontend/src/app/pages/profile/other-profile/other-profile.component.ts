import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginuserService} from "../../../services/loginuser.service";
import {TableService} from "../../../services/table.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.scss']
})
export class OtherProfileComponent {
  email: string = '';
  dateOfBirth: string = '';
  userVorname: string = '';
  userNachname: string = '';

  tableData: any[] = []
  tableID!: number;
  identifier!: string;
  menuType : string ='default';
  profileImageUrl!: string;


  constructor(private httpClient: HttpClient, private loginuserService: LoginuserService, private tableService: TableService, private router: Router) {
  }


  ngOnInit() {
    this.menuType = "user";
      let userStore = localStorage.getItem('profileUser');
      let userData = userStore && JSON.parse(userStore);
      this.userVorname = userData.vorname;
      this.userNachname = userData.nachname;
      this.email = userData.email;
      this.dateOfBirth = userData.geburtsdatum;

      this.showImage();

      this.favoriteTable();


  }


  url: string|null|ArrayBuffer  =""
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
    // this.tableID = parseInt(localStorage.getItem("favoriteTable") || "0");

    let userStore = localStorage.getItem('profileUser');
    let userData = userStore && JSON.parse(userStore);
    this.tableID = userData.favTableID


    // Hier muss noch statt favTable ID der Ident rein!!!!
    if(userData.favTable == "csv") {
      return this.httpClient.get<any[]>(`http://localhost:8080/CSV/nameAndYear/${this.tableID}`).subscribe(data => {
        console.log(data);
        this.tableData = data;
      });
    } else if(userData.favTable == "xml") {
      return this.httpClient.get<any[]>(`http://localhost:8080/XML/nameAndYear/${this.tableID}`).subscribe(data => {
        console.log(data);
        this.tableData = data;
      });
    } else {
      return console.log("Tabelle nicht gefunden");
    }



    // if(localStorage.getItem("favoriteTableIdentifier") === "csv") {
    //   return this.httpClient.get<any[]>(`http://localhost:8080/CSV/nameAndYear/${this.tableID}`).subscribe(data => {
    //     console.log(data);
    //     this.tableData = data;
    //   });
    // } else if(localStorage.getItem("favoriteTableIdentifier") === "xml") {
    //   return this.httpClient.get<any[]>(`http://localhost:8080/XML/nameAndYear/${this.tableID}`).subscribe(data => {
    //     console.log(data);
    //     this.tableData = data;
    //   });
    // } else {
    //   return console.log("Tabelle nicht gefunden");
    // }
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

  toFriendAdd() {
    this.router.navigate(['/friendAdd']);
  }

  protected readonly onselect = onselect;
  user: any;

}
