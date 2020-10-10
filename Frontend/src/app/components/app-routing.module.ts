import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { PerfilUsuarioFormComponent } from './perfil-usuario-form/perfil-usuario-form.component';
import { HomeComponent } from './home/home.component';
import { RecetaComponent } from './receta/receta.component';
import { AgregarIngredienteComponent } from './agregar-ingrediente/agregar-ingrediente.component';
import { AgregarAlimentoComponent } from './agregar-alimento/agregar-alimento.component';

export const routes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: 'perfilDeUsuario', component: PerfilUsuarioFormComponent },
    { path: 'home', component: HomeComponent },
    { path: 'receta/:id', component: RecetaComponent },
    { path: 'agregarIngrediente/:recetaId', component: AgregarIngredienteComponent },
    { path: 'agregarAlimentoPreferido', component: AgregarAlimentoComponent },
    { path: 'agregarAlimentoDisgustado', component: AgregarAlimentoComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutinModule { }

export const routingComponents = [
    LoginFormComponent,
    PerfilUsuarioFormComponent,
    HomeComponent,
    RecetaComponent,
    AgregarIngredienteComponent,
    AgregarAlimentoComponent,
]