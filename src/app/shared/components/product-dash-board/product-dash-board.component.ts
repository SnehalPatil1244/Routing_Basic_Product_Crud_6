import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-dash-board',
  templateUrl: './product-dash-board.component.html',
  styleUrls: ['./product-dash-board.component.scss']
})
export class ProductDashBoardComponent implements OnInit {
  product: Array<IProduct> = []
  constructor(private productservice: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productservice.fetchproducts().subscribe({
      next: data => {
        this.product = data
      },
      error: err => {
        console.log(err);

      }
    })
  }
  TrackByFun(index: number, product: IProduct) {
    return product.pid
  }

}
