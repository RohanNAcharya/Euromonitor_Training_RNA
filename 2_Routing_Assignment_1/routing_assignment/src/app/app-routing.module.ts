import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResearchDevelopmentComponent } from './research-development/research-development.component';
import { BusninessComponent } from './business/busniness.component';
import { TechnologyComponent } from './technology/technology.component';
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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Research_Development', component: ResearchDevelopmentComponent },
  { path: 'Business', component: BusninessComponent },
  { path: 'Technology', component: TechnologyComponent },

  { path: 'Research_Development', children: [
    { path: 'Catalyst', component: CatalystComponent },
    { path: 'One_Research', component: OneResearchComponent }
  ]},

  { path: 'Business', children: [
    { path: 'Marketing', component: MarketingComponent },
    { path: 'Sales', component: SalesComponent },
    { path: 'Accounts', component: AccountsComponent }
  ]},

  { path: 'Technology', children: [
    { path: 'Soft_Engineering', component: SoftEngineeringComponent },
    { path: 'Publication', component: PublicationComponent },
    { path: 'Cloud_Engineering', component: CloudEngineeringComponent },
  ]},

  { path: 'Technology/Soft_Engineering', children: [
    { path: 'Data_Transformation', component: DataTransformationComponent },
    { path: 'Passport', component: PassportComponent },
    { path: 'ISSAC', component: IssacComponent },
    { path: 'Ecom', component: EComComponent },
  ]},

  { path: 'Technology/Soft_Engineering/Data_Transformation', children: [
    { path: 'DT-1', component: DT1Component },
    { path: 'DT-2', component: DT2Component },
    { path: 'DT-3', component: DT3Component }
  ]},

  { path: 'Technology/Soft_Engineering/Passport', children: [
    { path: 'PP1', component: PP1Component },
    { path: 'PP2', component: PP2Component },
    { path: 'PP3', component: PP3Component },
    { path: 'PP4', component: PP4Component }
  ]},

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
