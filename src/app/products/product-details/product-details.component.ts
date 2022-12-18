import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy, OnChanges {
  product: IProduct | null = null;
  constructor(private activatedRoute: ActivatedRoute) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.product = this.activatedRoute.snapshot.data?.['product'];
  }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data?.['product'];
  }

  ngOnDestroy(): void{
    this.product =null
  }

}
