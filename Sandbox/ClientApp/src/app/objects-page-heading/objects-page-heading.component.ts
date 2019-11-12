import { Component, OnInit, Input } from '@angular/core';
import { ObjectHelperService } from "../../services/object-helper.service";

@Component({
  selector: 'app-objects-page-heading',
  templateUrl: './objects-page-heading.component.html',
  styleUrls: ['./objects-page-heading.component.scss']
})
export class ObjectsPageHeadingComponent implements OnInit {

  @Input() questionText: string = "";
  @Input() columns: number = 12;
  @Input() screenColumns: number = 12;

  private columnsCss: string = "";
  private screenColumnsCss: string = "";

  constructor(private objectHelperService: ObjectHelperService) { }

  ngOnInit() {
    this.columnsCss = this.objectHelperService.getColumns(this.columns);
    this.screenColumnsCss = this.objectHelperService.getColumns(this.screenColumns);
  }

}
