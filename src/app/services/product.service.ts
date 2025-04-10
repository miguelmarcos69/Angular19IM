import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://api.escuelajs.co/api/v1/products';

  async obtenerProductos(limit = 10, offset = 0): Promise<any[]> {
    const response = await fetch(this.baseUrl + '?limit=' + limit + '&offset=' + offset);
    return response.json();
  }

  async borrarProductos(id: number): Promise<void> {
    const response = await fetch(this.baseUrl + '/' + id, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Error al eliminar producto');
    }
  }

  async crearProducto(data: any): Promise<any> {

    const body = {
      title: data.title,
      price: parseFloat(data.price),
      description: data.description,
      categoryId: 1,
      images: [data.image]
    };
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });


    return response.json();
  }

  async getProductById(id: number): Promise<any> {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    return res.json();
  }

  async obtenerProductosRelacionados(id: number): Promise<any[]> {
    const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}/products`);
    return res.json();
  }

}
