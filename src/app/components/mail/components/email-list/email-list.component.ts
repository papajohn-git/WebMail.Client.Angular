import { Component, OnInit, Input, Output, EventEmitter, effect, inject } from '@angular/core';
import { EmailService } from '../../../../shared/services/mail.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FolderService } from '../../../../shared/services/folder.service';
import { Folder } from '../../../../shared/interfaces/folder/folder';
import { MatMenuModule } from '@angular/material/menu';
import { MailMoveFolderDTO } from '../../../../shared/interfaces/mail/mail';

@Component({
  selector: 'app-email-list',
  imports: [ReactiveFormsModule, CommonModule, MatMenuModule],
  templateUrl: './email-list.component.html',
  styleUrl: './email-list.component.css'
})
export class EmailListComponent implements OnInit{

 @Output() mailSelected = new EventEmitter<string>();
@Input() folderName: string | null = null;

mailService = inject(EmailService);
folderService = inject(FolderService);
foldersList = this.folderService.folders;
emails = this.mailService.mails;
nonSystemFolders = this.folderService.nonSystemFolders;
// selectedFolder = this.folderService.folderSelected;



ngOnInit(): void {
  if (this.folderName) {
    this.mailService.getMailsByFolderName(this.folderName);
  }
  // this.getNonSystemFolders();
}

ngOnChanges(): void {
  if (this.folderName) {
    this.mailService.getMailsByFolderName(this.folderName);    
  }
}

onMailSelected(mailGuid: string) {
  this.mailService.getMailByGuid(mailGuid);
}

isSystemFolder(folderName: string): boolean {
  const systemFolders = ['Inbox', 'Sent Items', 'Deleted Items'];
  return systemFolders.includes(folderName);
}

moveToFolder(mailGuid: string, folderName: string): void {
  
  if (!this.folderName) {
    console.log('Folder name is not set');
    return;
  }
const mailMoveFolder: MailMoveFolderDTO = {
  guidMail: mailGuid,
  folderName: this.folderName,
  newFolderName: folderName,
};


  this.mailService.moveMailToFolder(mailMoveFolder).subscribe({
    next: (response) => {
      if (response.success) {
        if (this.folderName) {
        this.mailService.getMailsByFolderName(this.folderName);
        }
      }
    },
    error: (error) => {
      console.error('Error moving mail to folder', error);
    }
  });

}
}

