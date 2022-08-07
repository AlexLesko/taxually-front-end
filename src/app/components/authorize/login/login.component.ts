import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: any = FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private localService: LocalStorageService) { }

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  loginSubmit(data: any) {
    let user = new UserModel();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;


    if(this.localService.CheckLogin(user))
    {
      this.router.navigateByUrl('/home', { state: user});
    }
    else
    {
      console.log("User not exist!")
    }
  }

  goToRegister()
  {
    this.router.navigate(['register']);
  }
  
}
