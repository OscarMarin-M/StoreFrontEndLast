import { Component, inject, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Category } from '../interface/category.interface';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export default class CategoryFormComponent implements OnInit {

  private fb =inject(FormBuilder);
  private contactService= inject(ContactService);
  private router=inject(Router);
  private route=inject(ActivatedRoute);

  form?: FormGroup;
  category?: Category;

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.contactService.get(id).subscribe(category =>{
        this.category=category;
        this.form=this.fb.group({
          name: [category.name, [Validators.required]],
          description: [category.description, [Validators.required]]
        })
      })
    }
    else{
      this.form=this.fb.group({
        name:['', [Validators.required]],
        description:['', [Validators.required]]
      })
    }
  }


  save(){

    const categoryForm =this.form!.value;

    if(this.category){
      this.contactService.update(this.category.id, categoryForm).subscribe(()=>{
        this.router.navigate(['/categories']);
      });
    } else{
      this.contactService.create(categoryForm).subscribe(()=>{
        this.router.navigate(['/categories']);
      })
    }


  }
}
