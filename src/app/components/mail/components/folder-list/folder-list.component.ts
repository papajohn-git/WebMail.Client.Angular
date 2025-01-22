import { Component,EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { FolderService } from '../../../../shared/services/folder.service';
// import { Folder } from '../../../../shared/interfaces/folder/folder';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { effect } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service.service';
// import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
// import { signal, effect } from '@angular/core';
 import { Folder } from '../../../../shared/interfaces/folder/folder';

@Component({
  selector: 'app-folder-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatMenuModule, MatTooltipModule],
  templateUrl: './folder-list.component.html',
  styleUrl: './folder-list.component.css'
})
export class FolderListComponent implements OnInit {

  @Output() folderSelected = new EventEmitter<string>();

  folderService = inject(FolderService);
   folders = this.folderService.folders;
   userService = inject(UserService);
   user = this.userService.user;
   newFolderName: string = '';
   tempFolderName: string = '';
   isAddingNewFolder: boolean = false;
   nonSystemFolders = this.folderService.nonSystemFolders;
  //  selectedFolder = this.folderService.folderSelected;
   

   folderIcons: { [key: string]: string } = {
    'Inbox': 'fa fa-inbox',
    'Sent': 'fa fa-paper-plane',
    'Deleted Items': 'fa fa-trash'
  };

  ngOnInit(): void {
    this.folderService.getFolders();
    this.selectFolder('Inbox');
    
  }

  getFolderIcon(folderName: string): string {
    return this.folderIcons[folderName] || 'fa fa-folder';
  }

  selectFolder(folder: string): void {
    this.folderSelected.emit(folder);
    // console.log('Selected Folder:', folder);
 }

 addFolder() {
  if (this.tempFolderName.trim()) {
    this.folderService.addFolder(this.tempFolderName).subscribe({
      next: (response) => {
        if (response.success) {
          // console.log('Folder added successfully');
          this.newFolderName = '';
          this.folderService.getFolders();
          // this.isAddingNewFolder = false;
        }
      },
      error: (error) => {
        console.error('Error adding folder', error);
      }
    });
  }
}

isSystemFolder(folder: string) {
  
  const systemFolders = ['Inbox', 'Sent Items', 'Deleted Items'];
   return systemFolders.includes(folder);
}

deleteFolder(folder: number): void {
  // Implement the logic to delete the folder
  console.log(`Deleting folder: ${folder}`);
  this.folderService.deleteFolder(folder).subscribe({
    next: (response) => {
      if (response.success) {
        // console.log('Folder deleted successfully');
        this.folderService.getFolders();
        this.selectFolder('Inbox');
      }
    },
    error: (error) => {
      console.error('Error deleting folder', error);
    }
  });
}

showNewFolderInput() {
  this.isAddingNewFolder = true;
  this.tempFolderName = this.newFolderName;
}

hideNewFolderInput() {
  //  console.log('Hiding new folder input');
  setTimeout(() => {
    this.isAddingNewFolder = false;
    this.newFolderName = ''; // Reset the input field
}, 1000);
}

copyFolderName(folderName: string) {
  this.tempFolderName = folderName;
}

}
