import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-add-produtos',
  templateUrl: './add-produtos.component.html',
  styleUrls: ['./add-produtos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddProdutosComponent implements OnInit {
  produto: Produto = {
    codigo: '',
    description: '',
    loja: '',
    secao: '',
    tipo: '',
    validade:'',
    qtde:''
  };

  constructor(public produtoService: ProdutoService) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.produto.codigo != '' && this.produto.description !='' && this.produto.qtde!='' && this.produto.loja !='' && this.produto.secao != '' && this.produto.tipo !='' && this.produto.validade !=''){}
    this.produtoService.addProduto(this.produto);
    this.produto.codigo;
    this.produto.description;
    this.produto.loja;
    this.produto.secao;
    this.produto.tipo;
    this.produto.validade;
    this.produto.qtde;
  }

}
