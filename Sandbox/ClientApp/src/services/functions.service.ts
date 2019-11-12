import { Injectable } from '@angular/core';
import { IQuestionsMapped } from '../interface/main';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }
}

export function isNullOrEmpty(inValue: string): boolean {
  let returnValue: boolean = false;
  let isNull: boolean = inValue == null || inValue == undefined ? true : false;
  let isEmpty: boolean = inValue == "" ? true : false;
  if (isNull || isEmpty) {
    returnValue = true;
  }
  return returnValue;
}


//// check if dynamic questions should be shown
//export function setDynamicQuestions(questionsMapped: IQuestionsMapped[]): IQuestionsMapped[] {
//  questionsMapped.forEach(question => {
//    // only test questions which are visible
//    if (question.show) {
//      // only concerned with items that open dynamically
//      // optionNextList contains the csv list of triggers
//      if (!isNullOrEmpty(question.optionNextList)) {
//        let fallThrough: number = 0;
//        let optionNext: number[] = [];
//        let mainQuestionResponded: boolean = false;
//        let done: boolean = false;
//        let optionNextParts: string[] = question.optionNextList.split(',');
//        // sort the list so that we know what is the highest in the display order which will be the fall-through question
//        let optionNextSorted: any = sortData(optionNextParts);
//        // get the fall-through question
//        fallThrough = optionNextSorted[optionNextSorted.length - 1];

//        // get the list (from the unsorted) as numbers because they represent the display order
//        optionNext.push(0);
//        optionNextParts.forEach(part => {
//          optionNext.push(parseInt(part));
//        });

//        mainQuestionResponded = isNullOrEmpty(question.enteredValue) ? false : true;
//        let enteredValue: number = 0;
//        if (!isNullOrEmpty(question.enteredValue)) {
//          enteredValue = parseInt(question.enteredValue);
//        }
//        // check questions against the possible options
//        questionsMapped.forEach(questionDynamic => {       
//          done = false;
//          optionNext.forEach(next => {
//            // check out this option if not already completed
//            if (next == questionDynamic.displayOrder && !done) {
//              // ignore the fall-through option 
//              if (fallThrough != questionDynamic.displayOrder) {
//                questionDynamic.show = false;
//                // check if option has been selected
//                if (mainQuestionResponded && optionNext[enteredValue] == next) {
//                  questionDynamic.show = true;
//                  if (questionDynamic.enteredValue = "") {
//                    questionDynamic.valid = false;
//                  }
//                  // clear down any previously entered value
//                  if (!questionDynamic.show) {
//                    questionDynamic.enteredValue = "";
//                    questionDynamic.valid = true;
//                  }
//                  done = true;
//                }
//              }
//            }
//          });
//        });
//      }
//    }
//  });
//  //this.sessionHelperService.setQuestionsMapped(this.questionsMapped, this.questionQuery);
//  return this.questionsMapped;


//}

export function sortData(array: Array<number | string>): Array<number | string> {
  return array.sort((a, b) => a < b ? -1 : 1);
}

