import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FairsService } from '../../services/fairs.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userRole !: string
  constructor(private productservice: ProductsService,
    private userserive: UsersService,
    private fairservice: FairsService,
    public router: Router,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.userRole = this.authservice.getuserRole()!
    this.authservice.isLogging$.subscribe({
      next: res => {
        this.userRole = res
      }
    })
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
      this.router.navigate(['/users', res[0].userId], {
        queryParams: { userRole: res[0].userRole }
      })
    })

  }

  ongofairs() {
    this.fairservice.fetchfairs().subscribe(res => {
      this.router.navigate(['/fairs', res[0].fairId])
    })
  }

  logout() {
    this.authservice.LogOut()
    this.router.navigate([''])

  }

}
