import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Category } from '../interface/category.interface';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export default class ContactListComponent implements OnInit {

  categories: Category[] = []

  private contactService = inject(ContactService);
  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.contactService.list().subscribe(categories => {
      this.categories = categories;
    })
  }

  deleteCategory(category: Category) {
    this.contactService.delete(category.id).subscribe(() => {
      this.loadAll();
    })
  }
}
