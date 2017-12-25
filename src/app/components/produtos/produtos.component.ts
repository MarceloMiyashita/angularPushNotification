import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
//import { ViewEncapsulation } from '@angular/core/src/metadata/view';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  encapsulation: ViewEncapsulation.None   
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[];
  editState: boolean = false;
  produtoToEdit: Produto;

  constructor(public produtoService: ProdutoService) { }

  ngOnInit() {
    this.produtoService.getProdutos().subscribe(produtos => {
      console.log(produtos);
      this.produtos = produtos;
    });
  }
  deleteProduto(event, produto){
   const response = confirm('Voce deseja excluir esta ação?');
   if(response){
     this.produtoService.deleteProduto(produto);
   }
   return;
  }

  editProduto(event, produto){
    this.editState = !this.editState;
    this.produtoToEdit = produto;
  }
  
  updateProduto(produto){
    this.produtoService.updateProduto(produto);
    this.editState = false;
    this.produtoToEdit = null;
  }
}
