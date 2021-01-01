import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from 'app/services/api.service';

const mimetypes = ['image/jpeg', 'image/png'];

@Component({
  selector: 'app-image-upload-dialog',
  templateUrl: './image-upload-dialog.component.html',
  styleUrls: ['./image-upload-dialog.component.scss']
})
export class ImageUploadDialogComponent {

  files: File[] = [];

  constructor(
    private _matSnackBar: MatSnackBar,
    private _fuseProgressBarService: FuseProgressBarService,
    private _apiService: ApiService,
    public dialogRef: MatDialogRef<ImageUploadDialogComponent>
  ) { }

  fileChangeEvent(event: any): void {
    for (let index = 0; index < event.target.files.length; index++) {
      const file = event.target.files[index];
      if (mimetypes.indexOf(file.type) > -1) {
        this.files.push(file);
      } else {
        this._matSnackBar.open('Image not supported', 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'toast-error'
        });
      }
    }
    event.target.value = null;
  }

  /* loadImageFailed() {
    this._matSnackBar.open('Invalid image file', 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'toast-error'
    });
    this.selected = false;
  } */

  async upload(): Promise<void> {
    const uploadedImages = [];
    this._fuseProgressBarService.show();
    for (let index = 0; index < this.files.length; index++) {
      const file = this.files[index];
      const formData: FormData = new FormData();
      formData.append('image', file, file.name);
      const { error, data, message } = await this._apiService.upload(formData);
      if (!!error) {
        this._matSnackBar.open(message, 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'toast-error'
        });
        return;
      }
      uploadedImages.push(data.image)
    }
    this._fuseProgressBarService.hide();
    this.dialogRef.close(uploadedImages);
  }

}
