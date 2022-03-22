import { Category } from './category';

export class Plant {
  name: string;
  price: number;
  quantity: number;
  inStock: boolean;
  category: Category;
  urlPicture: string;
  rating: number;
  id: number | null;

  constructor(
    name: string = '',
    price: number = 5.0,
    quantity: number = 1,
    inStock: boolean | string = true,
    category: Category = Category.plantesVertes,
    urlPicture: string = 'https://picsum.photos/id/18/200/300',
    rating: number = 0,
    id: number | null = null
  ) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;

    if (inStock === 'partiellement disponible' || inStock === 'disponible') {
      this.inStock = true;
    } else {
      this.inStock = false;
    }

    this.category = category;
    this.urlPicture = urlPicture;
    this.rating = rating;
    this.id = id;
  }
}
