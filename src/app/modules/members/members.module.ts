import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { FuseWidgetModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MemberComponent } from './member/member.component';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChipsFilterPipe } from 'app/pipes/chips-filter.pipe';
import { ImageCropperDialogComponent } from './image-cropper-dialog/image-cropper-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [MembersComponent, MemberComponent, ChipsFilterPipe, ImageCropperDialogComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatRippleModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatChipsModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDialogModule,
    FuseSharedModule,
    FuseWidgetModule,
    ImageCropperModule
  ]
})
export class MembersModule { }
