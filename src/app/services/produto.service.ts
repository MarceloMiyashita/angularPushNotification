import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument 
} from 'angularfire2/firestore';

import { Produto } from '../models/produto';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProdutoService {
  produtosCollection: AngularFirestoreCollection<Produto>;
  produtos: Observable<Produto[]>;
  produtoDoc: AngularFirestoreDocument<Produto>;

  constructor(public afs:AngularFirestore) {
    this.produtosCollection = this.afs.collection('produtos');
    // this.tasks = this.afs.collection('tasks').valueChanges();
    this.produtos = this.produtosCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Produto;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getProdutos() {
    return this.produtos; 
  }

  addProduto(produto: Produto) {
    this.produtosCollection.add(produto);
  }

  deleteProduto(produto: Produto) {
    this.produtoDoc = this.afs.doc(`produtos/${produto.id}`);
    this.produtoDoc.delete();
  }

  updateProduto(produto: Produto) {
    this.produtoDoc = this.afs.doc(`produtos/${produto.id}`);
    this.produtoDoc.update(produto);
  }
}
