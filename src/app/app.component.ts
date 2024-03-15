import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { httpErrorInterceptorProvider } from './services/http-error.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [httpErrorInterceptorProvider],
})
export class AppComponent {}
