import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Customer } from './customer';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

    this.customerForm = this.fb.group({
      firstName: '',
      lastName: '', //{value: 'n/a', disabled: true},
      email: '',
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
}
