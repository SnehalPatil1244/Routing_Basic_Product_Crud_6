import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.component.html',
  styleUrls: ['./user-dash-board.component.scss']
})
export class UserDashBoardComponent implements OnInit {
  UserArr: Iuser[] = []
  constructor(private userservice: UsersService) { }

  ngOnInit(): void {
    this.getusers()

  }

  getusers() {
    this.userservice.fetchusers()
      .subscribe({
        next: data => {
          this.UserArr = data
        },
        error: err => {
          console.log(err);

        }
      })
  }

}
