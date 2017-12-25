import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component'; 

import { ProdutosComponent } from './components/produtos/produtos.component';
import { AddProdutosComponent } from './components/add-produtos/add-produtos.component';

import { environment } from '../environments/environment';
import  { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {ProdutoService} from './services/produto.service';

import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    AddProdutosComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [ProdutoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
