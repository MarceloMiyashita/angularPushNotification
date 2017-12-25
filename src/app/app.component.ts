import { Component, OnInit } from '@angular/core';
//import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AngularFirestore } from 'angularfire2/firestore';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'app';
  searchterm:string;

  startAt = new Subject;
  endAt = new Subject();

  produtos;
  allprodutos;

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  constructor(private afs: AngularFirestore){
  }

  ngOnInit(){
   this.getallprodutos().subscribe((produtos) =>{
     this.allprodutos = produtos;
   })

    Observable.combineLatest(this.startobs, this.endobs).subscribe((value) =>{
      this.firequery(value[0], value[1]).subscribe((produtos) => {
        this.produtos = produtos;
      })
    })
  }

  search($event){
      let q = $event.target.value;
      if(q !=''){
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
  }else{
    this.produtos = this.allprodutos;
  }
}

firequery(start, end) {
  return this.afs.collection('produtos', ref => ref.limit(4).orderBy('description').startAt(start).endAt(end)).valueChanges();
}
getallprodutos(){
  return this.afs.collection('produtos', ref => ref.orderBy('description')).valueChanges();
}
}