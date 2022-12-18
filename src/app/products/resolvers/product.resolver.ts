import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { from, Observable } from 'rxjs';
import { IProduct } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<IProduct | null> {
  res: IProduct | null  = null;
  constructor(private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IProduct | null | Observable<IProduct> | Promise<IProduct> {
    const productId = route.params['id'];
    if (!productId) {
      this.router.navigate(['products/products-list']);
      return null;
    }
    from(Backendless.Data.of('products').findById(productId)).subscribe({
      next: (value) => {
        this.res = value as IProduct;
      },
      error: (err) => {
        console.error(err);
        this.res = null;
        this.router.navigate(['products/products-list']);
      },
    });
    if ( this.res === null){
      this.router.navigate(['products/products-list']);
    }
    return this.res;
  }
}
