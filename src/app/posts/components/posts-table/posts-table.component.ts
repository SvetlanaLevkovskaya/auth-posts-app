import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css'],
})
export class PostsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['userId', 'id', 'title', 'body'];
  dataSource = new MatTableDataSource<Post>();

  constructor(
    private postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show().then(r => console.log('postss-r', r));
    this.route.paramMap.subscribe(params => {
      this.spinner.hide().then(r => console.log('postss-hide-r', r));
      const id = params.get('id');
      if (id) {
        this.postsService.fetchPostById(Number(id)).subscribe(post => {
          this.dataSource.data = [post];
        });
      } else {
        this.spinner.hide();
        this.fetchData();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchData() {
    this.postsService.fetchPosts().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
