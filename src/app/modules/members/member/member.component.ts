import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Member } from './member.model';
import { Location } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class MemberComponent implements OnInit {

  _id: string;
  member: Member;
  memberForm: FormGroup;
  pageType = 'new';

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    public _location: Location,
    private _matSnackBar: MatSnackBar,
    private _fuseProgressBarService: FuseProgressBarService,
    private _apiService: ApiService
  ) {
    this.member = new Member();
    this.memberForm = this.createMemberForm();
  }

  async ngOnInit(): Promise<void> {
    this._id = this._route.snapshot.paramMap.get('id');
    this.pageType = this._id === 'new' ? 'new' : 'edit';
    if (this.pageType === 'edit') {
      await this.getMember();
      console.log(this.member);
      this.memberForm = this.createMemberForm();
    }
  }

  async getMember(): Promise<void> {
    this._fuseProgressBarService.show();
    const { error, data, message } = await this._apiService.getById('user', this._id, {
      // populate: ['user', 'manager', 'division', 'region', 'office', 'stage']
    });
    this._fuseProgressBarService.hide();
    if (!!error) {
      this._matSnackBar.open(message, 'Ok', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'toast-error'
      });
      return;
    }
    this.member = new Member(data.user);
  }

  /**
    * Create member form
    *
    * @returns {FormGroup}
  */
  createMemberForm(): FormGroup {
    return this._formBuilder.group({
      first_name: [this.member.first_name],
      last_name: [this.member.last_name],
      email: [this.member.email],
      phone: [this.member.phone],
      gender: [this.member.gender],
      dob: [this.member.dob],
      tags: [this.member.tags],
      images: [this.member.images],
      active: [this.member.active]
    });
  }

}
