import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { FileUploadModule } from 'primeng/fileupload';
import { ChartModule } from 'primeng/chart';

import { RecipeComponent } from './recipe/recipe.component';
import { BatchesComponent } from './batches/batches.component';
import { MetricsComponent, FilterPipe } from './metrics/metrics.component';

import { DataService } from './services/data.service';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    BatchesComponent,
    MetricsComponent,
    NavComponent,
    HomeComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SidebarModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    ListboxModule,
    HttpClientModule,
    MenubarModule,
    FileUploadModule,
    ChartModule,
    TableModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
