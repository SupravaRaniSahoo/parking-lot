import { AllModules } from '@ag-grid-enterprise/all-modules';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, ColumnApi, GridApi } from 'ag-grid-community';
import { Vehicle } from '../Vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  vehicle: Vehicle = new Vehicle();
  vehicles!: Vehicle[];
  public getSessionValue:any = '';
  columnDefs!: ColDef[];
  api!: GridApi;
  columnApi!: ColumnApi;
  userToBeEditedFromParent : any ;
  newData = [];
  defaultColDef:any;
  rowSelection;
  rowGroupPanelShow;
  pivotPanelShow;
  name:any;
  timeData = "86400";
  today:any;
  getDate:any;
  getTime:any;
  getDuration:any;
  startTime:any;
  endTime:any;
  hours:any;
  time1:any;
  time2:any;
  diff:any;
  user:any;
  public modules:any = AllModules;

  constructor(private router: Router, private service: VehicleService, private routers: ActivatedRoute) { 
    this.columnDefs = this.createColumnDefs();

    this.defaultColDef = {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100
    };
    this.rowSelection = 'multiple';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
  }

  ngOnInit(): void {
    this.getVehicles();
    this.user = this.routers.snapshot.params['user'];
    // this.name = sessionStorage.getItem('name');
    // this.getSessionValue = sessionStorage.getItem('username');
    
    this.time1 = localStorage.getItem('getExitTime');
    this.time2 = this.toHHMMSS(this.timeData); 

    this.getDate =  this.time1.split(':');
    this.getTime = this.time2.split(':');

    this.startTime = this.getTime[0]+ this.getTime[1]
    this.endTime = this.getDate[0]+ this.getDate[1]

    this.diff = this.startTime - this.endTime;
    this.getDifferenceInTime();
  }

  createColumnDefs() {
    return [
        {headerName: 'Vehicle Number', field: 'vehicleNumber',valueGetter: this.getVehicleNumberCellRender},
        {headerName: 'Vehicle Category', field: 'category',valueGetter: this.getTypeCellRender},
        {headerName: 'Entry Time', field: 'entryTime',valueGetter: this.getEntryTimeCellRender},
        {headerName: 'Duration', field: 'duration',valueGetter: this.calculateDiff},
        {headerName: 'Total Price', field: 'price',valueGetter: this.getPrice},
        {headerName: 'Status', field: 'status',valueGetter: this.getStatusCellRender}
    ]
  }

  onGridReady(params:any): void {
    this.api = params.api;
    this.columnApi = params.columnApi;    
    this.api.sizeColumnsToFit();   
  }

  getDifferenceInTime(){
    if((this.diff > 40) && (this.diff < 101)){
     return this.hours = 1
    }else if((this.diff > 140) && (this.diff < 201)){
     return this.hours = 2
    }else if((this.diff > 240) && (this.diff < 301)){
      return this.hours = 3
    }else if((this.diff > 340) && (this.diff < 401)){
      return this.hours = 4
    }else if((this.diff > 440) && (this.diff < 501)){
      return this.hours = 5
    }else if((this.diff > 540) && (this.diff < 601)){
      return this.hours = 6
    }else if((this.diff > 640) && (this.diff < 701)){
      return this.hours = 7
    }else if((this.diff > 740) && (this.diff < 801)){
      return this.hours = 8
    }else if((this.diff > 840) && (this.diff < 901)){
      return this.hours = 9
    }else if((this.diff > 940) && (this.diff < 1001)){
      return this.hours = 10
    }else{
      return this.hours = 0
    }
  }


  getPrice = (params: any) =>{
    if((params.data.name == this.user) && (params.data.category == 'bike') && (params.data.status == 'ACTIVE')){
        return this.hours * 50;
    }else if((params.data.name == this.user) && (params.data.category == 'car') && (params.data.status == 'ACTIVE')){
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

  calculateDiff = (params:any) =>{
    if(params.data.name == this.user){
    let currentDate = new Date();
    params = new Date(params.data.entryTime);
     return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(params.getFullYear(), params.getMonth(), params.getDate()) ) /(1000 * 60 * 60 * 24))+" days ago"; 
    }else{
     return ; 
    }
  }

  // getExitTime =  (params:any) =>{
  //   if(params.data.name == this.getSessionValue){
  //   return params.data.exitTime;
  //  }
  // }

  getVehicleNumberCellRender =  (params:any) =>{
     if(params.data.name == this.user)
       return params.data.vehicleNumber; 
  }
  getTypeCellRender = (params:any) =>{
   if(params.data.name == this.user)
     return params.data.category; 
  }
  getNameCellRender = (params:any) =>{
   if(params.data.name == this.user)
     return params.data.name; 
  }
  getEntryTimeCellRender = (params:any) => {
   if(params.data.name == this.user)
     return params.data.entryTime; 
  }

  getStatusCellRender = (params:any) => {
    if(params.data.name == this.user)
      return params.data.status;
  }


  getVehicles(){
    this.service.getVehicleListByName(this.user).subscribe(
      data =>{
       this.vehicles = data;
    })
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

  onrowValueChanged(row:any){
    console.log("onrowValueChanged: ");
    console.log("onrowValueChanged: "+row);
  }
  

}
