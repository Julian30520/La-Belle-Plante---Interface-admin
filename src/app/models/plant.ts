import {Category} from "./category";

export class Plant {
  name: string;
  price: number;
  quantity: number;
  inStock: boolean;
  category: Category;
  urlPicture: string;
  rating: number;
  id: number;

  constructor(
    name: string,
    price: string,
    quantity: number,
    inStock: string,
    category: Category,
    urlPicture: string = "https://picsum.photos/id/18/200/300",
    rating: number = 0,
    id: string
  ) {
    this.name = name;
    this.price = parseFloat(price);
    this.quantity = quantity;

    if (inStock === "partiellement disponible" || inStock === "disponible") {
      this.inStock = true;
    } else {
      this.inStock = false;
    }

    this.category = category;
    this.urlPicture = urlPicture;
    this.rating = rating;
    this.id = parseInt(id);
  }
}

