import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  // Because a user can cancel a form or go back during form filling, we need a way to protect data
  // One way is by copying the data to another property

  originalUserSettings: UserSettings = {
    name: 'Miles Toots',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'here are some notes'
  };

  // When a user changes a from we do not want to change originalUserSettings, we just change the copy userSettings
  // we copied using the spread opearator because we had a flat object
  // to copy a nested object we can use lodash deep clone method
  // when the user hits send or ok, we just copy the data back into originalUserSettings
  // THis protects our data just in case a user exits the form without submitting it
  userSettings: UserSettings = {...this.originalUserSettings};

  constructor() { }

  ngOnInit() {
  }

}
