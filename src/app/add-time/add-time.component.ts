import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../Vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-add-time',
  templateUrl: './add-time.component.html',
  styleUrls: ['./add-time.component.css']
})
export class AddTimeComponent implements OnInit {

  vehicle: Vehicle = new Vehicle();
  value:any = this.vehicle
  alert:boolean =false;
  selectedOption!: string;
  id!: number;
  // getExitTime = localStorage.getItem('getExitTime');
  
  constructor(private service: VehicleService, private router: Router, private routers:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.routers.snapshot.params['id'];
  }

  onSubmit(){
    console.log(this.vehicle);
    this.saveVehicleDetails();
    this.alert = true;
  }

  saveVehicleDetails(){
    this.service.addVehicle(this.id,this.vehicle).subscribe(
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

  cancelFunction(){
    this.router.navigate(['/vehicles']);
  }

}
