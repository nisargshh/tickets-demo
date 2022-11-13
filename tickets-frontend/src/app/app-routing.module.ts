import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetTicketsComponent } from './component/get-tickets/get-tickets.component';
import { HomePageComponent } from './component/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'tickets', component: GetTicketsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
