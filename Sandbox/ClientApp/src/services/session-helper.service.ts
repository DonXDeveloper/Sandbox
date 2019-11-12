import { Injectable } from '@angular/core';
import { IQuestionsMapped, IPageOrder, IQuestionQuery, IDdlData, IBreadcrumbTrail } from '../interface/main';
import { SessionObject } from '../enum/enum';

@Injectable({
  providedIn: 'root'
})
export class SessionHelperService {
  constructor() { }


  getDdlData(): IDdlData[] {
    let key: string = SessionObject[SessionObject.DdlData];
    return JSON.parse(sessionStorage.getItem(key));
  }

  getDdlDataByType(ddlTypeId: number): IDdlData[] {
    let ddlDataIn: IDdlData[];
    let ddlDataOut: IDdlData[] = [];
    let key: string = SessionObject[SessionObject.DdlData];
    ddlDataIn = JSON.parse(sessionStorage.getItem(key));
    if (ddlDataIn != null) {

      ddlDataIn.forEach(data => {
        if (data.ddlTypeId == ddlTypeId) {
          ddlDataOut.push(data);
        }
      });
    }
    return ddlDataOut;
  }

  setDdlData(invalue: IDdlData[]) {
    let key: string = SessionObject[SessionObject.DdlData];
    sessionStorage.setItem(key, JSON.stringify(invalue));
  }

  getPageOrder(): IPageOrder[] {
    let key: string = SessionObject[SessionObject.PageOrder];
    return JSON.parse(sessionStorage.getItem(key));
  }

  setPageOrder(invalue: IPageOrder[]) {
    let key: string = SessionObject[SessionObject.PageOrder];
    sessionStorage.setItem(key, JSON.stringify(invalue));
  }

  getQuestionsMapped(questionQuery: IQuestionQuery): IQuestionsMapped[] {
    let key: string = SessionObject[SessionObject.MappedQuestions] + questionQuery.pageGroupId + "_" + questionQuery.pageId;
    return JSON.parse(sessionStorage.getItem(key));
  }

  setQuestionsMapped(invalue: IQuestionsMapped[], questionQuery: IQuestionQuery) {
    let key: string = SessionObject[SessionObject.MappedQuestions] + questionQuery.pageGroupId + "_" + questionQuery.pageId;
    sessionStorage.setItem(key, JSON.stringify(invalue));
  }

  getBreadcrumbTrail(): IBreadcrumbTrail[] {
    let key: string = SessionObject[SessionObject.BreadcrumbTrail];
    return JSON.parse(sessionStorage.getItem(key));
  }

  setBreadcrumbTrail(invalue: IBreadcrumbTrail[]) {
    let key: string = SessionObject[SessionObject.BreadcrumbTrail];
    sessionStorage.setItem(key, JSON.stringify(invalue));
  }

  reset() {
    this.setBreadcrumbTrail(null);
  }
}
