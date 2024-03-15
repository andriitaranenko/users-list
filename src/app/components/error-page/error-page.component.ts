import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css',
})
export class ErrorPageComponent implements OnInit {
  error: { code: number; message: string } = {
    code: 404,
    message: 'Page not found',
  };
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((data) => {
      const { errorCode, errorMessage } = data;
      if (errorCode && errorMessage) {
        this.error = { code: errorCode, message: errorMessage } as {
          code: number;
          message: string;
        };
      }
    });
  }
}
