import { Component, OnInit, Input, effect , inject} from '@angular/core';
// import { EmailService } from '../../../../shared/services/mail.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MailReadOnlyDTO } from '../../../../shared/interfaces/mail/mail';

@Component({
  selector: 'app-email-preview',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './email-preview.component.html',
  styleUrl: './email-preview.component.css'
})
export class EmailPreviewComponent  {
  @Input() mail: MailReadOnlyDTO | null = null;
}
