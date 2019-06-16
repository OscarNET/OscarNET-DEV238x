import { Component, OnInit } from '@angular/core';
import { Contact } from '../../model/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactModel: Contact = new Contact('', '', 'Queries', '');

  constructor() { }

  ngOnInit() {
  }

  changeSubject(subject: string) {
    this.contactModel.subject = subject;
  }
}
