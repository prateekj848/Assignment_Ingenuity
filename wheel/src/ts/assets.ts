export type Assets = {
  baseUrl: string;
  images:{ key:string, url:string }[];
};
export default {
  baseUrl: './assets/',
  images: [
   
    {
      key: 'back',
      url: 'img/back.jpg',
    },
    {
      key: 'front',
      url: 'img/smilies.jpg',
    },
    {
      key: 'desyrel',
      url: 'fonts/desyrel.xml',
    },
    {
      key: 'wheel',
      url: 'img/wheel.png',
    },
    {
      key: 'arrow',
      url: 'img/arrow.png',
    },
  ],
};
