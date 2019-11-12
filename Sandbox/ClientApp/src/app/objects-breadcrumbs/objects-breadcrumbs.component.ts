import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IQuestionsMapped, IQuestionQuery, IPageButtonManager, IBreadcrumbTrail } from '../../interface/main';
import { DynamicService } from '../../services/dynamic.service';
import { SessionHelperService } from "../../services/session-helper.service";

@Component({
  selector: 'app-objects-breadcrumbs',
  templateUrl: './objects-breadcrumbs.component.html',
  styleUrls: ['./objects-breadcrumbs.component.scss']
})
export class ObjectsBreadcrumbsComponent implements OnInit {
  @Input() pageButtonManagerList: IPageButtonManager[];
  @Input() breadcrumbsRollback: boolean = false;
  @Input() currentPageHeader: string;
  @Input() currentPageNumber: number = 0;

  @Output() pageChanged = new EventEmitter<number>();

  private pageButtonManager: IPageButtonManager[];
  private breadcrumbTrail: IBreadcrumbTrail[] = [];
  private lastPage: number = 0;

  constructor(private dynamicService: DynamicService,
    private sessionHelperService: SessionHelperService) { }

  ngOnChanges() {

    this.checkTrail();
  }

  ngOnInit() {
  }

  breadcrumbClicked(whichOne: number) {
    if (whichOne != this.currentPageNumber) {
      this.pageChanged.emit(whichOne);
    }
  }

  checkTrail() {
    let found: boolean = false;
    this.breadcrumbTrail = this.sessionHelperService.getBreadcrumbTrail();
    if (this.breadcrumbTrail != null) {
      this.breadcrumbTrail.forEach(crumb => {
        if (crumb.pageName == this.currentPageHeader) {
          found = true;
        }
      });
    }
    else {
      this.breadcrumbTrail = this.breadcrumbTrail || [];
    }
    if (!found && this.currentPageHeader != "") {
      let newCrumb: IBreadcrumbTrail = {
        pageName: this.currentPageHeader,
        pageNumber: this.currentPageNumber
      }
      this.breadcrumbTrail.push(newCrumb);
      this.sessionHelperService.setBreadcrumbTrail(this.breadcrumbTrail);
    }
    if (this.breadcrumbsRollback) {
      this.breadcrumbTrail.forEach(crumb => {
        if (crumb.pageNumber > this.currentPageNumber) {
          const index: number = this.breadcrumbTrail.indexOf(crumb);
          if (index !== -1) {
            this.breadcrumbTrail.splice(index, 1);
          }
        }

      });
      this.sessionHelperService.setBreadcrumbTrail(this.breadcrumbTrail);
    }
    this.lastPage = 0;
    this.breadcrumbTrail.forEach(crumb => {
      if (crumb.pageNumber > this.lastPage) {
        this.lastPage = crumb.pageNumber;
      }
    });
  }
}
