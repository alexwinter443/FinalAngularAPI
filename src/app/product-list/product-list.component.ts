//student-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productsData: any;

  constructor(
    public apiService: ApiService
  ) {
    this.productsData = [];
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    //Get saved list of students
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.productsData = response;
    })
  }


  delete(item:any) {
    //Delete item in Student data
    this.apiService.deleteItem(item).subscribe(Response => {
      console.log(item)
      //Update list after delete is successful
      this.getAllProducts();
    });
  }
}