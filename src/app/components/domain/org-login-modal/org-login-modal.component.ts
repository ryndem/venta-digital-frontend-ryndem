import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'org-login-modal',
  templateUrl: './org-login-modal.component.html',
  styleUrl: './org-login-modal.component.scss'
})
export class LoginModalComponent {

  credentialsError = false;
  loading = false;
  twoFAError = false;

  constructor(public authService: AuthService) {}

  async login(form: NgForm) {
    console.log('FORM !!! - ', form);
    if (!form.valid) {
      return;
    }

    const data = form.value;
    try {
      this.loading = true;
      this.credentialsError = false;

      await this.authService.login(data.email, data.password);
      this.loading = false;
      this.close();

    } catch(error:any) {
      console.log('----', error);
      switch(error?.error?.error) {
        case 'multiple_session': this.closeMultipleSessions(error?.error, form); break;
        default: this.credentialsError = true;
      }
      this.loading = false;
    }

  }

  private async closeMultipleSessions(error:any, form: NgForm) {
    console.log('CLOSE MULTIPLE', error.idSessionTemp);
    await this.authService.closeMultipleSessions(error.idSessionTemp);
    await this.login(form);
  }

  close() {
    this.authService.closeLoginModal();
  }

}
