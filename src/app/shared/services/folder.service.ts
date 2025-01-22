import { Injectable } from '@angular/core';
import { Folder } from '../interfaces/folder/folder';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { signal, effect } from '@angular/core';
import { ApiResponse } from '../interfaces/apirespone/apiresponse';

const API_URL = `${environment.apiURL}/api/Folder`;

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  http: HttpClient = inject(HttpClient)

  folders = signal<Folder[]>([]);
  nonSystemFolders = signal<Folder[]>([]);
  

  constructor() {

    const systemFolders = ['Inbox', 'Sent Items', 'Deleted Items'];

    effect(() => {
      if (this.folders()) {
        const filteredFolders = this.folders().filter(folder => !systemFolders.includes(folder.folderName));
      this.nonSystemFolders.set(filteredFolders);
        console.log('Non system folders:', this.nonSystemFolders());
      }
    });
  }

  getFolders() {
    this.http.get<Folder[]>
      (`${API_URL}/GetUserFolders`)
      .subscribe({
        next: (data) => {
          this.folders.set(data);
           console.log('Fetched folders:', data);
        },
        error: (err) => console.error('Error fetching folders:', err)
      });
  }

  addFolder(folderName: string) {
    return this.http.post<ApiResponse>
      (`${API_URL}/CreateFolder/${folderName}`, null);
  }

  deleteFolder(folderId: number) {
    return this.http.delete<ApiResponse>
      (`${API_URL}/DeleteFolder/${folderId}`);
  }

}