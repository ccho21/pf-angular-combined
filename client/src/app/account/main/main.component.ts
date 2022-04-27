import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Post } from '@app/posts/model/post';
import { select } from '@ngrx/store';
import { selectAllPosts } from '@app/posts/posts.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  userId?: string;
  store: any;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    console.log('home component');
    this.userId = this.route.snapshot.paramMap.get('id') as string;
    if (!this.userId) {
      this.router.navigateByUrl('/posts');
    }
  }
}
