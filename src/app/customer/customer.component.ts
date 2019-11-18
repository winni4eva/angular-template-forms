import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;

  // This is our data model, this matches the data passed to and from our server
  customer = new Customer();

  // Form builder is a service so we can utilize dependency injection to initialize it
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // This is our form model and helps us track our forms values and state
    // Matches up to our form structure in the template
    // Instead of using FormGroup we can use FormBuilder to simplify the form model
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true)
    // });

    // If a user select the phone notification option the phone formControl needs to be required
    // If the user selects en email notification then the phone field is not required
    this.customerForm = this.fb.group({
      firstName: ['', [
        Validators.required, Validators.minLength(3)
      ]],
      lastName: ['', [
        Validators.required, Validators.maxLength(50)
      ]], //{value: 'n/a', disabled: true},
      email: ['', [
        Validators.required, Validators.email
      ]],
      phone: '',
      notification: 'email',
      sendCatalog: true
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  populateTestData(): void {
    // setValue is used to add data to every formControl in a forms model
    // To update specific formControls we can use patchValue
    this.customerForm.setValue({
      firstName: 'Adam',
      lastName: 'Winnipass',
      email: 'adams4lyf@gmail.com',
      sendCatalog: false
    })
  }

  setNotificationVia(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if(notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators()
    }
    phoneControl.updateValueAndValidity();
  }
}
