import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../Services/current-user.service';
import { UserModel } from '../Services/user-model';

@Component({
  selector: 'app-practical-exam',
  templateUrl: './practical-exam.component.html',
  styleUrls: ['./practical-exam.component.css']
})
export class PracticalExamComponent implements OnInit {

  students: UserModel[] = []
  showUserData = false
  curStud: UserModel = new UserModel("","","",-1,"");
  choice = ""
  
  constructor(private userServcice:CurrentUserService) { }

  ngOnInit(): void {
    this.userServcice.GetAllUsers().subscribe((res:any)=>{
      Object.keys(res).map(key=>{
        let u=new UserModel(res[key]['name'],res[key]['email'],res[key]['password'],res[key]['level'],res[key]['courseid'])
        u.id=res[key]['id']
        this.students.push(u)
      })
    })
  }

  onSelectionChanged(val: string){
    this.choice = val
    if(val == "Choose Student ID"){
      this.showUserData = false
    }
    for(let student of this.students){
        if(student.id == this.choice){
          this.showUserData = true
          this.curStud = student
        }
    }
  }

}
