import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  styleUrls: ['./image-cropper-dialog.component.scss']
})
export class ImageCropperDialogComponent {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  selected = false;

  constructor(
    private _matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ImageCropperDialogComponent>
  ) { }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.selected = true;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  loadImageFailed() {
    this._matSnackBar.open('Invalid image file', 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'toast-error'
    });
    this.selected = false;
  }

  closeDialog() {
    this.dialogRef.close(this.croppedImage);
  }

}
