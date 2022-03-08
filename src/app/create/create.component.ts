import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from '../Vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  vehicle: Vehicle = new Vehicle();
  value:any = this.vehicle
  alert:boolean =false;
  selectedOption!: string;
  
  options = [
    { name: "bike", value: 1 },
    { name: "car", value: 2 }
  ]

  constructor(private service: VehicleService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.vehicle);
    this.saveVehicleDetails();
    this.alert = true;
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

  cancelFunction(){
    this.router.navigate(['/vehicles']);
  }

}
