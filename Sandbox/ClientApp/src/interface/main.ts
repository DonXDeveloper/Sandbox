export interface IObjectGroup {
  objectName: string,
  value: string,
  visible: boolean
}

export interface IBreadcrumbTrail {
  pageName: string,
  pageNumber: number
}

export interface IName {
  nameId: number,
  firstName: string,
  lastName: string
}

export interface IAddress {
  addressId: number,
  nameId: number,
  address1: string,
  address2: string,
  address3: string,
  address4: string,
  postcode: string
}

export interface IContactDetails {
  contactDetailsId: number,
  nameId: number,
  contactTypeId: string,
  contactDetail: string,
  mainContact: boolean
}

export interface IQuestionsMapped {
  pageGroupId: number,
  pageId: number,
  questionText: string,
  displayOrder: number,
  optionNextList: string,
  optionTextList: string,
  nextQuestion: number,
  repeatNext: number,
  objectTypeId: number,
  columns: number,
  screenColumns: number,
  fieldName: string,
  tableName: string,
  columnName: string,
  referenceTable: string,
  referenceId: number,
  maxSize: number,
  mandatory: boolean,
  inUse: boolean,
  helpText: string,
  mandatoryText: string,
  formatTypeId: number,
  decimalPlaces: number,
  enteredValue: string,
  show: boolean,
  valid: boolean,
  tableRecordId: number
}

export interface ITableData {
  tableName: string,
  columnName: string,
  referenceTable: string,
  referenceId: number,
  enteredValue: string,
  tableRecordId: number
}

export interface IQuestionQuery {
  pageGroupId: number,
  pageId: number
}

export interface IOptionButtonData {
  buttonCount: number,
  optionTextList: string[],
  optionNextList: string[],
  selected: boolean[]
}

export interface IFieldValue {
  fieldName: string,
  fieldValue: string,
  valid: boolean
}

export interface IPageButtonManager {
  pageButtonManagerId: number,
  pageGroupId: number,
  pageId: number,
  backbutton: boolean,
  backButtonText: string,
  backPageId: number,
  forwardButton: boolean,
  forwardButtonText: string,
  forwardPageId: number
}

export interface IButton {
  buttonType: number,
  buttonText: string,
  pageId: number,
  clicked: boolean,
  css: string
}

export interface IPageOrder {
  pageOrderId: number,
  pageGroupId: number,
  pageId: number,
  displayOrder: number
}

export interface ITableId {
  tableName: string,
  id: number
}

export interface IDdlData {
  ddlDataId: number,
  ddlTypeId: number,
  ddlItemKey: number,
  ddlItemValue: string
}
