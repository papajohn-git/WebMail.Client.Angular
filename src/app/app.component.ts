import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { MainComponent } from './components/main/main/main.component';
import { LeftSideBarComponent } from './components/main/left-side-bar/left-side-bar.component';
import { HeaderComponent } from './components/main/header/header.component';

@Component({
  selector: 'app-root',
  imports: [MainComponent, LeftSideBarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebMail.client';
}
