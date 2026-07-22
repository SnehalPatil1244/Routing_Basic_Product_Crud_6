import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-dash-board',
  templateUrl: './product-dash-board.component.html',
  styleUrls: ['./product-dash-board.component.scss']
})
export class ProductDashBoardComponent implements OnInit {
  product: Array<IProduct> = []
  constructor(private productservice: ProductsService,
    private router: Router,
    private route : ActivatedRoute

  ) {  this.product = this.route.snapshot.data['products'] }

  ngOnInit(): void {
    // this.productservice.fetchproducts().subscribe({
    //   next: data => {
    //     this.product = data
    //   },
    //   error: err => {
    //     console.log(err);

    //   }
    // })
  }
  TrackByFun(index: number, product: IProduct) {
    return product.pid
  }

}
