import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResearchDevelopmentComponent } from './research-development/research-development.component';
import { BusninessComponent } from './business/busniness.component';
import { TechnologyComponent } from './technology/technology.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CatalystComponent } from './research-development/catalyst/catalyst.component';
import { OneResearchComponent } from './research-development/one-research/one-research.component';
import { MarketingComponent } from './business/marketing/marketing.component';
import { SalesComponent } from './business/sales/sales.component';
import { AccountsComponent } from './business/accounts/accounts.component';
import { SoftEngineeringComponent } from './technology/soft-engineering/soft-engineering.component';
import { PublicationComponent } from './technology/publication/publication.component';
import { CloudEngineeringComponent } from './technology/cloud-engineering/cloud-engineering.component';
import { DataTransformationComponent } from './technology/soft-engineering/data-transformation/data-transformation.component';
import { PassportComponent } from './technology/soft-engineering/passport/passport.component';
import { IssacComponent } from './technology/soft-engineering/issac/issac.component';
import { EComComponent } from './technology/soft-engineering/e-com/e-com.component';
import { DT1Component } from './technology/soft-engineering/data-transformation/dt-1/dt-1.component';
import { DT2Component } from './technology/soft-engineering/data-transformation/dt-2/dt-2.component';
import { DT3Component } from './technology/soft-engineering/data-transformation/dt-3/dt-3.component';
import { PP1Component } from './technology/soft-engineering/passport/pp1/pp1.component';
import { PP2Component } from './technology/soft-engineering/passport/pp2/pp2.component';
import { PP3Component } from './technology/soft-engineering/passport/pp3/pp3.component';
import { PP4Component } from './technology/soft-engineering/passport/pp4/pp4.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ResearchDevelopmentComponent,
    BusninessComponent,
    TechnologyComponent,
    HeaderComponent,
    HomeComponent,
    CatalystComponent,
    OneResearchComponent,
    MarketingComponent,
    SalesComponent,
    AccountsComponent,
    SoftEngineeringComponent,
    PublicationComponent,
    CloudEngineeringComponent,
    DataTransformationComponent,
    PassportComponent,
    IssacComponent,
    EComComponent,
    DT1Component,
    DT2Component,
    DT3Component,
    PP1Component,
    PP2Component,
    PP3Component,
    PP4Component,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
