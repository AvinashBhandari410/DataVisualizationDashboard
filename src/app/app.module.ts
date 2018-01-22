import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { AppComponent } from './app.component';
import { FusionChartsModule } from 'angular4-fusioncharts';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // Specify FusionChartsModule as an import
    // and pass FusionCharts, Charts and FintTheme as dependencies.
    // You can also pass all other FusionCharts modules such as
    // PowerCharts, FusionMaps, Map Definitions, Widgets, Themes etc after FusionCharts.
    FusionChartsModule.forRoot(FusionCharts, Charts, FintTheme)
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
