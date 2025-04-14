import { Product } from '@/types/Product';
import potato1 from '../../assets/images/potato_image_1.png';
import tomato1 from '../../assets/images/tomato_image.png';
import carrot1 from '../../assets/images/carrot_image.png';
import spinach1 from '../../assets/images/spinach_image_1.png';
import onion1 from '../../assets/images/onion_image_1.png';

const products: Product[] = [
  {
    name: 'Nasi Kukus',
    category: 'Malaysian Flavours',
    price: 5,
    seller: '',
    ratings: 4,
    image: potato1,
  },

  {
    name: 'Mee Goreng',
    category: 'Malaysian Flavours',
    price: 5,
    seller: '',
    ratings: 4,
    image: tomato1,
  },

  {
    name: 'Chicken Katsu Curry Rice',
    category: 'Japanese Eats',
    price: 5,
    seller: '',
    ratings: 4,
    image: carrot1,
  },

  {
    name: 'Chicken Chop',
    category: 'Western Cravings',
    price: 5,
    seller: '',
    ratings: 4,
    image: spinach1,
  },

  {
    name: 'Kimchi',
    category: 'Korean Bites',
    price: 5,
    seller: '',
    ratings: 4,
    image: onion1,
  },
];

export { products };
