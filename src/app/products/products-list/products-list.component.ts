import { Component, OnInit } from '@angular/core';
import Backendless from 'backendless';
import { from} from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productList: IProduct[] | null = null;
  constructor() { }

  ngOnInit(): void {
    // const subscription = Observable.fromPromise(Backendless.Data.of('products'));
    from(Backendless.Data.of('products').find()).subscribe({
      next: (value) => {
        this.productList = value as IProduct[];
      },
      error: (err) => {
        console.error(err);
      },
    })

    // Backendless.Data.of('products').find()
  }

}

// const products: IProduct[] = from(Backendless.Data.of('products')).pipe(take(1),)