import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  producto: any;
  relatedProducts: any[] = [];
  selectedImage: string | null = null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) { }

  async ngOnInit() {

    this.route.paramMap.subscribe(async (params) => {
      const id = Number(params.get('id'));
      this.producto = await this.productService.getProductById(id);
      //console.log(this.producto);

      this.relatedProducts = await this.productService.obtenerProductosRelacionados(this.producto.category.id);
      //console.log(this.relatedProducts);
    });

  }

  verDetalle(id: number) {
    //console.log(id);

    this.router.navigate(['/product', id]);


  }

}
