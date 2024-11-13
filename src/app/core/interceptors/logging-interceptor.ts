import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { MessageService } from '@shared';
import { SpinnerService } from './spinner.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  private readonly messenger = inject(MessageService);
  constructor(private SpinnerService:SpinnerService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;
    this.SpinnerService.loading();
    // extend server response observable with logging
    return next.handle(req).pipe(
      tap({
        // Succeeds when there is a response; ignore other events
        next: event => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        // Operation failed; error is an HttpErrorResponse
        error: error => (ok = 'failed'),
      }),
      // Log when response observable either completes or errors
      finalize(() => {
        this.SpinnerService.loadingClose();
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        this.messenger.add(msg);
      })
    );
  }
}
