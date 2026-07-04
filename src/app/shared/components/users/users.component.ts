import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmationComponent } from '../get-confirmation/get-confirmation.component';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  UserDetails !: Iuser
  UserId !: string

  constructor(private routes: ActivatedRoute,
    private userservie: UsersService,
    private matdialog: MatDialog,
    private snackbar: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routes.params.subscribe(param => {
      this.UserId = param['userId']
      if (this.UserId) {
        this.userservie.fetchUserById(this.UserId).subscribe({
          next: data => {
            this.UserDetails = data
          },
          error: err => {
            console.log(err);

          }
        })
      }

    })

  }

  onRemove() {
    let config = new MatDialogConfig()
    config.width = '300px'
    config.disableClose = true
    config.data = `Are You Sure ? You Want To Remove this Id ${this.UserId}`
    let matref = this.matdialog.open(GetConfirmationComponent, config)
    matref.afterClosed().subscribe(res => {
      if (res) {
        this.userservie.onuserremove(this.UserDetails.userId)
          .subscribe(res => {
            this.snackbar.opensnackbar(res.msg)
            this.userservie.fetchusers()
              .subscribe(res => {
                this.router.navigate(['/users', res[0].userId])
              })
          })
      }
    })


  }

}
