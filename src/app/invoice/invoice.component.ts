import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../Vehicle';
import { VehicleService } from '../vehicle.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
var pdfMake = require("pdfmake/build/pdfmake");
var pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var htmlToPdfmake = require("html-to-pdfmake");

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  id!:number;
  vehicle!: Vehicle;
  vehicles!: Vehicle[];
  dataSlice:any;
  today:any;
  getDate:any;
  timeData = "86400";
  getTime:any;
  getDuration:any;
  startTime:any;
  endTime:any;
  hours:any;
  time1:any;
  time2:any;
  diff:any;
  getId:any;
  getTotalPrice:any;
  idValue:any;
  getTimeId = localStorage.getItem('getId');
  todayDate:Date = new Date();
  @ViewChild('pdfTable', {static: false}) pdfTable!: ElementRef;
  @ViewChild('pdfTable') exports!: ElementRef;

  constructor(private router: ActivatedRoute, private service: VehicleService, private routers: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.time1 = localStorage.getItem('getExitTime');
    this.time2 = this.toHHMMSS(this.timeData); 

    this.getDate =  this.time1.split(':');
    this.getTime = this.time2.split(':');

    this.startTime = this.getTime[0]+ this.getTime[1]
    this.endTime = this.getDate[0]+ this.getDate[1]

    this.diff = this.startTime - this.endTime;
    
    this.id = this.router.snapshot.params['id'];
    this.getVehicles();     
  }

  getVehicles(){
    this.vehicle = new Vehicle();
    this.service.getVehicleById(this.id).subscribe(
      data => {this.vehicle = data
        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      }
    )
  }

  getDifferenceInTime(id:any){
    if((this.getTimeId == id) && (this.diff > 40) && (this.diff < 101)){
     return this.hours = 1
    }else if((this.getTimeId == id) && (this.diff > 140) && (this.diff < 201)){
     return this.hours = 2
    }else if((this.getTimeId == id) && (this.diff > 240) && (this.diff < 301)){
      return this.hours = 3
    }else if((this.getTimeId == id) && (this.diff > 340) && (this.diff < 401)){
      return this.hours = 4
    }else if((this.getTimeId == id) && (this.diff > 440) && (this.diff < 501)){
      return this.hours = 5
    }else if((this.getTimeId == id) && (this.diff > 540) && (this.diff < 601)){
      return this.hours = 6
    }else if((this.getTimeId == id) && (this.diff > 640) && (this.diff < 701)){
      return this.hours = 7
    }else if((this.getTimeId == id) && (this.diff > 740) && (this.diff < 801)){
      return this.hours = 8
    }else if((this.getTimeId == id) && (this.diff > 840) && (this.diff < 901)){
      return this.hours = 9
    }else if((this.getTimeId == id) && (this.diff > 940) && (this.diff < 1001)){
      return this.hours = 10
    }else{
      return this.hours = 0
    }
  }


  getPrice(data:any,id:any){
    if((this.getTimeId == id) && (data == this.hours) && (this.vehicle.category == 'bike')){
       return this.getTotalPrice = data*50;
    }else if((this.getTimeId == id) && (data == this.hours) && (this.vehicle.category == 'car')){
       return this.getTotalPrice = data*100;
    }else{
       return this.getTotalPrice = 0; 
    }
  }
  

  toHHMMSS = (secs:any) => {
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
  }


  calculateDiff =  (params:any) =>{
    let currentDate = new Date(this.getDate);
    params = new Date(params);
     return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(params.getFullYear(), params.getMonth(), params.getDate()) ) /(1000 * 60 * 60 * 24)); 
  }

  public async downloadAsPDF() {
    let doc = new jsPDF('p', 'pt', 'a4');

    const specialElementHandlers = {
      '#editor': function (element:any, renderer:any) {
        return true;
      }
    };

    let pdfTable = this.pdfTable.nativeElement;

     await doc.html(pdfTable.innerHTML);
    doc.save('ParkingInvoice -'+this.vehicle.parkingId+'.pdf');
  }



  public async captureScreen()  
  {  
    const doc = new jsPDF('p', 'pt', 'a4');
    const content = this.exports.nativeElement; 

    await doc.html(content.innerHTML);

    // doc.save('test.pdf'); 

    const margins = {
      top: 80,
      bottom: 60,
      left: 40,
      width: 522
    };
    console.log(doc);
      doc.html(content.innerHTML, margins);
      doc.save('Invoice('+this.vehicle.name+').pdf'); 
  
  } 


            
// var elementHandler = {
//    var docs = new jsPDF('p', 'pt', 'a4'),
//   '#ignorePDF': function (element:any, renderer:any) {
//     return true;
//   }
// };
// var source = window.document.getElementsByTagName("body")[0];
// await docs.html(
//     source,
//     15,
//     15,
//     {
//       'width': 180,'elementHandlers': elementHandler
//     });

// doc.output("dataurlnewwindow");

// public downloadInvoiceAsPDF() {
//   const doc = new jsPDF();
 
//   const pdfTable = this.pdfTable.nativeElement;
 
//   var html = htmlToPdfmake(pdfTable.innerHTML);
   
//   const documentDefinition = { content: html };
//   pdfMake.createPdf(documentDefinition).open(); 
//   doc.save("test.pdf"); 
// }


}
