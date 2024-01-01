import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './Validators/noSpaceAllowed.validators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'reactive-forms';

  formStatus: string;
  formData: any = {};

  reactiveForm!: FormGroup;
  skillsArrayControls!: any;
  experienceArrayControls!: any;

  ngOnInit(){
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required, CustomValidators.checkUserName),
      dob: new FormControl(null),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl('India'),
        city: new FormControl(null,),
        region: new FormControl(null),
        postal: new FormControl(null, Validators.required) 
      }),
      skills: new FormArray([
        new FormControl(null, Validators.required)
      ]),
      experience: new FormArray([
        
      ])
    });

    // this.reactiveForm.get('firstname').valueChanges.subscribe((value) => {
    //   console.log(value);
    // })

    // this.reactiveForm.valueChanges.subscribe((data) => {
    //   console.log(data);
    // });

    // this.reactiveForm.get('username').statusChanges.subscribe((status) => {
    //   console.log(status);
    // });

    this.reactiveForm.statusChanges.subscribe((status) => {
      console.log(status);
      this.formStatus = status;
    })

    this.skillsArrayControls = (<FormArray>this.reactiveForm.get('skills')).controls!;
    this.experienceArrayControls = (<FormArray>this.reactiveForm.get('experience')).controls!;
    // console.log(skillsArraycontrols);
  }

  OnFormSubmitted(){
    console.log(this.reactiveForm);
    console.log(this.reactiveForm.value);
    this.formData = this.reactiveForm.value;
    this.reactiveForm.reset({
      firstname: null,
      lastname: null,
      email: null,
      username: null,
      dob: null,
      gender: 'male',
      address: {
        street: null,
        country: 'India',
        city: null,
        region: null,
        postal: null
      },
      skills: [],
      experience: [] 
    });
  }


  AddSkills(){
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required));
  }

  DeleteSkill(index: number){
    const controls = (<FormArray>this.reactiveForm.get('skills'));
    controls.removeAt(index);
  }

  AddExperience(){
    const frmGroup = new FormGroup({
      company: new FormControl(null),
      position: new FormControl(null),
      totalExp: new FormControl(null),
      start: new FormControl(null),
      end: new FormControl(null)
    });

    (<FormArray>this.reactiveForm.get('experience')).push(frmGroup);
  }

  DeleteExperience(index:number){
    const FormArray = <FormArray>this.reactiveForm.get('experience');
    FormArray.removeAt(index);
  }

  GenerateUserName(){
    let username = '';
    const fName: string = this.reactiveForm.get('firstname').value;
    const lName: string = this.reactiveForm.get('lastname').value;
    const dob: string = this.reactiveForm.get('dob').value;
    
    if(fName.length >= 3){
      username += fName.slice(0, 3);
    }else{
      username += fName;
    }

    if(lName.length >= 3){
      username += lName.slice(0, 3);
    }else{
      username += lName;
    }

    let datetime = new Date(dob);
    username += datetime.getFullYear();

    username = username.toLowerCase();
    
    // console.log(username);

    // this.reactiveForm.setValue({
    //   firstname: this.reactiveForm.get('firstname').value,
    //   lastname: this.reactiveForm.get('lastname').value,
    //   email: this.reactiveForm.get('email').value,
    //   username: username,
    //   dob: this.reactiveForm.get('dob').value,
    //   gender: this.reactiveForm.get('gender').value,
    //   address: {
    //     street: this.reactiveForm.get('address.street').value,
    //     country: this.reactiveForm.get('address.country').value,
    //     city: this.reactiveForm.get('address.city').value,
    //     region: this.reactiveForm.get('address.region').value,
    //     postal: this.reactiveForm.get('address.postal').value,
    //   },
    //   skills: this.reactiveForm.get('skills').value,
    //   experience: this.reactiveForm.get('experience').value
    // });

    // this.reactiveForm.get('username').setValue(username);

    this.reactiveForm.patchValue({
      username: username,
      address: {
        city: "Bangalore"
      }
    });
  }
}
