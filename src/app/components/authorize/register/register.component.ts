import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register: any = FormGroup;
  users: UserModel[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private localService: LocalStorageService) { }

  ngOnInit(): void {
    this.register = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
    let tmp = localStorage.getItem('users');
    
    if(tmp)
    {
      this.users = JSON.parse(tmp) as UserModel[];
    }
    
    console.log(this.users);
  }

  registerSubmit(data: any) {
    let user = new UserModel();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;

    this.localService.AddUser(user);

    this.router.navigateByUrl('/home', { state: user});
  }

  cancelRegister()
  {
    this.router.navigate(['login']);
  }

}
