import { Component } from '@angular/core';

@Component({
  selector: 'app-error-500',
  template: `
    <error-code
      code="500"
      title="Server went wrong!"
      message="Just kidding, looks like we have an internal issue, please try refreshing."
    />
  `,
})
export class Error500Component {}
