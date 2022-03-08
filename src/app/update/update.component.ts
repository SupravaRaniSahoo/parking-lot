import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../Vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  id!: number;
  vehicle: Vehicle = new Vehicle();
  vehicles!: Vehicle;
  alert:boolean =false;
  selectedOption!: string;
  
  options = [
    { name: "bike", value: 1 },
    { name: "car", value: 2 }
  ]

  constructor(private service: VehicleService, private router: ActivatedRoute, private routers: Router) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.service.getVehicleById(this.id).subscribe(
      data => {this.vehicle = data}
    )
  }
  onSubmit(){
    this.service.updateVehicleDetails(this.id, this.vehicle).subscribe(
      data => {
        console.log(data);
        this.goToVehicleList();
        this.alert = true;
      }
    )
  }

  closeAlert(){
    this.alert = false;
  }
   
  goToVehicleList(){
    this.routers.navigate(['/vehicles']);
  }

  cancelFunction(){
    this.routers.navigate(['/vehicles']);
  }
  

}
