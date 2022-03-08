import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../Vehicle';
import { VehicleService } from '../vehicle.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DatePipe, formatDate } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CdTimerComponent } from 'angular-cd-timer';
import { AuthenticationService } from '../authentication.service';
import { CountdownComponent } from 'ngx-countdown';
import { GetCellRendererInstancesParams } from 'ag-grid-community/dist/lib/gridApi';
import { LoginAuthenticationService } from '../login-authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  vehicle: Vehicle = new Vehicle();
  allVehicle!: Vehicle;
  vehicles!: Vehicle[];
  id!: number; 
  timer:any = 'on';
  
  alert:boolean =false;
  alertAdd:boolean = false;
  recordStatus!:number;
  currentTime:number | Date = this.vehicle.entryTime;
  time!: Date;
  priceStatus!:number;
  date:any = "";
  today:any;
  disabled = true;
  status = 'ACTIVE';

  bikeNumber: any;
  carNumber: any;
  bikeTime: any;
  carTime: any;
  timeOne: any;
  slots: any;
  name:any;
  category:any;
  filterDate:any;
  filterId:any;
  filterStatus:any;
  slotAvailable: number = 200;
  slotOccupied: number = 0;
  dataSlice: any;
  dateSlice:any;
  storeTime:any = '';

   bikeValue:any = document.getElementById("bikeS")?.style.display;
   carValue:any = document.getElementById("carS")?.style.display;
   getRows:any = document.getElementById("row");
   countdownByClass:any = document.querySelector('.stop');
   selectedOption!: string;
   bikeRate:number = 50;
   carRate:number = 100;
   submitted!:boolean;
   isDarkTheme = false;
   countdown:any;
   totalSeconds = "86400"
   search:boolean = false;
   rating:number = 0;
   val: number = 3;
   star:number = 5

   options = [
    { name: "Search by Name", value: 1 },
    { name: "Search by category", value: 2 },
    { name: "Search by Status", value: 3 }
  ]


   newData:any = [];
   timeData = "86400"
   config:any;
   showStop!:boolean;
   storedTime='';
   getStatus:any = '';
   styleforActive!: {
    color: '#008000';
   };
   styleforInActive!: {
    color: '#FF0000';
   };
   filterLength:any='';
   slotColor:any='';
   getId = localStorage.getItem('getId');
   @Input() getSessionUsername = sessionStorage.getItem('username');
  
  

  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild( 'basicTimer', { static: false } ) basicTimer! : CdTimerComponent;
  @ViewChild('cd', { static: false }) cd!: CountdownComponent;

  constructor(private fb: FormBuilder, public service: VehicleService, private router: Router, private routers: ActivatedRoute, private overlay: OverlayContainer, private datePipe: DatePipe, public services: AuthenticationService, public loginService: LoginAuthenticationService) { 
  
  } 

  ngOnInit(): void {
    this.id = this.routers.snapshot.params['id'];
    this.config = {leftTime: this.timeData, demand:true};

    console.log(this.toHHMMSS(this.timeData));

    setTimeout(() => {
      this.getVehicles();
    },1000)

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
    this.getStatus = 'ACTIVE'
  }

  emptyTable(){
    if(this.vehicles.length == 0)
     return false;
     else
     return true
  }

  get activeRows(): number {
    return this.slotAvailable - this.filterLength;
  }
  

  start(){
    this.config = {leftTime:this.timeData, demand:false};
    this.showStop=true;
  }
  stop(){
     this.config = {leftTime:this.timeData, demand:true};
     this.showStop=false;
  }

  handleEvent(event:any, id:any){
    console.log(event);
    this.storeTime = event.text;
    console.log(this.storeTime);
    sessionStorage.setItem('getExitTime', this.storeTime);
    localStorage.setItem('getId', id);
  }

  startTime(){
    this.cd.begin();
  }

  stopTime(id:any){
    this.saveVehiclesDetails(id);
    let alertText = window.confirm("Do you want to save the exit-time ?");
    if(alertText && localStorage.getItem('getId') == id) {
      this.timer = 'on'
      this.cd.stop();
      return this.getStatus = 'INACTIVE';
    }else if(!alertText && localStorage.getItem('getId') == id){
      this.timer = 'off'
      this.alertAdd = false;
      this.cd.resume();
      return this.getStatus ;
    }else{
      return ;
    }
  }


  toggleTheme(){
  this.isDarkTheme = !this.isDarkTheme;
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


  getVehicles(){
    this.service.getVehicleList().subscribe(
      data =>{
        console.log(data);
       this.vehicles = data;
       this.slotOccupied = this.vehicles.length;
      //  console.log(this.slotOccupied);
       this.filterLength = this.vehicles.filter(i => i.status == 'ACTIVE').length;
       this.slots = this.slotAvailable - this.slotOccupied;
       this.dataSlice = this.vehicles.slice(0,10);
       this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
       console.log(this.today);
    })
  }


  getDateFromVehicles(data:any){
    this.date = data.slice(0,10);
    if(this.date == this.today){
      return true;
    }else{
      return false;
    }
  }

  saveVehicleDetails(){
    this.service.createVehicle(this.vehicle).subscribe(
      data =>{console.log(data);
        this.goToVehicleList();
      }
    );
  }

  closeAlert(){
    this.alert = false;
  }

  goToVehicleList(){
    this.router.navigate(['/vehicles']);
  }

  goToHistory(){
    this.router.navigate(['/history']);
  }

  getVehicleDetails(){
    this.service.getVehicleList
  }

  updateVehicle(id: number){
    this.router.navigate(['update', id]);
  }

  addTime(id: number){
    this.router.navigate(['add-time', id]);
  }

  deleteVehicle(id: number){
    this.service.deleteVehicleById(id).subscribe(
      data => {
        console.log(data);
        this.getVehicles();
        this.alert = true;
      }
    )
  }


  viewVehicle(id: number){
    this.disabled = false;
    this.router.navigate(['invoice', id]);
  }

  
  searchByName(){
    if(this.name == ""){
      this.ngOnInit();
    }else{
      this.vehicles = this.vehicles.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }

  searchByCategory(){
    if(this.category == ""){
      this.ngOnInit();
    }else{
      this.vehicles = this.vehicles.filter(res => {
        return res.category.toLocaleLowerCase().match(this.category.toLocaleLowerCase());
      })
    }
  }

  searchByStatus(){
    if(this.filterStatus == ""){
      this.ngOnInit();
    }else{
      this.vehicles = this.vehicles.filter(res => {
        return res.status.toLocaleLowerCase().match(this.filterStatus.toLocaleLowerCase());
      })
    }
  }

  searchById(){
    if(this.filterId == ""){
      this.ngOnInit();
    }else{
      this.vehicles = this.vehicles.filter(res => {
        return res.parkingId.toString().toLocaleLowerCase().match(this.filterId.toLocaleLowerCase());
      })
    }
  }

  searchByEntryTime(){
    if(this.filterDate == ""){
      this.ngOnInit();
    }else{
      this.vehicles = this.vehicles.filter(res => {
        return res.parkingId.toString().toLocaleLowerCase().match(this.filterDate.toLocaleLowerCase());
      })
    }
  }
  
  showRows(){
     alert("Abvailable slot : " + (this.slotAvailable - this.slotOccupied));
  }

  actionMethod(event: any) {
    event.target.disabled = true;
  }

  availableSlotsChange(){
    if(this.activeRows<200 && this.activeRows>=197){
      this.slotColor = 'success';
    }else if(this.activeRows>=195 && this.activeRows<197){
      this.slotColor = 'warning';
    }else if(this.activeRows<195){
      this.slotColor = 'danger';
    }else{
      this.slotColor = '';
    }
  }


  closeAlertAdd(){
    this.alertAdd = false
  }

  saveVehiclesDetails(id:any){
    this.service.addVehicle(id,this.vehicle).subscribe(
      data =>{console.log(data);
        this.goToVehicleList();
      }
    );
    this.alertAdd = true;
  }


}
