// src/data/massages.js

import faceImg from '../assets/images/face.webp';
import classicImg from '../assets/images/classic.webp';
import relaxingImg from '../assets/images/relaxing.webp';
import therapeuticImg from '../assets/images/therapeutic.webp';
import lymphaticImg from '../assets/images/lymphatic.webp';

export const massages = [
  {
    id: '1',
    titleKey: 'massages.face.title',
    descriptionKey: 'massages.face.description',
    image: faceImg,
    linkTo: '/massage#face',
  },
  {
    id: '2',
    titleKey: 'massages.classic.title',
    descriptionKey: 'massages.classic.description',
    image: classicImg,
    linkTo: '/massage#classic',
  },
  {
    id: '3',
    titleKey: 'massages.relaxing.title',
    descriptionKey: 'massages.relaxing.description',
    image: relaxingImg,
    linkTo: '/massage#relaxing',
  },
  {
    id: '4',
    titleKey: 'massages.therapeutic.title',
    descriptionKey: 'massages.therapeutic.description',
    image: therapeuticImg,
    linkTo: '/massage#therapeutic',
  },
  {
    id: '5',
    titleKey: 'massages.lymphaticDrainage.title',
    descriptionKey: 'massages.lymphaticDrainage.description',
    image: lymphaticImg,
    linkTo: '/massage#lymphaticDrainage',
  },
];

export const addresses = [
  {
    id: 1,
    name: "Sophia 1",
    address: "Niepodległości 24, 21-040 Świdnik",
    coordinates: { lat: 51.219409, lng: 22.704860 },
  },
  {
    id: 2,
    name: "Салон Sophia 2",
    address: "ул. Зеленая, 34, Краков",
    coordinates: { lat: 50.06465, lng: 19.94498 },
  },
];
