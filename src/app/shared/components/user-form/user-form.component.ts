import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Iuser } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  isinEditMode: boolean = false
  userForm !: FormGroup
  edituser !: Iuser
  userId !: string

  constructor(private userserice: UsersService,
    private snackbar: SnackbarService,
    private router: Router,
    private Routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.addskillscontrol()
    this.isPermenantAddHandler()
    this.isAddSameHandler()
    this.patchvalueinform()
  }

  isPermenantAddHandler() {
    this.formcontrols['address'].get('current')?.valueChanges
      .subscribe(val => {
        if (this.formcontrols['address'].get('current')?.valid) {
          this.formcontrols['isAddSame'].enable()
        } else {
          this.formcontrols['isAddSame'].reset()
          this.formcontrols['isAddSame'].disable()
        }
      })
  }

  isAddSameHandler() {
    this.formcontrols['isAddSame'].valueChanges
      .subscribe(val => {
        if (val) {
          let currentAdd = this.formcontrols['address'].get('current')?.value
          this.formcontrols['address'].get('permanent')?.patchValue(currentAdd)
          this.formcontrols['address'].get('permanent')?.disable()
        } else if (this.isinEditMode && !val) {
          this.formcontrols['address'].get('permanent')?.patchValue(this.edituser.address.permanent)
          this.formcontrols['address'].get('permanent')?.enable()
        }
        else {
          this.formcontrols['address'].get('permanent')?.reset()
          this.formcontrols['address'].get('permanent')?.enable()
        }
      })

  }

  createUserForm() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userRole: new FormControl('Candidate'),
      profileDescription: new FormControl(null, Validators.required),
      profileImage: new FormControl(null, [Validators.required]),
      experienceYears: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      isAddSame: new FormControl({ value: null, disabled: true }),
      skills: new FormArray([]),

      address: new FormGroup({
        current: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        }),
        permanent: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        })
      })
    })
  }

  get formcontrols() {
    return this.userForm.controls
  }
  get skillsArr() {
    return this.formcontrols['skills'] as FormArray
  }
  addskillscontrol() {
    let skillscontrol = new FormControl(null, [Validators.required])
    this, this.skillsArr.push(skillscontrol)

  }

  onformsubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
    } else {
      let UserDetails = { ...this.userForm.getRawValue(), userId: Date.now().toString() }
      this.userserice.onadduser(UserDetails)
        .subscribe({
          next: res => {
            this.snackbar.opensnackbar(res.msg)
            this.router.navigate(['/users', res.data.userId])
          },
          error: err => {
            console.log(err);

          }
        })
    }

  }
  patchvalueinform() {
    this.userId = this.Routes.snapshot.paramMap.get('userId')!
    if (this.userId) {
      this.userserice.fetchUserById(this.userId).subscribe({
        next: res => {
          this.edituser = res
          this.isinEditMode = true
          this.userForm.patchValue(this.edituser)
          if (res.userRole === 'Candidate') {
            this.userForm.disable()
          }
          this.skillsArr.clear()
          this.edituser.skills.forEach(ele => {
            let control = new FormControl(ele)
            this.skillsArr.push(control)
          })
        }
      })
    }
  }

  onUpdate() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
    } else {
      let onupdateduser = { ...this.userForm.getRawValue(), userId: this.userId }
      this.userserice.onuserupdate(onupdateduser)
        .subscribe({
          next: res => {
            this.snackbar.opensnackbar(res.msg)
            this.router.navigate(['/users', res.data.userId])
          },
          error: err => {
            console.log(err);

          }
        })
    }

  }

}
