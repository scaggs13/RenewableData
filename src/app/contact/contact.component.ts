import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  message = '';
  constructor(private email: ContactService) { }

  ngOnInit() {
  }


  onSubmit() {
    this.email.sendEmail(this.message);
  }
}
