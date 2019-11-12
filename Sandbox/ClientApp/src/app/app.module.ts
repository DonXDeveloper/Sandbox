import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from './MaterialModule';

import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common"
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
//import { HomeComponent } from './home/home.component';
//import { CounterComponent } from './counter/counter.component';
//import { FetchDataComponent } from './fetch-data/fetch-data.component';


import { ObjectsTextboxComponent } from './objects-textbox/objects-textbox.component';
import { ObjectsTextareaComponent } from './objects-textarea/objects-textarea.component';
import { ObjectsButtonComponent } from './objects-button/objects-button.component';
import { ObjectsDropdownComponent } from './objects-dropdown/objects-dropdown.component';
import { ObjectsTitleComponent } from './objects-title/objects-title.component';
import { MainFormComponent } from './main-form/main-form.component';
import { TestFormComponent } from './test-form/test-form.component';
import { CommonFormComponent } from './common-form/common-form.component';
import { ObjectsOptionButtonComponent } from './objects-option-button/objects-option-button.component';
import { ObjectsPageHeadingComponent } from './objects-page-heading/objects-page-heading.component';
import { ObjectsBreadcrumbsComponent } from './objects-breadcrumbs/objects-breadcrumbs.component';
import { ObjectsDateComponent } from './objects-date/objects-date.component';
import { ObjectsCalloutComponent } from './objects-callout/objects-callout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    

    //HomeComponent,
    //CounterComponent,
    //FetchDataComponent,
    ObjectsTextboxComponent,
    ObjectsTextareaComponent,
    ObjectsButtonComponent,
    ObjectsDropdownComponent,
    ObjectsTitleComponent,
    MainFormComponent,
    TestFormComponent,
    CommonFormComponent,
    ObjectsOptionButtonComponent,
    ObjectsPageHeadingComponent,
    ObjectsBreadcrumbsComponent,
    ObjectsDateComponent,
    ObjectsCalloutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MaterialModule,
    //NgbModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: MainFormComponent, pathMatch: 'full' },
      //{ path: 'counter', component: CounterComponent },
      //{ path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
