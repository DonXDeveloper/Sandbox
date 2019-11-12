import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ObjectHelperService } from "../../services/object-helper.service";
import { IPageButtonManager, IButton } from '../../interface/main';
import { ButtonType } from '../../enum/enum';

@Component({
  selector: 'app-objects-button',
  templateUrl: './objects-button.component.html',
  styleUrls: ['./objects-button.component.scss']
})
export class ObjectsButtonComponent implements OnInit {
  @Input() pageButtonManager: IPageButtonManager;
  @Input() enabled: boolean = false;;
  @Input() fieldName: string = "";
  @Input() helpText: string = "";
  @Input() columns: number = 12;
  @Input() screenColumns: number = 12;

  @Output() pageChanged = new EventEmitter<number>();

  private columnsCss: string = "";
  private screenColumnsCss: string = "";
  private buttons: IButton[] = [];
  private clickCss: string = "";

  eButtonType = ButtonType;

  constructor(private objectHelperService: ObjectHelperService) { }

  ngOnChanges() { this.ngOnInit(); }

  ngOnInit() {
    this.getButtons();
    this.columnsCss = this.objectHelperService.getColumns(this.columns);
    this.screenColumnsCss = this.objectHelperService.getColumns(this.screenColumns);
  }

  getButtons() {
    let button: IButton;
    this.buttons.length = 0;
    let forwardButtonCss = this.enabled ? "forwardButtonEnabled" : "forwardButtonDisabled";

    if (this.pageButtonManager != null) {
      if (this.pageButtonManager.backbutton) {
        button = {
          buttonType: ButtonType.Back,
          buttonText: this.pageButtonManager.backButtonText,
          pageId: this.pageButtonManager.backPageId,
          clicked: false,
          css: "backButton"
        }
        this.buttons.push(button);
      }
      if (this.pageButtonManager.forwardButton) {
        button = {
          buttonType: ButtonType.Forward,
          buttonText: this.pageButtonManager.forwardButtonText,
          pageId: this.pageButtonManager.forwardPageId,
          clicked: false,
          css: forwardButtonCss
        }
        this.buttons.push(button);
      }
    }
  }

  buttonClicked(whichButton: ButtonType) {
    let whatPage: number = 0;
    this.buttons.forEach(button => {
      if (button.buttonType == whichButton) {
        button.clicked = true;
      }
      else {
        button.clicked = false;
      }
    });

    switch (whichButton) {
      case ButtonType.Back: {
        this.clickCss = "backClicked";
        whatPage = this.pageButtonManager.backPageId;
        break;
      }
      case ButtonType.Forward: {
        this.clickCss = "forwardClicked";
        whatPage = this.pageButtonManager.forwardPageId;
        break;
      }
    }
    this.pageChanged.emit(whatPage);
  }

  buttonKeyUp(event: KeyboardEvent) {
    //console.log(`buttonKeyUp `);
    this.clickCss = "";
  }

  buttonKeyDown(event: KeyboardEvent) {
    //console.log(`buttonKeyDown `);
    this.clickCss = "";
  }

  onKeydownEvent(event: KeyboardEvent): void {
    if (event.keyCode === 13 && event.shiftKey) {


    }
  }
}
