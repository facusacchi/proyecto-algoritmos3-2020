import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { PerfilUsuarioFormComponent } from './components/perfil-usuario-form/perfil-usuario-form.component';
import { SecondaryButtonComponent } from './components/secondary-button/secondary-button.component';
import { CardRecetaComponent } from './components/card-receta/card-receta.component';
import { AppRoutinModule, routingComponents } from './components/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NavBusquedaComponent } from './components/nav-busqueda/nav-busqueda.component';
import { NavButtonComponent } from './components/nav-button/nav-button.component';
import { RecetaComponent } from './components/receta/receta.component';
import { RecetaPipe } from './receta.pipe';
import { CondicionAlimenticiaComponent } from './components/condicion-alimenticia/condicion-alimenticia.component';

@NgModule({
  declarations: [	
    AppComponent,
    PrimaryButtonComponent,
    HeaderComponent,
    LoginFormComponent,
    FooterComponent,
    PerfilUsuarioFormComponent,
    SecondaryButtonComponent,
    CardRecetaComponent,
    routingComponents,
    HomeComponent,
    NavBusquedaComponent,
    NavButtonComponent,
    RecetaPipe,
    RecetaComponent,
    CondicionAlimenticiaComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutinModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
