import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { UserFileModel } from '../models/user-file-model';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  users : UserModel[] = [];
  userFiles : UserFileModel[] = [];

  constructor() { }

  GetUsers()
  {
    let tmp = localStorage.getItem('users');
    
    if(tmp)
    {
      this.users = JSON.parse(tmp) as UserModel[];
      return this.users;
    }

    return null;
  }

  AddUser(user: UserModel)
  {
    let localUsers = this.GetUsers();

    if(localUsers == null)
    {
      user.id = 0;
    }
    else
    {
      user.id = localUsers.length;
      this.users = localUsers;
    }

    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    console.log(this.users);
  }

  CheckLogin(user: UserModel)
  {
    let users = this.GetUsers();

    if(users)
    {
      if(users.find(x => x.email == user.email))
      {
        console.log(user);
        return true;
      }
    }

    return false;
  }

  GetUserFiles(key: string)
  {
    let files = localStorage.getItem(key);

    if(files)
    {
      this.userFiles = JSON.parse(files) as UserFileModel[];
      return this.userFiles;
    }

    return null;
  }

  AddUserFile(userKey: string, file: UserFileModel)
  {
    let localUserFiles = this.GetUserFiles(userKey);

    if(localUserFiles != null)
    {
      file.id = localUserFiles.length;
      this.userFiles = localUserFiles;
    }
    else
    {
      file.id = 0;
    }

    this.userFiles.push(file);
    localStorage.setItem(userKey, JSON.stringify(this.userFiles));

    return this.GetUserFiles(userKey);
  }

  RemoveUserFile(userKey: string, file: UserFileModel) 
  {
    let localUserFiles = this.GetUserFiles(userKey);

    if(localUserFiles)
    {
      this.userFiles = localUserFiles;
      this.userFiles = this.userFiles.filter(files => files.id != file.id);
      localStorage.setItem(userKey, JSON.stringify(this.userFiles));
    }
  }
}
