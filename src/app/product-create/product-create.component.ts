import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  data: Product

  constructor(
    public apiService: ApiService,
    public router: Router
  ) {
    this.data = new Product();
  }

  ngOnInit() {
  }

  submitForm() {
    this.apiService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['list']);
    });

  }

}