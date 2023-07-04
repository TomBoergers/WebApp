import { Injectable } from '@angular/core';
import jsPDF from "jspdf";
import { HttpClient } from "@angular/common/http";
import autoTable from "jspdf-autotable";
import {colors} from "@angular/cli/src/utilities/color";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  tableData: any[][] = [];

  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  generatePdf(title: string, year: string, tableId: string, identifier: string) {
    const doc = new jsPDF();
    const exportDate = new Date().toLocaleDateString();
    doc.setFontSize(20); // Titelgröße
    doc.text(title +' '+ year, 10, 10);
    doc.setFontSize(8);
    doc.text(`Exportdatum: `+ exportDate, 10, 20);
    doc.setFontSize(10);
    if(identifier==='csv'){
      this.httpClient.get<any[][]>('http://localhost:8080/CSV/' + tableId).subscribe(data => {
        this.tableData = data;

        autoTable(doc,{
          head:[this.tableData[0]],
          body:this.tableData.slice(1),
          startY:30,
          headStyles: {
            fillColor: [255,165,0]
          }
        })

        doc.save(title+`.pdf`);
      });
    }
    else if(identifier==="xml"){
      this.httpClient.get<any[][]>('http://localhost:8080/XML/' + tableId).subscribe(data => {
        this.tableData = data;

        autoTable(doc,{
          head:[this.tableData[0]],
          body:this.tableData.slice(1),
          startY:30,
        })

        doc.save(title+`.pdf`);
      });
    }


  }
}
