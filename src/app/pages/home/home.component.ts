import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductComponent } from '../../components/product/product.component';
import { InfoDialogComponent } from '../../components/info-dialog/info-dialog.component';

@Component({
  selector: 'app-home',
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
    MatDialogModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products: any[] = [];
  litmite = 10;
  desplazamiento = 0;
  productForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute

  ) {

    this.cargarProductos();
  }


  async cargarProductos() {
    this.products = await this.productService.obtenerProductos(this.litmite, this.desplazamiento);


  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  async borrarProductos(id: number) {
    await this.productService.borrarProductos(id);
    this.dialog.open(InfoDialogComponent, { width: '400px' });
    this.cargarProductos(); // recargar
  }

  siguientePag() {
    console.log(this.desplazamiento, this.litmite);
    this.desplazamiento += this.litmite;
    this.cargarProductos();
  }

  anteriorPag() {
    if (this.desplazamiento > 0) {
      this.desplazamiento -= this.litmite;
      this.cargarProductos();
    }
  }
  async crearProducto() {

    console.log(this.productForm.value);
    if (this.productForm.valid) {
      const values = this.productForm.value;

      const producto = {
        title: values.title,
        price: parseFloat(values.price),
        description: values.description,
        categoryId: 1,
        images: [values.image]
      };

      await this.productService.crearProducto(producto);
      this.dialog.closeAll();
      this.cargarProductos();
    }
  }
  async abrirFormulario() {


    const dialogRef = this.dialog.open(ProductComponent, { width: '400px' });
    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      await this.productService.crearProducto(result);
      console.log('Producto creado:', result);
    }
  }
  cerrarDialogo() {
    this.dialog.closeAll();
  }
  verDetalle(id: number) {
    this.router.navigate(['/product', id], { relativeTo: this.route });
  }


}
