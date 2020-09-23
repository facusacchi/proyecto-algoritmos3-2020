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
/* import { AppRoutinModule } from './components/app-routing.module'; */

@NgModule({
  declarations: [
    AppComponent,
    /* AppRoutinModule, */
    PrimaryButtonComponent,
    HeaderComponent,
    LoginFormComponent,
    FooterComponent,
    PerfilUsuarioFormComponent,
    SecondaryButtonComponent,
    CardRecetaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
