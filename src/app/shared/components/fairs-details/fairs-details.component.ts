import { Component, OnInit } from '@angular/core';
import { Ifairs } from '../../models/fairs';
import { ActivatedRoute, Params } from '@angular/router';
import { FairsService } from '../../services/fairs.service';

@Component({
  selector: 'app-fairs-details',
  templateUrl: './fairs-details.component.html',
  styleUrls: ['./fairs-details.component.scss']
})
export class FairsDetailsComponent implements OnInit {
  fairsId !: string
  fairsObj !: Ifairs

  constructor(private routes: ActivatedRoute,
    private fairsservice: FairsService
  ) { }

  ngOnInit(): void {
    this.routes.params.subscribe((params: Params) => {
      this.fairsId = params['fairsId']
      if (this, this.fairsId) {
        this.fairsservice.fetchfairsById(this.fairsId).subscribe({
          next: res => {
            this.fairsObj = res

          },
          error: err => {
            console.log(err);

          }
        })
      }
    })
  }

}
