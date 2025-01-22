import { Component, inject, OnInit } from '@angular/core';
import { Folder } from '../../shared/interfaces/folder/folder';
import { FolderListComponent } from './components/folder-list/folder-list.component';
import { EmailListComponent } from './components/email-list/email-list.component';
import { EmailPreviewComponent } from './components/email-preview/email-preview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../shared/services/mail.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mail',
  imports: [FolderListComponent, EmailPreviewComponent, EmailListComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.css'
})
export class MailComponent implements OnInit {
  mailService = inject(EmailService);
  selectedFolderName = this.mailService.selectedFolderName;
  emails = this.mailService.mails;
  selectedMail = this.mailService.mail;

  ngOnInit(): void {}

  onFolderSelected(folderName: string) {
    this.selectedFolderName.set(folderName);
    this.mailService.getMailsByFolderName(folderName);
  }

  onMailSelected(mailId: string) {
    this.mailService.getMailByGuid(mailId);
  }

}
