export enum MagicApi {
  Names,
  PageQuestionsMappings,
  PageButtonManage,
  PageOrders,
  DynamicNameAddress,
  DdlDatas
}

export enum PageGroup {
  MainDetails = 1
}

export enum PageName {
  NameAndAddress = 1
}

export enum ObjectTypes {
  Textbox = 1,
  Textarea = 2,
  OptionButton = 3,
  Dropdown = 4,
  PageHeading = 5,
  Title = 6,
  Button = 7,
  Date = 8
}

export enum FormatType {
  PascalCase = 1,
  CamelCase = 2,
  SentenceCase = 3,
  UpperCase = 4,
  LowerCase = 5,
  NumericOnly = 6,
  TestEmailAddress = 7,
  SpaceSeparated = 8,
  UpperCaseFirstCharacter = 9,
  Date = 10
}

export enum SessionObject {
  MappedQuestions,
  PageOrder,
  DdlData,
  BreadcrumbTrail
}

export enum ButtonType {
  Back,
  Forward
}

export enum DdlType {
  DaysOfWeek = 1,
  TimeAtAddress = 2
}
