import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-customized-price',
  templateUrl: './customized-price.component.html',
  styleUrls: ['./customized-price.component.css']
})
export class CustomizedPriceComponent implements OnInit, ICellRendererAngularComp {
  duration = ''
  getDate:any;
  timeData = "86400";
  getTimes:any;
  startTime:any;
  endTime:any;
  hours:any;
  time1:any;
  time2:any;
  diff:any;
  getTimeId = localStorage.getItem('getId');
  getTotalPrice:any;
  
  constructor() { }

  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.time1 = localStorage.getItem('getExitTime');
    this.time2 = this.toHHMMSS(this.timeData); 

    this.getDate =  this.time1.split(':');
    this.getTimes = this.time2.split(':');

    this.startTime = this.getTimes[0]+ this.getTimes[1]
    this.endTime = this.getDate[0]+ this.getDate[1]

    this.diff = this.startTime - this.endTime;
  }

  // getPrice(data:any,id:any){
  //   if((this.getTimeId == id) && (data == this.hours) && (this.vehicle.category == 'bike')){
  //      return this.getTotalPrice = data*50;
  //   }else if((this.getTimeId == id) && (data == this.hours) && (this.vehicle.category == 'car')){
  //      return this.getTotalPrice = data*100;
  //   }else{
  //      return this.getTotalPrice = data*0; 
  //   }
  // }

  agInit() {
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

}
