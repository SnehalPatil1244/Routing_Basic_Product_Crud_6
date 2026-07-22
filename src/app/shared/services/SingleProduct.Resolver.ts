import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { IProduct } from "../models/product";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductsService } from "./products.service";

@Injectable({
  providedIn: "root"
})
export class newResolverComponent implements Resolve<IProduct | IProduct[]> {
  private productservice = inject(ProductsService)
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProduct | IProduct[] | Observable<IProduct | IProduct[]> | Promise<IProduct | IProduct[]> {
    let productId = route.paramMap.get('productId')
    if (productId) {
      return this.productservice.fetchproductById(productId)
    } else {
      return this.productservice.fetchproducts()
    }
  }
}





