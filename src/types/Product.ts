import { StaticImageData } from 'next/image';

export interface Product {
  name: string;
  category: string;
  price: number;
  seller: string;
  ratings: number;
  image: StaticImageData;
}
