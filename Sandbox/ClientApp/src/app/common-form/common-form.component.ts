import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IObjectGroup, IName, IQuestionsMapped, IQuestionQuery, IFieldValue, IPageButtonManager } from '../../interface/main';
import { DynamicService } from '../../services/dynamic.service';
import { PageGroup, PageName, ObjectTypes, FormatType } from '../../enum/enum';
import { ObjectHelperService } from "../../services/object-helper.service";
import { SessionHelperService } from "../../services/session-helper.service";
import { isNullOrEmpty } from '../../services/functions.service';
import { Router, Route } from '@angular/router';



@Component({
  selector: 'app-common-form',
  templateUrl: './common-form.component.html',
  styleUrls: ['./common-form.component.scss']
})

export class CommonFormComponent implements OnInit {
  @Input() questionsMapped: IQuestionsMapped[];
  @Input() pageButtonManager: IPageButtonManager;
  @Input() pageButtonManagerList: IPageButtonManager[];
  @Input() questionQuery: IQuestionQuery;

  @Output() pageChanged = new EventEmitter<number>();

  private objectGroup: IObjectGroup;
  private names: IName[];
  private enabled: boolean = false;

  private breadcrumbsRollback: boolean = false;
  private currentPageHeader: string = "";
  private currentPageNumber: number = 0;

  eObjectTypes = ObjectTypes;

  constructor(private dynamicService: DynamicService,
    private objectHelperService: ObjectHelperService,
    private sessionHelperService: SessionHelperService,
    private router: Router) { }

  ngOnChanges() {
    //console.log(`common ngOnChanges`);
    this.enabled = this.checkScreenValid();
    this.getCurrentPageHeader();
    //this.doStuff("ngOnChanges");
  }

  ngOnInit() {
    //console.log(`ngOnInit`);
    //this.enabled = this.checkScreenValid();
    //this.currentPageHeader = this.getCurrentPageHeader();
  }

  //doStuff(text:string) {

  //  var d = new Date();
  //  var n = d.getMilliseconds();
  //  console.log(`page ${text}: >> ${this.currentPageHeader}: ${n}`);
  //}


  getCurrentPageHeader() {
    if (this.questionsMapped != null) {
      this.questionsMapped.forEach(question => {
        if (question.objectTypeId == ObjectTypes.PageHeading) {
          this.currentPageHeader = question.questionText;
          this.currentPageNumber = question.pageId;
        }
      });
    }
  }

  // get the user changes
  returnValue(fieldValue: IFieldValue) {
    this.questionsMapped.forEach(question => {
      if (question.fieldName == fieldValue.fieldName) {
        question.enteredValue = fieldValue.fieldValue;
        question.valid = fieldValue.valid;
        console.log(`returnValue question ${question.questionText}: enteredValue ${question.enteredValue}: show ${question.show}: valid ${question.valid}`);

      }
    });

    // check and save the changes
    this.dynamicService.setDynamicQuestions(this.questionsMapped, this.questionQuery);

    // update the forward button enabled
    this.enabled = this.checkScreenValid();
  }

  changePage(whatPage: number) {
    this.enabled = false;
    //this.doStuff("change");
    this.pageChanged.emit(whatPage);
  }

  // check all questions to make sure that they are ALL valid for this section/screen
  checkScreenValid(): boolean {
    let valid: boolean = true;
    //double check the validity because it might have been changed
    if (this.questionsMapped != null) {
      this.questionsMapped.forEach(question => {
        if (!question.show) {
          question.enteredValue = "";
          question.valid = false;
        }
      });
      this.questionsMapped.forEach(question => {
        if (question.pageId == this.questionQuery.pageId && question.show && !question.valid) {
          valid = false;
        }
      });
    }
    else {
      valid = false;
    }
    return true;
    //return valid;
  }
}
