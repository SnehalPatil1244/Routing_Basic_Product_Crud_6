import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FairsService } from '../../services/fairs.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private productservice: ProductsService,
    private userserive: UsersService,
    private fairservice : FairsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ongoproducts() {
    this.productservice.fetchproducts().subscribe(res => {
      this.router.navigate(['/products', res[0].pid], {
        queryParams: { cr: res[0].canReturn }
      })
    })

  }

  ongouser() {
    this.userserive.fetchusers().subscribe(res => {
      this.router.navigate(['/users', res[0].userId],{
        queryParams : { userRole : res[0].userRole}
      })
    })

  }

  ongofairs(){
    this.fairservice.fetchfairs().subscribe(res => {
      this.router.navigate(['/fairs', res[0].fairId])
    })
  }

}
