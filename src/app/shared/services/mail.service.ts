import { Injectable, signal, effect, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../interfaces/apirespone/apiresponse';
import { environment } from '../../../environments/environment.development';
import { MailReadOnlyDTO } from '../interfaces/mail/mail';
import { MailCreateDTO } from '../interfaces/mail/mail';
import { MailMoveFolderDTO } from '../interfaces/mail/mail';

const API_URL=`${environment.apiURL}/api/Mail`;

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  http: HttpClient = inject(HttpClient)

  selectedFolderName = signal<string | null>(null);
  mails = signal<MailReadOnlyDTO[]>([]);
  mail = signal<MailReadOnlyDTO | null>(null);

  getMailsByFolderName(folderName: string): void {
    this.mail.set(null);

    this.http.get<MailReadOnlyDTO[]>
    (`${API_URL}/GetMails/${folderName}`)
    .subscribe({
      next: (data) => this.mails.set(data),
      error: (err) => console.error('Error fetching mails:', err)
    });
  }
  
  getMailByGuid(guidMail: string): void {
    this.http.get<MailReadOnlyDTO>
    (`${API_URL}/GetMailByGuid?mailGuid=${guidMail}`)
    .subscribe({
      next: (data) => {
        this.mail.set(data);
         console.log('mail is: ',data);
      },
      error: (err) => console.error('Error fetching mail:', err)
    });
  }

  sendEmail(mail: MailCreateDTO) {
    return this.http.post<ApiResponse>
    (`${API_URL}/SendMail`, mail);
  }

  moveMailToFolder(movingMailFolder: MailMoveFolderDTO) {
    return this.http.post<ApiResponse>
    (`${API_URL}/MoveEmailToFolder`, movingMailFolder);
  }


}