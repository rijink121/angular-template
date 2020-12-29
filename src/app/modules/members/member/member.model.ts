import { MatChipInputEvent } from '@angular/material/chips';
import { Image } from 'app/models/Image';

export class Member {
  _id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  images: Image[];
  tags: string[];
  active: boolean;

  /**
   * Constructor
   *
   * @param member
   */
  constructor(member?) {
    member = member || {};
    this._id = member._id || undefined;
    this.first_name = member.first_name || '';
    this.last_name = member.last_name || '';
    this.full_name = member.full_name || '';
    this.email = member.email || '';
    this.phone = member.phone || '';
    this.gender = member.gender || '';
    this.dob = member.dob || '';
    this.images = member.images || [];
    this.tags = member.tags || [];
    this.active = member.active || true;
  }

  /**
   * Add tag
   *
   * @param {MatChipInputEvent} event
   */
  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if (value) {
      this.tags.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove tag
   *
   * @param tag
   */
  removeTag(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
