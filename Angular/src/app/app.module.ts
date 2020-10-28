import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SecondaryButtonComponent } from './components/secondary-button/secondary-button.component';
import { CardRecetaComponent } from './components/card-receta/card-receta.component';
import { AppRoutinModule, routingComponents } from './components/app-routing.module';
import { NavBusquedaComponent } from './components/nav-busqueda/nav-busqueda.component';
import { NavButtonComponent } from './components/nav-button/nav-button.component';
import { RecetaPipe } from './receta.pipe';
import { CondicionAlimenticiaComponent } from './components/condicion-alimenticia/condicion-alimenticia.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    PrimaryButtonComponent,
    HeaderComponent,
    FooterComponent,
    SecondaryButtonComponent,
    CardRecetaComponent,
    routingComponents,
    NavBusquedaComponent,
    NavButtonComponent,
    RecetaPipe,
    CondicionAlimenticiaComponent,
    TablaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutinModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
