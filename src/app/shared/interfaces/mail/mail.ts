export interface MailReadOnlyDTO {
        guidMail: string;
        subject?: string; 
        body?: string; 
        senderEmail?: string;
        recipients?: string[]; 
        sendAt: Date; 
        isRead: boolean; 
        receivedAt: Date; 
        readAt?: Date; 
  }

  export interface MailCreateDTO {
      subject?: string;
      body?: string;
      recipients: string[];
    };

    export interface MailMoveFolderDTO {
      guidMail: string;
      folderName: string;
      newFolderName: string;
  }