import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ObjectHelperService } from "../../services/object-helper.service";
import { IOptionButtonData, IFieldValue } from '../../interface/main';


@Component({
  selector: 'app-objects-option-button',
  templateUrl: './objects-option-button.component.html',
  styleUrls: ['./objects-option-button.component.scss']
})

export class ObjectsOptionButtonComponent implements OnInit {
  @Input() questionText: string = "";
  @Input() fieldName: string = "";
  @Input() optionTextList: string = "";
  @Input() optionNextList: string = "";
  @Input() helpText: string = "";
  @Input() mandatoryText: string = "";
  @Input() columns: number = 12;
  @Input() screenColumns: number = 12;
  @Input() mandatory: boolean = false;
  @Input() enteredValue: string = "";

  @Output() returnValue = new EventEmitter<IFieldValue>();

  private optionButtonData: IOptionButtonData;
  private columnsCss: string = "";
  private screenColumnsCss: string = "";
  private mandatoryImage: string = "";
  private enabled: boolean = false;
  private selectedText: string = "";

  constructor(private objectHelperService: ObjectHelperService) { }

  ngOnInit() {
    this.columnsCss = this.objectHelperService.getColumns(this.columns);
    this.screenColumnsCss = this.objectHelperService.getColumns(this.screenColumns);
    this.mandatoryImage = this.objectHelperService.getMandatoryImage(this.mandatory);
    this.optionButtonData = this.objectHelperService.getOptionButtonData(this.optionTextList, this.optionNextList)
    this.objectChanged(this.enteredValue, false);
  }

  // button has been selected or changed
  objectChanged(newValue: string, emit: boolean) {
    let selectedValue: number = this.setSelectedValue(newValue);
    let fieldValue: IFieldValue = {
      fieldName: this.fieldName,
      fieldValue: selectedValue.toString(),
      valid: true
    }
    if (emit) {
      this.returnValue.emit(fieldValue);
    }
  }

  // set the position of the selected button text
  setSelectedValue(newValue: string):number {
    let itemCounter: number = 1;
    let selectedItem: number = 1;
    this.optionButtonData.optionTextList.forEach(button => {
      if (button == newValue || itemCounter == parseInt(newValue)) {
        this.optionButtonData.selected[selectedItem] = true;
        selectedItem = itemCounter;
        this.selectedText = button;
      }
      else {
        this.optionButtonData.selected[selectedItem] = false;
      }
      itemCounter++;
    });
    return selectedItem;
  }

}
