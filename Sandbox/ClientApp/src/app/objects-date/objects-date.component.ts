import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ObjectHelperService } from "../../services/object-helper.service";
import { IFieldValue } from '../../interface/main';
import { FormatType } from '../../enum/enum';

import { MatDatepickerModule } from '@angular/material';

@Component({
  selector: 'app-objects-date',
  templateUrl: './objects-date.component.html',
  styleUrls: ['./objects-date.component.scss']
})
export class ObjectsDateComponent implements OnInit {
  @Input() questionText: string = "";
  @Input() fieldName: string = "";
  @Input() helpText: string = "";
  @Input() mandatoryText: string = "";
  @Input() columns: number = 12;
  @Input() screenColumns: number = 12;
  @Input() mandatory: boolean = false;
  @Input() formatTypeId: number = 0;
  @Input() decimalPlaces: number = 0;
  @Input() enteredValue: string = "";
  @Input() valid: boolean = false;


  @Output() returnValue = new EventEmitter<IFieldValue>();

  private columnsCss: string = "";
  private screenColumnsCss: string = "";
  private mandatoryImage: string = "";

  constructor(private objectHelperService: ObjectHelperService) { }

  ngOnChanges() { this.ngOnInit }

  ngOnInit() {
    this.columnsCss = this.objectHelperService.getColumns(this.columns);
    this.screenColumnsCss = this.objectHelperService.getColumns(this.screenColumns);
    this.mandatoryImage = this.objectHelperService.getMandatoryImage(this.mandatory);
  }

  objectChanged(newValue: string) {
    console.log(` formatTypeId ${this.formatTypeId}: ${newValue}`);
    let validObject: boolean = false;
    if (this.formatTypeId > 0) {
      if (this.formatTypeId != FormatType.TestEmailAddress) {
        newValue = this.objectHelperService.formatText(this.formatTypeId, newValue, this.decimalPlaces);
        if (newValue != "" && this.mandatory) {
          validObject = true;
        }
        if (!this.mandatory) {
          validObject = true;
        }
      }
      else {
        validObject = this.objectHelperService.formatText(this.formatTypeId, newValue, this.decimalPlaces) == "true" ? true : false;
      }
    }
    let fieldValue: IFieldValue = {
      fieldName: this.fieldName,
      fieldValue: newValue,
      valid: validObject
    }
    console.log(`send fieldValue ${fieldValue.fieldName}: ${fieldValue.fieldValue}: valid = ${validObject}`);
    this.enteredValue = newValue;
    this.returnValue.emit(fieldValue);
  }
}
