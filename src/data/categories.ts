import { Category } from '../types/Category';
import freshFruits from '../../assets/images/fresh_fruits_image.png';
import organicVegetables from '../../assets/images/organic_vegetable_image.png';
import coldDrinks from '../../assets/images/bottles_image.png';
import maggi from '../../assets/images/maggi_image.png';
import bakery from '../../assets/images/bakery_image.png';
import dairyProducts from '../../assets/images/dairy_product_image.png';
import grain from '../../assets/images/grain_image.png';
const categories: Category[] = [
  {
    colour: '#FFCBE1',
    name: 'Malaysian Flavours',
    icon: freshFruits,
  },
  {
    colour: '#D6E5BD',
    name: 'Western Cravings',
    icon: organicVegetables,
  },
  {
    colour: '#F9E1A8',
    name: 'Cool Sips',
    icon: coldDrinks,
  },
  {
    colour: '#BCD8EC',
    name: 'Korean Bites',
    icon: maggi,
  },
  {
    colour: '#DCCCEC',
    name: 'Japanese Eats',
    icon: dairyProducts,
  },
  {
    colour: '#FFDAB4',
    name: 'Snack Attack',
    icon: bakery,
  },
  {
    colour: '#BCD8EC',
    name: 'Sweet Treats',
    icon: grain,
  },
];

export { categories };
