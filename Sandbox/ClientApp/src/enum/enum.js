"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MagicApi;
(function (MagicApi) {
    MagicApi[MagicApi["Names"] = 0] = "Names";
    MagicApi[MagicApi["PageQuestionsMappings"] = 1] = "PageQuestionsMappings";
    MagicApi[MagicApi["PageButtonManage"] = 2] = "PageButtonManage";
    MagicApi[MagicApi["PageOrders"] = 3] = "PageOrders";
    MagicApi[MagicApi["DynamicNameAddress"] = 4] = "DynamicNameAddress";
    MagicApi[MagicApi["DdlDatas"] = 5] = "DdlDatas";
})(MagicApi = exports.MagicApi || (exports.MagicApi = {}));
var PageGroup;
(function (PageGroup) {
    PageGroup[PageGroup["MainDetails"] = 1] = "MainDetails";
})(PageGroup = exports.PageGroup || (exports.PageGroup = {}));
var PageName;
(function (PageName) {
    PageName[PageName["NameAndAddress"] = 1] = "NameAndAddress";
})(PageName = exports.PageName || (exports.PageName = {}));
var ObjectTypes;
(function (ObjectTypes) {
    ObjectTypes[ObjectTypes["Textbox"] = 1] = "Textbox";
    ObjectTypes[ObjectTypes["Textarea"] = 2] = "Textarea";
    ObjectTypes[ObjectTypes["OptionButton"] = 3] = "OptionButton";
    ObjectTypes[ObjectTypes["Dropdown"] = 4] = "Dropdown";
    ObjectTypes[ObjectTypes["PageHeading"] = 5] = "PageHeading";
    ObjectTypes[ObjectTypes["Title"] = 6] = "Title";
    ObjectTypes[ObjectTypes["Button"] = 7] = "Button";
    ObjectTypes[ObjectTypes["Date"] = 8] = "Date";
})(ObjectTypes = exports.ObjectTypes || (exports.ObjectTypes = {}));
var FormatType;
(function (FormatType) {
    FormatType[FormatType["PascalCase"] = 1] = "PascalCase";
    FormatType[FormatType["CamelCase"] = 2] = "CamelCase";
    FormatType[FormatType["SentenceCase"] = 3] = "SentenceCase";
    FormatType[FormatType["UpperCase"] = 4] = "UpperCase";
    FormatType[FormatType["LowerCase"] = 5] = "LowerCase";
    FormatType[FormatType["NumericOnly"] = 6] = "NumericOnly";
    FormatType[FormatType["TestEmailAddress"] = 7] = "TestEmailAddress";
    FormatType[FormatType["SpaceSeparated"] = 8] = "SpaceSeparated";
    FormatType[FormatType["UpperCaseFirstCharacter"] = 9] = "UpperCaseFirstCharacter";
    FormatType[FormatType["Date"] = 10] = "Date";
})(FormatType = exports.FormatType || (exports.FormatType = {}));
var SessionObject;
(function (SessionObject) {
    SessionObject[SessionObject["MappedQuestions"] = 0] = "MappedQuestions";
    SessionObject[SessionObject["PageOrder"] = 1] = "PageOrder";
    SessionObject[SessionObject["DdlData"] = 2] = "DdlData";
    SessionObject[SessionObject["BreadcrumbTrail"] = 3] = "BreadcrumbTrail";
})(SessionObject = exports.SessionObject || (exports.SessionObject = {}));
var ButtonType;
(function (ButtonType) {
    ButtonType[ButtonType["Back"] = 0] = "Back";
    ButtonType[ButtonType["Forward"] = 1] = "Forward";
})(ButtonType = exports.ButtonType || (exports.ButtonType = {}));
var DdlType;
(function (DdlType) {
    DdlType[DdlType["DaysOfWeek"] = 1] = "DaysOfWeek";
    DdlType[DdlType["TimeAtAddress"] = 2] = "TimeAtAddress";
})(DdlType = exports.DdlType || (exports.DdlType = {}));
//# sourceMappingURL=enum.js.map