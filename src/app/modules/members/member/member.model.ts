import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Image } from 'app/models/Image';
import { FormControl } from '@angular/forms';

export class Member {
  _id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
  dob: string;
  image: string;
  images: Image[];
  active: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  marital_status: string;
  religious_status: string;
  sect: string;
  education: string;
  occupation: string;
  height: number;
  weight: number;
  complexion: string;
  body_type: string;
  plan: string;
  plan_expiry: string;
  preferences: {
    id: string,
    min_age: number,
    max_age: number,
    min_height: number,
    max_height: number,
    marital_statuses: string[],
    religious_statuses: string[],
    sects: string[],
    educations: string[],
    occupations: string[],
    complexions: string[],
    body_types: string[],
  };

  maritalStatusCtrl = new FormControl();
  religiousStatusCtrl = new FormControl();
  sectCtrl = new FormControl();
  educationCtrl = new FormControl();
  occupationCtrl = new FormControl();
  complexionCtrl = new FormControl();
  bodyTypeCtrl = new FormControl();

  /**
   * Constructor
   *
   * @param member
   */
  constructor(member?) {
    member = member || {};
    this._id = member._id || undefined;
    this.first_name = member.first_name || null;
    this.last_name = member.last_name || null;
    this.full_name = member.full_name || null;
    this.email = member.email || null;
    this.phone = member.phone || null;
    this.password = member.password || null;
    this.gender = member.gender || null;
    this.dob = member.dob || null;
    this.image = member.image || null;
    this.images = member.images || [];
    this.active = member.active ?? true;
    this.email_verified = member.email_verified ?? true;
    this.phone_verified = member.phone_verified ?? true;
    this.marital_status = member.marital_status || null;
    this.religious_status = member.religious_status || null;
    this.sect = member.sect || null;
    this.education = member.education || null;
    this.occupation = member.occupation || null;
    this.height = member.height || null;
    this.weight = member.weight || null;
    this.complexion = member.complexion || null;
    this.body_type = member.body_type || null;
    this.plan = member.plan || 'Basic';
    this.plan_expiry = member.plan_expiry || null;
    this.preferences = member.preferences || {};
    this.preferences.min_age = member.preferences?.min_age || null;
    this.preferences.max_age = member.preferences?.max_age || null;
    this.preferences.min_height = member.preferences?.min_height || null;
    this.preferences.max_height = member.preferences?.max_height || null;
    this.preferences.marital_statuses = member.preferences?.marital_statuses || [];
    this.preferences.religious_statuses = member.preferences?.religious_statuses || [];
    this.preferences.sects = member.preferences?.sects || [];
    this.preferences.educations = member.preferences?.educations || [];
    this.preferences.occupations = member.preferences?.occupations || [];
    this.preferences.complexions = member.preferences?.complexions || [];
    this.preferences.body_types = member.preferences?.body_types || [];
  }

