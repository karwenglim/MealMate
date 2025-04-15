import { StaticImageData } from 'next/image';

export interface Category {
  text: string;
  path: string;
  image: StaticImageData;
  bgColor: string;
}
