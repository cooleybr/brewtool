import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { BatchesComponent } from './batches/batches.component';
import { HomeComponent } from './home/home.component';
import { MetricsComponent } from './metrics/metrics.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'recipes', component: RecipeComponent },
  { path: 'batches', component: BatchesComponent },
  { path: 'batches/:id', component: BatchesComponent },
  { path: 'metrics', component: MetricsComponent },
  { path: 'metrics/:id', component: MetricsComponent }
 ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
