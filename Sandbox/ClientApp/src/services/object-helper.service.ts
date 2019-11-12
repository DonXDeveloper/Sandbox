import { Injectable } from '@angular/core';
import { IOptionButtonData } from '../interface/main';
import { FormatType } from '../enum/enum';
import { isNullOrEmpty } from './functions.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectHelperService {

  constructor() { }

  getOptionButtonData(optionTextList: string, optionNextList: string): IOptionButtonData {
    let optionButtonData: IOptionButtonData = {
      buttonCount: 0,
      optionTextList: null,
      optionNextList: null,
      selected:null
    }
    if (!isNullOrEmpty(optionTextList)) {
      let selectedList: boolean[] = [];
      let textListParts: string[] = optionTextList.split(',');
      let nextListParts: string[] = optionNextList.split(',');
      textListParts.forEach(part => {
        selectedList.push(false);
      })
      if (textListParts.length > 0) {
        optionButtonData = {
          buttonCount: textListParts.length,
          optionTextList: textListParts,
          optionNextList: nextListParts,
          selected: selectedList
        }
      }
    }
    return optionButtonData;
  }

 

  getMandatoryImage(mandatory: boolean): string {
    let mandatoryImage: string = mandatory ? "*" : "";
    return mandatoryImage;
  }

  getColumns(columns: number): string {
    let columnsCss: string = "";
    if (columns > 0) {
      switch (columns) {
        case 1: {
          columnsCss = "col-12 col-sm-1 col-md-1"
          break;
        }
        case 2: {
          columnsCss = "col-12 col-sm-2 col-md-2"
          break;
        }
        case 3: {
          columnsCss = "col-12 col-sm-3 col-md-3"
          break;
        }
        case 4: {
          columnsCss = "col-12 col-sm-4 col-md-4"
          break;
        }
        case 5: {
          columnsCss = "col-12 col-sm-5 col-md-5"
          break;
        }
        case 6: {
          columnsCss = "col-12 col-sm-6 col-md-6"
          break;
        }
        case 7: {
          columnsCss = "col-12 col-sm-7 col-md-7"
          break;
        }
        case 8: {
          columnsCss = "col-12 col-sm-8 col-md-8"
          break;
        }
        case 9: {
          columnsCss = "col-12 col-sm-9 col-md-9"
          break;
        }
        case 10: {
          columnsCss = "col-12 col-sm-10 col-md-10"
          break;
        }
        case 11: {
          columnsCss = "col-12 col-sm-11 col-md-11"
          break;
        }
        case 12: {
          columnsCss = "col-12 col-sm-12 col-md-12"
          break;
        }
      }
    }
    return columnsCss;
  }

  formatText(whatType: number, inValue: string, decimalPlaces: number): string {
   // console.log(`formatText = ${whatType}: ${inValue}`);
    let returnValue: string = "";
    if (whatType > 0) {
      switch (whatType) {
        case FormatType.PascalCase: { returnValue = this.formatPascalCase(inValue); break; }
        case FormatType.CamelCase: { returnValue = this.formatCamelCase(inValue); break; }
        case FormatType.SentenceCase: { returnValue = this.formatSentenceCase(inValue); break; }
        case FormatType.UpperCase: { returnValue = this.formatUpperCase(inValue); break; }
        case FormatType.LowerCase: { returnValue = this.formatLowerCase(inValue); break; }
        case FormatType.NumericOnly: { returnValue = this.formatNumeric(inValue, decimalPlaces); break; }
        case FormatType.TestEmailAddress: { returnValue = this.testEmail(inValue); break; }
        case FormatType.SpaceSeparated: { returnValue = this.formatSpaceSeparated(inValue); break; }
        case FormatType.UpperCaseFirstCharacter: { returnValue = this.formatUpperCaseFirstCharacter(inValue); break; }
        case FormatType.Date: { returnValue = this.formatDate(inValue); break; }
      }
    }
    return returnValue;
  }

  testEmail(inValue: string):string {
    let returnValue: string = "";
    returnValue = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i.test(inValue) ? "true" : "false";
    return returnValue;
  }

  formatPascalCase(inValue: string): string {
    let newValue: string = "";
    let upper: boolean = false;
    inValue = inValue.toLowerCase();
    if (inValue != "") {
      let inValueParts: string[] = inValue.split("");
      if (inValueParts.length > 0) {
        inValueParts[0] = inValueParts[0].toUpperCase();
        inValueParts.forEach(part => {
          if (part != " ") {
            if (upper) {
              part = part.toUpperCase();
              upper = false;
            }
            newValue += part;
          }
          else {
            upper = true;
          }
        });
      }
    }
    return newValue;
  }

  formatCamelCase(inValue: string): string {
    let returnValue: string = "";
    if (inValue != "") {
      let newValue: string = this.formatPascalCase(inValue);
      let inValueParts: string[] = newValue.split("");
      if (inValueParts.length > 0) {
        inValueParts[0] = inValueParts[0].toLowerCase();
        inValueParts.forEach(part => {
          returnValue += part;
        });
      }
    }
    return returnValue;
  }

  formatSentenceCase(inValue: string): string {
    let returnValue: string = "";
    let firstDone: boolean = false;
    let newValue: string = this.formatPascalCase(inValue);
    let inValueParts: string[] = newValue.split("");
    if (inValueParts.length > 0) {

      inValueParts.forEach(part => {
        if (!firstDone) {
          returnValue += part.toUpperCase();
          firstDone = true;
        }
        else {
          if (part == part.toUpperCase()) {
            part = part.toLowerCase();
            returnValue += " ";
          }
          returnValue += part;
        }
      });
    }
    return returnValue;
  }

  formatSpaceSeparated(inValue: string): string {
    let returnValue: string = "";
    let firstDone: boolean = false;
    let newValue: string = this.formatPascalCase(inValue);
    let inValueParts: string[] = newValue.split("");
    if (inValueParts.length > 0) {

      inValueParts.forEach(part => {
        if (!firstDone) {
          returnValue += part.toUpperCase();
          firstDone = true;
        }
        else {
          if (part == part.toUpperCase()) {
            returnValue += " ";
          }
          returnValue += part;
        }
      });
    }
    return returnValue;
  }

  formatUpperCaseFirstCharacter(inValue: string): string {
    let returnValue: string = "";
    let firstDone: boolean = false;
    let inValueParts: string[] = inValue.split("");
    if (inValueParts.length > 0) {
      inValueParts.forEach(part => {
        if (!firstDone) {
          returnValue += part.toUpperCase();
          firstDone = true;
        }
        else {
          returnValue += part;
        }
      });
    }
    return returnValue;
  }

  formatUpperCase(inValue: string): string {
    return inValue.toUpperCase();
  }

  formatLowerCase(inValue: string): string {
    return inValue.toLowerCase();
  }

  isNumber(inValue: string): string {
    let returnValue: string = "";
    let ok: boolean = false;
    let allowedCharacters: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "."];
    if (inValue != "") {
      let inValueParts = inValue.split("");
      if (inValueParts.length > 0) {
        inValueParts.forEach(part => {
          ok = false;
          allowedCharacters.forEach(character => {
            if (part == character) { ok = true; }
          })
          if (ok) {
            returnValue += part;
          }
        })
      }
    }
    return returnValue;
  }

  formatNumeric(inValue: string, decimalPlaces: number): string {
    let returnValue: string = "";
    let numericValue: string = this.isNumber(inValue);
    if (decimalPlaces < 0) {
      console.log(`numericValue = ${numericValue}`);
      returnValue = numericValue
    }
    else {
      if (decimalPlaces >= 0) {
        let numericValueLength: number = numericValue.length;
        let periodPosition: number = numericValue.indexOf(".") + 1;
        if (periodPosition == 0) {
          if (decimalPlaces > 0) {
            returnValue = this.addDecimalZeroes(numericValue, true, decimalPlaces)
          }
        }
        else {
          if (numericValueLength < (periodPosition + decimalPlaces)) {
            returnValue = this.addDecimalZeroes(numericValue, false, periodPosition + decimalPlaces - numericValueLength)
          }
          else {
            if (decimalPlaces == 0) {
              returnValue = numericValue.substr(0, periodPosition - 1);
            }
            else {
              returnValue = numericValue.substr(0, periodPosition + decimalPlaces);
            }
          }
        }
      }
    }
    return returnValue;
  }

  addDecimalZeroes(inValue: string, addPoint: boolean, addZeroes: number): string {
    let returnValue: string = inValue;
    if (addPoint) { returnValue += "."; }
    if (addZeroes > 0) {
      for (let i = 0; i < addZeroes; i++) {
        returnValue += "0";
      }
    }
    return returnValue;
  }

  formatDate(inValue: string):string {
    let returnValue: string = inValue;



    return returnValue;
  }
}

