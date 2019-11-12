import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ObjectHelperService } from "../../services/object-helper.service";
import { IFieldValue, IDdlData } from '../../interface/main';
import { FormatType, DdlType } from '../../enum/enum';
import { SessionHelperService } from "../../services/session-helper.service";

@Component({
  selector: 'app-objects-dropdown',
  templateUrl: './objects-dropdown.component.html',
  styleUrls: ['./objects-dropdown.component.scss']
})
export class ObjectsDropdownComponent implements OnInit {
  @Input() questionText: string = "";
  @Input() fieldName: string = "";
  @Input() helpText: string = "";
  @Input() mandatoryText: string = "";
  @Input() columns: number = 12;
  @Input() screenColumns: number = 12;
  @Input() maxSize: number = 0;
  @Input() mandatory: boolean = false;
  @Input() ddlTypeId: number = 0;
  @Input() enteredValue: string = "";
  @Input() valid: boolean = false;


  @Output() returnValue = new EventEmitter<IFieldValue>();

  private columnsCss: string = "";
  private screenColumnsCss: string = "";
  private mandatoryImage: string = "";
  private ddlList: IDdlData[];
  private ddlDefault: number = 1;
  private upArrow: string = "&#9650;";
  private downArrow: string = "&#9660;";
  private open: boolean = false;
  private defaultDisplay: string = "";

  constructor(private objectHelperService: ObjectHelperService,
    private sessionHelperService: SessionHelperService) { }

  ngOnInit() {
    console.log(` open ${this.open}`);

    this.columnsCss = this.objectHelperService.getColumns(this.columns);
    this.screenColumnsCss = this.objectHelperService.getColumns(this.screenColumns);
    this.mandatoryImage = this.objectHelperService.getMandatoryImage(this.mandatory);
    this.getDdlList();
  }

  getDdlList() {
    this.ddlList = this.sessionHelperService.getDdlDataByType(this.ddlTypeId);
    this.ddlDefault = this.enteredValue == "" ? 1 : parseInt(this.enteredValue);
    this.getDefault();
  }

  getDefault() {
    if (this.ddlList != null) {
      this.ddlList.forEach(item => {
        if (this.ddlDefault == item.ddlItemKey) {
          this.defaultDisplay = item.ddlItemValue;
        }
      });
    }
  }

  selectionChanged(newValue: number) {
    this.ddlDefault = newValue;
    this.getDefault();
    let fieldValue: IFieldValue = {
      fieldName: this.fieldName,
      fieldValue: newValue.toString(),
      valid: true
    }
     console.log(`send fieldValue ${fieldValue.fieldName}: ${fieldValue.fieldValue}`);
    this.returnValue.emit(fieldValue);
  }

  toggleOpen() {
    this.open = !this.open;
  }
}
