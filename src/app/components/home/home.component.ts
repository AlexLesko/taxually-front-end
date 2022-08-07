import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserFileModel } from 'src/app/models/user-file-model';
import { UserModel } from 'src/app/models/user-model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output() usersUpdated = new EventEmitter<UserFileModel[]>();

  user ?: UserModel;
  userKey : string = "";
  userFiles : UserFileModel[] = [];
  storedFiles : UserFileModel[] = [];
  addFile : boolean = false;
  fileToUpload : UserFileModel = new UserFileModel;
  currentNumberOfFile ?: number;
  sortDirection : boolean = true;

  constructor(private router: Router, private localStorageService: LocalStorageService) {
    let routerData = this.router.getCurrentNavigation()?.extras.state;
    if(routerData)
    {
      this.user = routerData as UserModel;
      this.userKey = this.user.lastName + "_" + this.user.firstName;
      let tmpFiles = this.localStorageService.GetUserFiles(this.userKey);
      if(tmpFiles)
      {
        this.userFiles = tmpFiles;
        this.storedFiles = tmpFiles;
        console.log(this.userFiles);
      }
    }
    else
    {
      this.router.navigate(['login']);
    }
   }

  ngOnInit(): void {
    
  }

  DeleteFiles(file: UserFileModel)
  {
    this.localStorageService.RemoveUserFile(this.userKey, file);

    let result = this.localStorageService.GetUserFiles(this.userKey);
    if(result)
    {
      this.userFiles = result;
      this.storedFiles = result;
    }
  }

  onFileSelected(event: any) 
  {
    const file : File = event.target.files[0];

    if(file)
    {
      this.fileToUpload.fileTitle = file.name;
      this.GetBase64Array(file).then(data => this.fileToUpload.fileData = data);

      console.log(this.fileToUpload);
    }
  }

  UploadFile()
  {
    let result = this.localStorageService.AddUserFile(this.userKey, this.fileToUpload);
    if(result)
    {
      this.addFile = false;
      this.userFiles = result;
      this.storedFiles = result;
    }
  }

  AddNewFile()
  {
    this.addFile = true;
  }

  GetBase64Array(file : any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  FilterTable(event: any) {
    this.userFiles = this.storedFiles.filter(fileName => fileName.fileTitle.includes(event.target.value));
  }

  SortTable()
  {
    if(this.sortDirection)
    {
      this.userFiles = this.userFiles.sort((a,b) => a.fileTitle.localeCompare(b.fileTitle));
      this.sortDirection = false;
    }
    else
    {
      this.userFiles = this.userFiles.sort((a,b) => a.fileTitle.localeCompare(b.fileTitle)).reverse();
      this.sortDirection = true;
    }
  }

}
