import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { convertFilterToWhere } from 'app/helpers.function';
import { ApiService } from 'app/services/api.service';
import { environment } from 'environments/environment';
import { fromEvent, merge } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap, catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class MembersComponent implements OnInit {

  dataSource: any[] = [];
  displayedColumns = ['id', 'image', 'name', 'dob', 'gender', 'email', 'phone', 'active'];
  filters: any;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') search: ElementRef;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _snackBar: MatSnackBar,
    private _fuseProgressBarService: FuseProgressBarService
  ) {
    this.filters = {
      search: ''
    };
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filters.search = params.search || undefined;
      this.paginator.pageIndex = params.page ? +params.page : 0;
      this.paginator.pageSize = params.size ? +params.size : environment.PAGINATION_LIMIT;
      this.sort.active = params.sort || undefined;
      this.sort.direction = params.direction || undefined;
      this.getLeads();
    });

    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.filters.search = this.search.nativeElement.value || undefined;
          this.changeFilter();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.changePage();
    });

    this.paginator.page.subscribe(() => {
      this.changePage();
    });
  }

  changeFilter(): void {
    const urlTree = this.router.createUrlTree([], {
      queryParams: {
        search: this.filters.search,
        page: null,
        size: this.paginator.pageSize
      },
      queryParamsHandling: 'merge',
      preserveFragment: true
    });
    this.location.replaceState(urlTree.toString());
    this.getLeads();
  }

  changePage(): void {
    const urlTree = this.router.createUrlTree([], {
      queryParams: {
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
        sort: this.sort.active,
        direction: this.sort.direction,
      },
      queryParamsHandling: 'merge',
      preserveFragment: true
    });
    this.location.replaceState(urlTree.toString());
    this.getLeads();
  }

  async getLeads(): Promise<void> {
    this._fuseProgressBarService.show();
    const offset = this.paginator.pageIndex * this.paginator.pageSize;
    const sortList = [];
    if (!!this.sort.active) {
      if (this.sort.active === 'name') {
        sortList.push(['first_name', this.sort.direction]);
        sortList.push(['last_name', this.sort.direction]);
      } else if (this.sort.active !== 'id') {
        sortList.push([this.sort.active, this.sort.direction]);
      }
      sortList.push(['_id', this.sort.direction ?? 'asc']);
    }
    const { error, data, message } = await this.apiService.getAll('user', {
      where: convertFilterToWhere(this.filters),
      offset,
      limit: this.paginator.pageSize,
      sort: sortList
    });
    this._fuseProgressBarService.hide();
    if (!!error) {
      this._snackBar.open(message, 'Ok', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'toast-error'
      });
      return;
    }
    this.paginator.length = data.count;
    this.dataSource = data.users || [];
  }

}
