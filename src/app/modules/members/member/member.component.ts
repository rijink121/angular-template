import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Member } from './member.model';
import { Location } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from 'app/services/api.service';
import { ENTER } from '@angular/cdk/keycodes';
import { toDate } from 'app/helpers.function';

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
  maritalStatuses = ['Never Married', 'Widowed/Widower', 'Divorced', 'Nikah Divorce', 'Awaiting Divorce', 'Married'];
  religiousStatuses = ['Very Religious', 'Religious', 'Not Religious', 'Prefer not to say'];
  sects = ['A Muslim', 'Ahle Hadees', 'Bohra', 'Hanabali', 'Hanafi', 'Jamat Islami', 'Maliki', 'Pathan', 'Salafi', 'Prefer not to say'];
  educations = ['Doctorate', 'Masters', 'Bachelors', 'Deploma', 'Trade School/TTC/ITI', 'Islamic Education', 'High/Secondery School', 'Less than High School', 'Prefer not to say'];
  occupations = ['Agriculture, Food and Natural Resources', 'Architecture and Construction', 'Arts, Audio/Video Technology & Communications', 'Business Management & Administration', 'Education & Training', 'Finance', 'Government & Public Administration', 'Health Science', 'Hospitality & Tourism', 'Human Services', 'Information Technology', 'Law, Public Safety, Corrections & Security', 'Manufacturing', 'Marketing, Sales and Service', 'Science, Technology, Engineering & Mathematics', 'Transportation, Distribution & Logistics', 'Prefer not to say'];
  complexions = ['Very Fair', 'Fair', 'Wheatish', 'Wheatish Brown', 'Dark', 'Prefer not to say'];
  bodyTypes = ['Slim', 'Average', 'Athletic', 'Heavy', 'Prefer not to say'];
  separatorKeysCodes: number[] = [ENTER];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    public _location: Location,
    private _matSnackBar: MatSnackBar,
    private _fuseProgressBarService: FuseProgressBarService,
    private _apiService: ApiService
  ) {
    _router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.loadForm();
      }
    });
    this.member = new Member();
    this.memberForm = this.createMemberForm();
  }

  ngOnInit(): void { }

  async loadForm(): Promise<void> {
    this._id = this._route.snapshot.paramMap.get('id');
    this.pageType = this._id === 'new' ? 'new' : 'edit';
    if (this.pageType === 'edit') {
      await this.getMember();
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
      this._matSnackBar.open(message, 'OK', {
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
      password: [this.member.password],
      gender: [this.member.gender],
      dob: [this.member.dob],
      images: [this.member.images],
      active: [this.member.active],
      email_verified: [this.member.email_verified],
      phone_verified: [this.member.phone_verified],
      marital_status: [this.member.marital_status],
      religious_status: [this.member.religious_status],
      sect: [this.member.sect],
      education: [this.member.education],
      occupation: [this.member.occupation],
      height: [this.member.height],
      weight: [this.member.weight],
      complexion: [this.member.complexion],
      body_type: [this.member.body_type],
      plan: [this.member.plan],
      plan_expiry: [this.member.plan_expiry],
      preferences: this._formBuilder.group({
        min_age: [this.member.preferences.min_age],
        max_age: [this.member.preferences.max_age],
        min_height: [this.member.preferences.min_height],
        max_height: [this.member.preferences.max_height],
        marital_statuses: [this.member.preferences.marital_statuses],
        religious_statuses: [this.member.preferences.religious_statuses],
        sects: [this.member.preferences.sects],
        educations: [this.member.preferences.educations],
        occupations: [this.member.preferences.occupations],
        complexions: [this.member.preferences.complexions],
        body_types: [this.member.preferences.body_types],
      })
    });
  }

  async saveMember(): Promise<void> {
    this._fuseProgressBarService.show();
    const member = this.memberForm.value;
    member.dob = toDate(member.dob);
    member.plan_expiry = member.plan === 'Premium' && member.plan_expiry ? toDate(member.plan_expiry) : null;
    delete member.password;
    const { error, data, message } = await this._apiService.updateById('user', this._id, this.memberForm.value);
    this._fuseProgressBarService.hide();
    if (!!error) {
      this._matSnackBar.open(message, 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'toast-error'
      });
      return;
    }
    this._matSnackBar.open('Details updated', 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'toast-success'
    });
    this.loadForm();
  }

  async addMember(): Promise<void> {
    this._fuseProgressBarService.show();
    const member = this.memberForm.value;
    member.dob = toDate(member.dob);
    member.plan_expiry = member.plan === 'Premium' && member.plan_expiry ? toDate(member.plan_expiry) : null;
    const { error, data, message } = await this._apiService.create('user', this.memberForm.value);
    this._fuseProgressBarService.hide();
    if (!!error) {
      this._matSnackBar.open(message, 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'toast-error'
      });
      return;
    }
    this._matSnackBar.open('Member created', 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'toast-success'
    });
    this._router.navigate(['/apps/members', data.user._id], { replaceUrl: true });
  }

}
