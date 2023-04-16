exports.seed = async function (knex) {
  return knex('art').insert([
    { id: 1, title: 'Rose', text: 'A beautiful rose picture with lots of pinks and some peach hues.', image: 'https://i.icanvas.com/list-square/floral-close-ups-YPH41.jpg'},
    { id: 2, title: 'Dahlias', text: 'Dahliaaaaaaaahs with peach and cream tones, with a blue background.',  image: 'https://cdn1.bigcommerce.com/n-ww20x/azetto/products/850/images/3612/6_square_dahlia_HOPE_closeup__71814.1589944049.1280.1280.jpg?c=2' },
    { id: 3, title: 'Mucha', text: 'Lovely art by Mucha',  image: 'https://cdn.shopify.com/s/files/1/0154/6141/products/MuchaFlowerflat_800x.jpg?v=1601451853' },
    { id: 4, title: 'Space 1', text: 'NASA space image 1',  image: 'https://static01.nyt.com/images/2022/07/12/multimedia/-12vid-nasa-highlights-video-cover/-12vid-nasa-highlights-video-cover-mediumSquareAt3X.jpg' },
    { id: 5, title: 'Art Nouveau Fountain', text: 'Art Nouveau fountain with contrasting gold and navy blue',  image: 'https://d3ui957tjb5bqd.cloudfront.net/uploads/2018/03/26175608/Screen-Shot-2018-03-26-at-5.54.47-PM.jpg' },
    { id: 6, title: 'Art nouveau burd flowers', text: 'Art Nouveau Flowers / BIRDS, which are blue and white, high contrast',  image: 'https://garden.spoonflower.com/c/11794389/p/f/m/YqO8rmZT20fdCHih4kvIy45R2onc22T9x7CVC8uIZ6ryK27L62aK/Art%20Deco%20Swans%20-%20Epic%20Navy%20on%20White%20-%2012%22.jpg' },
  ])
}
