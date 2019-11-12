import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { IName, IQuestionsMapped, IQuestionQuery, IPageButtonManager, IPageOrder, ITableData, ITableId, IDdlData } from '../interface/main';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError } from './http-error-handler.service';
import { MagicApi } from '../enum/enum';
import { ObjectHelperService } from './object-helper.service';
import { apiUri } from '../assets/config/client-settings.json';
import { isNullOrEmpty, sortData } from './functions.service';
import { SessionHelperService } from "./session-helper.service";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class DynamicService {
  private configUrl: string = "";
  private handleError: HandleError;
  private basic: string = "";

  constructor(private http: HttpClient,
    private objectHelperService: ObjectHelperService,
    private sessionHelperService: SessionHelperService) {
    this.configUrl = apiUri;
  }

  getDdlData(): Observable<IDdlData[]> {
    return this.http.get<IDdlData[]>(this.configUrl + MagicApi[MagicApi.DdlDatas].toString()).pipe();
  }

  getPageOrder(): Observable<IPageOrder[]> {
    return this.http.get<IPageOrder[]>(this.configUrl + MagicApi[MagicApi.PageOrders].toString()).pipe();
  }

  //getNames(id: number): Observable<IName[]> {
  //  if (id > 0) {
  //    return this.http.get<IName[]>(this.configUrl + MagicApi[MagicApi.Names].toString() + "/" + id.toString(), httpOptions);
  //  } else {
  //    return this.http.get<IName[]>(this.configUrl + MagicApi[MagicApi.Names].toString(), httpOptions).pipe();
  //  }
  //}

  //addName(name: IName): Observable<IName> {
  //  return this.http.post<IName>(this.configUrl, name, httpOptions)
  //    .pipe(catchError(this.handleError('addName', name)));
  //}

  getQuestions(questionQuery: IQuestionQuery): Observable<IQuestionsMapped[]> {
    let apiJson = JSON.stringify(questionQuery);
    return this.http.post<IQuestionsMapped[]>(this.configUrl + MagicApi[MagicApi.PageQuestionsMappings].toString(), apiJson, httpOptions).pipe();
  }

  getPageButtonManager(questionQuery: IQuestionQuery): Observable<IPageButtonManager> {
    let apiJson = JSON.stringify(questionQuery);
    return this.http.post<IPageButtonManager>(this.configUrl + MagicApi[MagicApi.PageButtonManage].toString(), apiJson, httpOptions).pipe();
  }

  getPageButtonManagerList(pageGroupId: number): Observable<IPageButtonManager[]> {
    return this.http.get<IPageButtonManager[]>(this.configUrl + MagicApi[MagicApi.PageButtonManage] + "/" + pageGroupId.toString()).pipe();
  }

  // check if dynamic questions should be shown
  setDynamicQuestions(questionsMapped: IQuestionsMapped[], questionQuery: IQuestionQuery) {
    questionsMapped.forEach(question => {
      // only test questions which are visible
      if (question.show) {
        // only concerned with items that open dynamically
        // optionNextList contains the csv list of triggers
        if (!isNullOrEmpty(question.optionNextList)) {
          let fallThrough: number = 0;
          let optionNext: number[] = [];
          let mainQuestionResponded: boolean = false;
          let done: boolean = false;
          let optionNextParts: string[] = question.optionNextList.split(',');
          // sort the list so that we know what is the highest in the display order which will be the fall-through question
          let optionNextSorted: any = sortData(optionNextParts);
          // get the fall-through question
          fallThrough = optionNextSorted[optionNextSorted.length - 1];

          // get the list (from the unsorted) as numbers because they represent the display order
          optionNext.push(0);
          optionNextParts.forEach(part => {
            optionNext.push(parseInt(part));
          });

          mainQuestionResponded = isNullOrEmpty(question.enteredValue) ? false : true;
          let enteredValue: number = 0;
          if (!isNullOrEmpty(question.enteredValue)) {
            enteredValue = parseInt(question.enteredValue);
          }
          // check questions against the possible options
          questionsMapped.forEach(questionDynamic => {
            done = false;
            optionNext.forEach(next => {
              // check out this option if not already completed
              if (next == questionDynamic.displayOrder && !done) {
                // ignore the fall-through option 
                if (fallThrough != questionDynamic.displayOrder) {
                  questionDynamic.show = false;
                  // check if option has been selected
                  if (mainQuestionResponded && optionNext[enteredValue] == next) {
                    questionDynamic.show = true;
                    if (questionDynamic.enteredValue == "") {
                      questionDynamic.valid = false;
                    }
                    done = true;
                  }
                }
              }
            });
          });
        }
      }
    });
    this.sessionHelperService.setQuestionsMapped(questionsMapped, questionQuery);
  }


  // save the current question answers to the database
  saveToDatabase(questionsMapped: IQuestionsMapped[]): Observable<ITableId[]> {
    let tableDataList: ITableData[] = [];
    questionsMapped.forEach(question => {
      if (question.tableName != "") {
        let tableData: ITableData = {
          tableName: question.tableName,
          columnName: question.columnName,
          referenceTable: question.referenceTable,
          referenceId: question.referenceId,
          enteredValue: question.enteredValue,
          tableRecordId: question.tableRecordId
        }
        tableDataList.push(tableData);
      }
    });
    //let httpOptions2 = {
    //  headers: new HttpHeaders({
    //    'Content-Type': 'application/json'
    //  })
    //};
    let apiJson = JSON.stringify(tableDataList);
   // console.log(`apiJson ${apiJson}`);
    return this.http.post<ITableId[]>(this.configUrl + MagicApi[MagicApi.DynamicNameAddress].toString(), apiJson, httpOptions).pipe();
  }

}
