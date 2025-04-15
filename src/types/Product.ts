import { StaticImageData } from 'next/image';

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  offerPrice: number;
  image: StaticImageData[];
  description: string[];
  ratings: number;
  createdAt: string;
  updatedAt: string;
  inStock: boolean;
  seller: string;
}

//  {
//     _id: 'ek53j34k',
//     name: 'Banana 1 kg',
//     category: 'Fruits',
//     price: 50,
//     offerPrice: 45,
//     image: [banana_image_1],
//     description: [
//       'Sweet and ripe',
//       'High in potassium',
//       'Great for smoothies and snacking',
//     ],
//     createdAt: '2025-03-25T07:17:46.018Z',
//     updatedAt: '2025-03-25T07:18:13.103Z',
//     inStock: true,
//   },
