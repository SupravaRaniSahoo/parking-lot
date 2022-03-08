import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, ColumnApi, GridApi, Module } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Vehicle } from '../Vehicle';
import { VehicleService } from '../vehicle.service';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { CustomizedCellComponent } from '../customized-cell/customized-cell.component';
import { CustomizedPriceComponent } from '../customized-price/customized-price.component';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  id!:number;
  vehicle!: Vehicle;
  vehicles!: Vehicle[];
  arr:any[] = new Array;
  lengthOfVehicles:number = 0;
  dataSlice:any;
  pageSize:number = 10;
  length:number = 200;
  date:any = "";
  today:any;
  dateSlice:any;
  startDate:any;
  endDate:any;
  getTime:any;
  getDiffTime:any;
  name!: string;
  status:any;

  // calculateDiff:any;

  columnDefs!: ColDef[];
  api!: GridApi;
  columnApi!: ColumnApi;
  userToBeEditedFromParent : any ;
  newData = [];
  defaultColDef:any;
  rowSelection;
  rowGroupPanelShow;
  pivotPanelShow;
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
  getTotalPrice:any;
  getId = localStorage.getItem('getId');
  public frameworkComponents:any;
  public modules:any = AllModules;
  public statusBar:any;
 

  constructor(private router: ActivatedRoute, private service: VehicleService, private routers: Router, private datePipe: DatePipe) { 
    this.columnDefs = this.createColumnDefs();

  this.frameworkComponents = {
    customizedComponent: CustomizedCellComponent,
    customizedPriceComponent: CustomizedPriceComponent
  };

  this.defaultColDef = {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      floatingFilter: true
    };
    this.rowSelection = 'multiple';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
  }

  ngOnInit(): void {
    // this.getVehicles();
    this.getVehiclesByStatus();

    this.time1 = localStorage.getItem('getExitTime');
    this.time2 = this.toHHMMSS(this.timeData); 

    this.getDate =  this.time1.split(':');
    this.getTimes = this.time2.split(':');

    this.startTime = this.getTimes[0]+ this.getTimes[1]
    this.endTime = this.getDate[0]+ this.getDate[1]

    this.diff = this.startTime - this.endTime;

    this.getDifferenceInTime();

    // this.status = this.router.snapshot.params['status'];
    // this.id = this.router.snapshot.params['id'];
    // this.service.getVehicleById(this.id).subscribe(
    //   data => {this.vehicle = data}
    // )
   }

   createColumnDefs() {
    return [
        {headerName: 'Vehicle Number', field: 'vehicleNumber',headerCheckboxSelection: true,
         headerCheckboxSelectionFilteredOnly: true,
         checkboxSelection: true,valueGetter: this.getVehicleNumberCellRender},
        {headerName: 'Vehicle Category', field: 'category',valueGetter: this.getTypeCellRender},
        {headerName: 'Name', field: 'name',valueGetter: this.getNameCellRender},
        {headerName: 'Entry Time(yyyy-mm-ddThh:mm:ss)', field: 'entryTime',valueGetter: this.getEntryTimeCellRender},
        {headerName: 'Duration', field: 'duration',valueGetter: this.calculateDiff,cellRenderer: "customizedComponent"},
        {headerName: 'Total Price', field: 'price',valueGetter: this.getTotalPriceOfVehicle},
        {headerName: 'Exit Time(hh:mm:ss)', field: 'exitTime',valueGetter: this.getExitTimeCellRender}
   ]
  }

  onGridReady(params:any): void {
    this.api = params.api;
    this.columnApi = params.columnApi;    
    this.api.sizeColumnsToFit();   
  }

  getDifference = (params:any) => {
    this.time1 = params.data.exitTime;
    this.time2 = this.toHHMMSS(this.timeData); 

    this.getDate =  this.time1.split(':');
    this.getTimes = this.time2.split(':');

    this.startTime = this.getTimes[0]+ this.getTimes[1]
    this.endTime = this.getDate[0]+ this.getDate[1]

    this.diff = this.startTime - this.endTime;
  }

  getDifferenceInTime = () => {
    if(this.diff > 40 && this.diff < 101){
      return this.hours = 1
    }else if(this.diff > 140 && this.diff < 201){
      return this.hours = 2
    }else if(this.diff > 240 && this.diff < 301){
      return this.hours = 3
    }else if(this.diff > 340 && this.diff < 401){
      return this.hours = 4
    }else if(this.diff > 440 && this.diff < 501){
      return this.hours = 5
    }else if(this.diff > 540 && this.diff < 601){
      return this.hours = 6
    }else if(this.diff > 640 && this.diff < 701){
      return this.hours = 7
    }else if(this.diff > 740 && this.diff < 801){
      return this.hours = 8
    }else if(this.diff > 840 && this.diff < 901){
      return this.hours = 9
    }else if(this.diff > 940 && this.diff < 1001){
      return this.hours = 10
    }else{
      return this.hours = 0
    }
  }

  // getPrice = (params: any) =>{
  //   this.getDifference(params);
  //   this.getDifferenceInTime();

  //   if((params.data.status == 'INACTIVE') && (params.data.category == 'bike') && (this.hours == 1 || this.hours == 2 || this.hours == 3 || this.hours == 4 || this.hours == 5)){
  //       return this.hours * 50;
  //   }else if((params.data.status == 'INACTIVE') && (params.data.category == 'car') && (this.hours == 1 || this.hours == 2 || this.hours == 3 || this.hours == 4 || this.hours == 5)){
  //       return this.hours * 100;     
  //   }else{
  //     return ;
  //   }
  // }

  getTotalPriceOfVehicle = (params:any) =>{
    if((params.data.status == 'INACTIVE') && (params.data.category == 'bike')){
      return this.hours * 50;
    }else if((params.data.status == 'INACTIVE') && (params.data.category == 'car')){
      return this.hours * 100;     
    }else{
      return ;
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

  //  getVehicles(){
  //   this.service.getVehicleList().subscribe(
  //     data =>{
  //      this.vehicles = data;
  //      this.lengthOfVehicles = this.vehicles.length;
  //      this.dataSlice = this.vehicles.slice(0,10);
  //      this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  //      console.log(this.today);
  //   })
  // }

  getVehiclesByStatus(){
    this.service.getVehicleListByStatus().subscribe(
        data =>{
        this.vehicles = data;
        this.lengthOfVehicles = this.vehicles.length;
        this.dataSlice = this.vehicles.slice(0,10);
        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        console.log(this.today);
      })
  }

  // getDateFromVehicles(data:any){
  //   this.date = data.slice(0,10);
  //   if(this.date == this.today){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }

   calculateDiff = (params:any) =>{
    if(params.data.status == 'INACTIVE'){
    let currentDate = new Date();
    params = new Date(params.data.entryTime);
     return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(params.getFullYear(), params.getMonth(), params.getDate()) ) /(1000 * 60 * 60 * 24))+" days ago"; 
    }else{
     return ; 
    }
  }

   getExitTime =  (params:any) =>{
     if(this.getId == params.data.parkingId && params.data.status == 'INACTIVE'){
     params.data.exitTime = localStorage.getItem('getExitTime');
     return params.data.exitTime;
    }
   }

  getVehicleNumberCellRender = function (params:any){
      if(params.data.status == 'INACTIVE')
        return params.data.vehicleNumber; 
   }
  getTypeCellRender = function (params:any){
    if(params.data.status == 'INACTIVE')
      return params.data.category; 
   }
  getNameCellRender = function (params:any){
    if(params.data.status == 'INACTIVE')
      return params.data.name; 
   }
  getEntryTimeCellRender = function (params:any){
    if(params.data.status == 'INACTIVE')
      return params.data.entryTime; 
   }
  getExitTimeCellRender = function (params:any){
  if(params.data.status == 'INACTIVE')
    return params.data.exitTime; 
   }

onSelectionChanged() {
  var selectedRows = this.api.getSelectedRows();
  this.userToBeEditedFromParent = selectedRows;
  console.log(this.userToBeEditedFromParent);

  var selectedRowsString = "";
  selectedRows.forEach(function(selectedRow, index) {
    if (index > 5) {
      return;
    }
    if (index !== 0) {
      selectedRowsString += ", ";
    }
    selectedRowsString += selectedRow.id;
  });
  if (selectedRows.length >= 5) {
    selectedRowsString += " - and " + (selectedRows.length - 5) + " others";
  }
}

onBtExport() {
  this.api.exportDataAsExcel({
    onlySelected: (document.querySelector(
      '#selectedOnly'
    ) as HTMLInputElement).checked,
  });
}


onrowValueChanged(row:any){
  console.log("onrowValueChanged: ");
  console.log("onrowValueChanged: "+row);
}


backFunction(){
  this.routers.navigate(['/vehicles']);
} 
   
}