  /**
   * Add maritalStatus
   *
   * @param {MatChipInputEvent} event
   */
  addMaritalStatus(event: MatChipInputEvent, list: string[]): void {
    const input = event.input;
    const value = event.value;

    // Add maritalStatus
    if (value && (value === 'All' || list.indexOf(value)) > -1) {
      this.preferences.marital_statuses.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove maritalStatus
   *
   * @param maritalStatus
   */
  removeMaritalStatus(maritalStatus: string): void {
    const index = this.preferences.marital_statuses.indexOf(maritalStatus);

    if (index >= 0) {
      this.preferences.marital_statuses.splice(index, 1);
    }
  }

  /**
 * Selected a maritalStatus
 *
 * @param maritalStatus
 */
  selectMaritalStatus(event: MatAutocompleteSelectedEvent, trigger: MatAutocompleteTrigger, maritalStatusInput: HTMLInputElement): void {
    const value = event.option.viewValue;
    if (value === 'Any') this.preferences.marital_statuses.length = 0;
    this.preferences.marital_statuses.push(value);
    maritalStatusInput.value = '';
    this.maritalStatusCtrl.setValue(null);
    setTimeout(() => {
      trigger.openPanel();
    }, 10);
  }

  /**
   * Add religiousStatus
   *
   * @param {MatChipInputEvent} event
   */
  addReligiousStatus(event: MatChipInputEvent, list: string[]): void {
    const input = event.input;
    const value = event.value;

    // Add religiousStatus
    if (value && list.indexOf(value) > -1) {
      this.preferences.religious_statuses.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove religiousStatus
   *
   * @param religiousStatus
   */
  removeReligiousStatus(religiousStatus: string): void {
    const index = this.preferences.religious_statuses.indexOf(religiousStatus);

    if (index >= 0) {
      this.preferences.religious_statuses.splice(index, 1);
    }
  }

  /**
 * Selected a religiousStatus
 *
 * @param religiousStatus
 */
  selectReligiousStatus(event: MatAutocompleteSelectedEvent, trigger: MatAutocompleteTrigger, religiousStatusInput: HTMLInputElement): void {
    const value = event.option.viewValue;
    if (value === 'Any') this.preferences.religious_statuses.length = 0
    this.preferences.religious_statuses.push(value);
    religiousStatusInput.value = '';
    this.religiousStatusCtrl.setValue(null);
    setTimeout(() => {
      trigger.openPanel();
    }, 10);
  }

  /**
   * Add sect
   *
   * @param {MatChipInputEvent} event
   */
  addSect(event: MatChipInputEvent, list: string[]): void {
    const input = event.input;
    const value = event.value;

    // Add sect
    if (value && list.indexOf(value) > -1) {
      this.preferences.sects.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove sect
   *
   * @param sect
   */
  removeSect(sect: string): void {
    const index = this.preferences.sects.indexOf(sect);

    if (index >= 0) {
      this.preferences.sects.splice(index, 1);
    }
  }

  /**
 * Selected a sect
 *
 * @param sect
 */
  selectSect(event: MatAutocompleteSelectedEvent, trigger: MatAutocompleteTrigger, sectInput: HTMLInputElement): void {
    const value = event.option.viewValue;
    if (value === 'Any') this.preferences.sects.length = 0
    this.preferences.sects.push(value);
    sectInput.value = '';
    this.sectCtrl.setValue(null);
    setTimeout(() => {
      trigger.openPanel();
    }, 10);
  }

  /**
   * Add education
   *
   * @param {MatChipInputEvent} event
   */
  addEducation(event: MatChipInputEvent, list: string[]): void {
    const input = event.input;
    const value = event.value;

    // Add education
    if (value && list.indexOf(value) > -1) {
      this.preferences.educations.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove education
   *
   * @param education
   */
  removeEducation(education: string): void {
    const index = this.preferences.educations.indexOf(education);

    if (index >= 0) {
      this.preferences.educations.splice(index, 1);
    }
  }

  /**
 * Selected a education
 *
 * @param education
 */
  selectEducation(event: MatAutocompleteSelectedEvent, trigger: MatAutocompleteTrigger, educationInput: HTMLInputElement): void {
    const value = event.option.viewValue;
    if (value === 'Any') this.preferences.educations.length = 0
    this.preferences.educations.push(value);
    educationInput.value = '';
    this.educationCtrl.setValue(null);
    setTimeout(() => {
      trigger.openPanel();
    }, 10);
  }

  /**
   * Add occupation
   *
   * @param {MatChipInputEvent} event
   */
  addOccupation(event: MatChipInputEvent, list: string[]): void {
    const input = event.input;
    const value = event.value;

    // Add occupation
    if (value && list.indexOf(value) > -1) {
      this.preferences.occupations.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove occupation
   *
   * @param occupation
   */
  removeOccupation(occupation: string): void {
    const index = this.preferences.occupations.indexOf(occupation);

    if (index >= 0) {
      this.preferences.occupations.splice(index, 1);
    }
  }

  /**
 * Selected a occupation
 *
 * @param occupation
 */
  selectOccupation(event: MatAutocompleteSelectedEvent, trigger: MatAutocompleteTrigger, occupationInput: HTMLInputElement): void {
    const value = event.option.viewValue;
    if (value === 'Any') this.preferences.occupations.length = 0
    this.preferences.occupations.push(value);
    occupationInput.value = '';
    this.occupationCtrl.setValue(null);
    setTimeout(() => {
      trigger.openPanel();
    }, 10);
  }

  /**
   * Add complexion
   *
   * @param {MatChipInputEvent} event
   */
  addComplexion(event: MatChipInputEvent, list: string[]): void {
    const input = event.input;
    const value = event.value;

    // Add complexion
    if (value && list.indexOf(value) > -1) {
      this.preferences.complexions.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove complexion
   *
   * @param complexion
   */
  removeComplexion(complexion: string): void {
    const index = this.preferences.complexions.indexOf(complexion);

    if (index >= 0) {
      this.preferences.complexions.splice(index, 1);
    }
  }

  /**
 * Selected a complexion
 *
 * @param complexion
 */
  selectComplexion(event: MatAutocompleteSelectedEvent, trigger: MatAutocompleteTrigger, complexionInput: HTMLInputElement): void {
    const value = event.option.viewValue;
    if (value === 'Any') this.preferences.complexions.length = 0
    this.preferences.complexions.push(value);
    complexionInput.value = '';
    this.complexionCtrl.setValue(null);
    setTimeout(() => {
      trigger.openPanel();
    }, 10);
  }


  /**
   * Add body_type
   *
   * @param {MatChipInputEvent} event
   */
  addBodyType(event: MatChipInputEvent, list: string[]): void {
    const input = event.input;
    const value = event.value;

    // Add body_type
    if (value && list.indexOf(value) > -1) {
      this.preferences.body_types.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove body_type
   *
   * @param body_type
   */
  removeBodyType(body_type: string): void {
    const index = this.preferences.body_types.indexOf(body_type);

    if (index >= 0) {
      this.preferences.body_types.splice(index, 1);
    }
  }

  /**
 * Selected a body_type
 *
 * @param body_type
 */
  selectBodyType(event: MatAutocompleteSelectedEvent, trigger: MatAutocompleteTrigger, bodyTypeInput: HTMLInputElement): void {
    const value = event.option.viewValue;
    if (value === 'Any') this.preferences.body_types.length = 0
    this.preferences.body_types.push(value);
    bodyTypeInput.value = '';
    this.bodyTypeCtrl.setValue(null);
    setTimeout(() => {
      trigger.openPanel();
    }, 10);
  }

}
