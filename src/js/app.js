import * as myFunctions from "./modules/functions.js";

myFunctions.isWebp();

const items = document.querySelectorAll('.list-horder__item')
const points = document.querySelectorAll('.aside-horder__point')
//
items.forEach((item, ind) => {
  points.forEach((point, index) => {
  item.addEventListener('mouseover', () => {
      if (ind === index) {
        point.classList.add('aside-horder__point__hover')
      }
    })
    item.addEventListener('mouseout', () => {
      point.classList.remove('aside-horder__point__hover')
    })
  })
})


// import Swiper from 'swiper';

// const swiper = new Swiper();