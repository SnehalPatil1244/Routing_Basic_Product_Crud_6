import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { IProduct } from "../models/product";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { ProductsService } from "./products.service";


@Injectable({
    providedIn: "root"
})
export class productResolver implements Resolve<IProduct[]> {
    private productservice = inject(ProductsService)
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProduct[] | Observable<IProduct[]> | Promise<IProduct[]> {
        return this.productservice.fetchproducts()
    }

}