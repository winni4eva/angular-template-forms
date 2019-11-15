import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  // Because a user can cancel a form or go back during form filling, we need a way to protect data
  // One way is by copying the data to another property
  postError = false;
  postErrorMessage = '';
  sunscriptionTypes: Observable<string[]>;
  originalUserSettings: UserSettings = {
    name: undefined,
    emailOffers: undefined,
    interfaceStyle: undefined,
    subscriptionType: undefined,
    notes: undefined
  };
  singleModel = 'On';

  // When a user changes a from we do not want to change originalUserSettings, we just change the copy userSettings
  // we copied using the spread opearator because we had a flat object
  // to copy a nested object we can use lodash deep clone method
  // when the user hits send or ok, we just copy the data back into originalUserSettings
  // THis protects our data just in case a user exits the form without submitting it
  userSettings: UserSettings = {...this.originalUserSettings};

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.sunscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onSubmit(form: NgForm) {
    console.log('in on submit', form.valid);
    if(form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings)
        .subscribe(
          response => console.log('success', response),
          error => this.onHttpError(error)
        );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above errors';
    }
  }

  onBlur(field: NgModel) {
    console.log('in on blur', field.valid);
  }

  onHttpError(errorResponse: any) {
    console.log('error', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage; 
  }

}
