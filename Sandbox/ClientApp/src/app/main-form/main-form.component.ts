import { Component, OnInit } from '@angular/core';
import { IObjectGroup, IName, IQuestionsMapped, IQuestionQuery, IFieldValue, IPageButtonManager, IPageOrder, ITableId, IDdlData } from '../../interface/main';
import { DynamicService } from '../../services/dynamic.service';
import { PageGroup, PageName, ObjectTypes, FormatType, DdlType } from '../../enum/enum';
import { ObjectHelperService } from "../../services/object-helper.service";
import { SessionHelperService } from "../../services/session-helper.service";
import { isNullOrEmpty } from '../../services/functions.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})

export class MainFormComponent implements OnInit {
  private objectGroup: IObjectGroup;
  private names: IName[];
  private pageOrderList: IPageOrder[];
  private questionsMapped: IQuestionsMapped[];
  private pageButtonManager: IPageButtonManager;
  private pageButtonManagerList: IPageButtonManager[];
  private questionQuery: IQuestionQuery;
  private currentPage: number = 1; // this is for the display order of 'page order'


  eObjectTypes = ObjectTypes;

  constructor(private dynamicService: DynamicService,
    private objectHelperService: ObjectHelperService,
    private sessionHelperService: SessionHelperService) { }

  //ngOnChanges() { this.ngOnInit }

  ngOnInit() {
    this.sessionHelperService.reset();
    this.getDdlData();
    this.getPageOrder();
  }

  pageChanged(whatPage: number) {
    let back: boolean = this.currentPage > whatPage ? true : false;
    let tableIdList: ITableId[];
    let pageToSave: number = this.currentPage;
    let previousQuestionsMapped: IQuestionsMapped[] = this.questionsMapped;
    let previousQuestionQuery: IQuestionQuery = this.questionQuery;
    this.currentPage = whatPage;
    this.pageOrderList.length = 0;
    this.getPageOrder();
    // only save on moving forward, back assumes backing out any changes
    if (!back) {
      //previousQuestionsMapped.forEach(question => {
      //  console.log(`1 previous ${question.questionText}: ${question.tableName}: ${question.tableRecordId}: QUERY = ${this.questionQuery.pageGroupId}: ${this.questionQuery.pageId}`);
      //  });
      this.dynamicService.saveToDatabase(previousQuestionsMapped).subscribe(data => {
        tableIdList = data;
        tableIdList.forEach(table => {
          //console.log(`table ${table.tableName}: ${table.id}`);

          previousQuestionsMapped.forEach(question => {
            if (question.tableName == table.tableName) {
              question.tableRecordId = table.id;
            }
          });
        });
        //previousQuestionsMapped.forEach(question => {
        //  console.log(`previous ${question.questionText}: ${question.tableName}: ${question.tableRecordId}: QUERY = ${previousQuestionQuery.pageGroupId}: ${previousQuestionQuery.pageId}`);
        //});


        this.sessionHelperService.setQuestionsMapped(previousQuestionsMapped, previousQuestionQuery);
        tableIdList.forEach(table => {
          if (this.questionsMapped != null) {
            this.questionsMapped.forEach(question => {
              if (question.tableName == table.tableName) {
                question.tableRecordId = table.id;
              }
              //console.log(`question ${question.questionText}: ${question.tableName}: ${question.tableRecordId}: QUERY = ${this.questionQuery.pageGroupId}: ${this.questionQuery.pageId}`);
            });
          }
        });
      });
    }
  }

  getPageOrder() {
    //this.pageOrderList = this.sessionHelperService.getPageOrder();
    if (this.pageOrderList == null || this.pageOrderList.length == 0) {

      this.dynamicService.getPageOrder().subscribe((pageOrder: IPageOrder[]) => {
        this.pageOrderList = pageOrder;
        // save the order list
        this.sessionHelperService.setPageOrder(this.pageOrderList);

        if (this.pageOrderList != null) {
          this.pageOrderList.forEach(page => {
            if (this.currentPage == page.displayOrder) {
              this.questionQuery = {
                pageGroupId: page.pageGroupId,
                pageId: page.pageId
              }
            }
          });
          // get the new/current page information
          this.getPageButtonManager(this.questionQuery);
          this.getPageButtonManagerList(this.questionQuery);
          this.getQuestions(this.questionQuery);
        }
      });
    }
  }

  getDdlData() {
    let ddlDataList: IDdlData[];
    ddlDataList = this.sessionHelperService.getDdlData();
    if (ddlDataList == null) {
      this.dynamicService.getDdlData().subscribe((ddlData: IDdlData[]) => {
        ddlDataList = ddlData;
        // save the complete list
        this.sessionHelperService.setDdlData(ddlDataList);
      });
    }
  }

  getQuestions(questionQuery: IQuestionQuery) {
    this.questionsMapped = this.sessionHelperService.getQuestionsMapped(questionQuery);
    if (this.questionsMapped == null) {
      this.dynamicService.getQuestions(questionQuery).subscribe((questionsMapped: IQuestionsMapped[]) => {
        this.questionsMapped = questionsMapped;
        this.questionsMapped.forEach(question => {
          question.enteredValue = "";
          question.show = true;
          if (question.mandatory) {
            question.valid = false;
          }
          else {
            question.valid = true;
          }
        });
        this.sessionHelperService.setQuestionsMapped(questionsMapped, questionQuery);
        this.dynamicService.setDynamicQuestions(this.questionsMapped, questionQuery);
      });
    }
    else {
      this.dynamicService.setDynamicQuestions(this.questionsMapped, questionQuery);
    }
    //console.log(`_____________________________________________________________________________________________`);
    //this.questionsMapped.forEach(question => {
    //  console.log(`question ${question.questionText}: show ${question.show}: valid ${question.valid}`);
    //});
  }

  getPageButtonManager(questionQuery: IQuestionQuery) {
    this.dynamicService.getPageButtonManager(questionQuery).subscribe((pageButtonManager: IPageButtonManager) => {
      this.pageButtonManager = pageButtonManager;
      //console.log(`pageButtonManager ${this.pageButtonManager.pageId}: ${this.pageButtonManager.backPageId}: ${this.pageButtonManager.forwardPageId}`);
    });
  }

  getPageButtonManagerList(questionQuery: IQuestionQuery) {
    if (questionQuery != null) {
      this.dynamicService.getPageButtonManagerList(questionQuery.pageGroupId).subscribe((pageButtonManager: IPageButtonManager[]) => {
        this.pageButtonManagerList = pageButtonManager;
        //this.pageButtonManagerList.forEach(item => {
        //  console.log(`pageButtonManager ${item.pageId}: ${item.backPageId}: ${item.forwardPageId}`);
        //});
      });
    }
  }
}

