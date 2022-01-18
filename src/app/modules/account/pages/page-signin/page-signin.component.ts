import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page-signin',
  templateUrl: './page-signin.component.html',
  styleUrls: ['./page-signin.component.scss']
})
export class PageSigninComponent implements OnInit {
  public errorForm: boolean;
  constructor(private authService: AuthService) {
    this.errorForm = false;
   }

  ngOnInit(): void {
  }

  public onSubmit(submittedForm: any): void {
    console.log(submittedForm.form.value);
    const email = submittedForm.form.value['email'];
    const password = submittedForm.form.value['password'];
    if(email !== '' && password !== '') {
      this.authService.signin(email, password).subscribe(
        resp => console.log(resp)
      )
    } else {
      // afficher une erreur à l'utilisateur
      this.errorForm = true;
    }
  }

}
