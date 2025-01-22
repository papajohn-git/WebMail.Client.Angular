import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MailCreateDTO } from '../../../../../shared/interfaces/mail/mail';
import { EmailService } from '../../../../../shared/services/mail.service';
import { Router } from '@angular/router';
import { UserService } from '../../../../../shared/services/user.service.service';

@Component({
  selector: 'app-write-email',
  imports: [FormsModule, MatInputModule, MatAutocompleteModule, MatFormFieldModule, ReactiveFormsModule, MatChipsModule, MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './write-email.component.html',
  styleUrl: './write-email.component.css'
})
export class WriteEmailComponent implements OnInit{

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  // readonly allRecipients = signal<any[]>([
  //   // { email: 'john@example.com', name: 'John Doe' },
  //   // { email: 'george@example.com', name: 'George Smith' },
  //   // { email: 'maria@example.com', name: 'Maria Garcia' }
  //   { "email": "john.doe@example.com", "name": "John Doe" },
  //   { "email": "george.smith@example.com", "name": "George Smith" },
  //   { "email": "maria.garcia@example.com", "name": "Maria Garcia" },
  //   { "email": "alice.johnson@example.com", "name": "Alice Johnson" },
  //   { "email": "bob.brown@example.com", "name": "Bob Brown" },
  //   { "email": "charlie.davis@example.com", "name": "Charlie Davis" },
  //   { "email": "diana.wilson@example.com", "name": "Diana Wilson" },
  //   { "email": "edward.miller@example.com", "name": "Edward Miller" },
  //   { "email": "fiona.taylor@example.com", "name": "Fiona Taylor" },
  //   { "email": "george.anderson@example.com", "name": "George Anderson" },
  //   { "email": "hannah.thompson@example.com", "name": "Hannah Thompson" },
  //   { "email": "ian.james@example.com", "name": "Ian James" },
  //   { "email": "julia.martinez@example.com", "name": "Julia Martinez" },
  //   { "email": "kevin.lee@example.com", "name": "Kevin Lee" },
  //   { "email": "linda.hall@example.com", "name": "Linda Hall" },
  //   { "email": "michael.wright@example.com", "name": "Michael Wright" },
  //   { "email": "nina.jones@example.com", "name": "Nina Jones" },
  //   { "email": "oliver.brown@example.com", "name": "Oliver Brown" },
  //   { "email": "paula.white@example.com", "name": "Paula White" },
  //   { "email": "quinn.harris@example.com", "name": "Quinn Harris" },
  //   { "email": "ryan.clark@example.com", "name": "Ryan Clark" },
  //   { "email": "sara.lewis@example.com", "name": "Sara Lewis" },
  //   { "email": "tom.robinson@example.com", "name": "Tom Robinson" },
  //   { "email": "uma.walker@example.com", "name": "Uma Walker" },
  //   { "email": "victor.hall@example.com", "name": "Victor Hall" },
  //   { "email": "wendy.young@example.com", "name": "Wendy Young" },
  //   { "email": "xander.king@example.com", "name": "Xander King" },
  //   { "email": "yara.scott@example.com", "name": "Yara Scott" },
  //   { "email": "zachary.adams@example.com", "name": "Zachary Adams" },
  //   { "email": "aaron.baker@example.com", "name": "Aaron Baker" },
  //   { "email": "brittany.carter@example.com", "name": "Brittany Carter" },
  //   { "email": "carl.davis@example.com", "name": "Carl Davis" },
  //   { "email": "daisy.evans@example.com", "name": "Daisy Evans" },
  //   { "email": "edna.foster@example.com", "name": "Edna Foster" },
  //   { "email": "frank.garcia@example.com", "name": "Frank Garcia" },
  //   { "email": "grace.hughes@example.com", "name": "Grace Hughes" },
  //   { "email": "harry.james@example.com", "name": "Harry James" },
  //   { "email": "isabella.kim@example.com", "name": "Isabella Kim" },
  //   { "email": "jackson.lee@example.com", "name": "Jackson Lee" },
  //   { "email": "katherine.morris@example.com", "name": "Katherine Morris" },
  //   { "email": "luke.nelson@example.com", "name": "Luke Nelson" },
  //   { "email": "molly.ortiz@example.com", "name": "Molly Ortiz" },
  //   { "email": "nathan.perez@example.com", "name": "Nathan Perez" },
  //   { "email": "olivia.quinn@example.com", "name": "Olivia Quinn" },
  //   { "email": "peter.ramirez@example.com", "name": "Peter Ramirez" },
  //   { "email": "quincy.sanders@example.com", "name": "Quincy Sanders" }
  // ]);
  readonly selectedRecipients = signal<any[]>([]);
  readonly announcer = inject(LiveAnnouncer);
  mailService = inject(EmailService);
  router = inject(Router);
  userService = inject(UserService);

  allRecipients = this.userService.mailsFullnames();

  ngOnInit(): void {
    this.userService.getAllEmailsFullNames();
  }
  

  emailControl = new FormControl();
  filteredRecipients: Observable<any[]>;

  constructor() {
    this.filteredRecipients = this.emailControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    const selectedEmails = this.selectedRecipients().map(recipient => recipient.email.toLowerCase());
    return this.allRecipients.filter(recipient =>
      (recipient.email.toLowerCase().includes(filterValue) || recipient.fullName?.toLowerCase().includes(filterValue)) &&
      !selectedEmails.includes(recipient.email.toLowerCase())
    );
  }

  addRecipient(recipient: any): void {
    this.selectedRecipients.update(recipients => [...recipients, recipient]);
    this.emailControl.setValue('');
  }

  removeRecipient(recipient: any): void {
    this.selectedRecipients.update(recipients => recipients.filter(r => r !== recipient));
    this.announcer.announce(`Removed ${recipient.name}`);
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  newMail : MailCreateDTO = {
    subject: '',
    body: '',
    recipients: []
  };

  get isFormValid(): boolean {
    return this.selectedRecipients().length > 0;
  }

  onSubmit() {
    if (!this.isFormValid) {
      console.error('No recipients selected');
      return;
    }
    
    const emailData = {
      ...this.newMail,
      recipients: this.selectedRecipients().map(recipient => recipient.email) // Extract only emails
    };
    this.mailService.sendEmail(emailData).subscribe({
      next: response  => {
        // console.log('Email sent successfully:', response.message);
        this.router.navigate(['/mail']);
      },
      error: error => {
        console.error('Error sending email:', error);
      }
    });
  }

  clearRecipientInput() {
    const val = this.emailControl.getRawValue();
    console.log('Clearing input field',val);
    this.emailControl.setValue(''); // Clear the input field
  }
}