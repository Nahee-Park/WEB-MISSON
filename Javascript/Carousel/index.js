const itemEl = document.querySelector('.item');
const prevBtnEl = document.querySelector('.btn__prev');
const nextBtnEl = document.querySelector('.btn__next');

const imageArray = ["https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg", "https://www.newspenguin.com/news/photo/202101/3899_12249_529.jpg","http://cdn.ksilbo.co.kr/news/photo/202106/902252_501806_3356.png","https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335"]

const IMG_WIDTH = 500;
const LAST_INDEX = imageArray.length-1;
const FIRST_INDEX = 0;
const DIRECTION_LEFT = 'prev';
const DIRECTION_RIGHT = 'next';
let currentItem = 0;
let position = -IMG_WIDTH;

const createItem = (idx, slideItemArr) =>{
    const img = document.createElement('img');
    img.setAttribute('src', slideItemArr[idx]);
    img.setAttribute('class', `item${idx}`);
    return img;
}

const appendItem = (item) => {
    itemEl.appendChild(item);
}

const createCarouselItem = () =>{
    const slideItemArr = [...imageArray]
    slideItemArr.unshift(imageArray[LAST_INDEX]);
    slideItemArr.push(imageArray[FIRST_INDEX]);
    slideItemArr.map((src,idx)=>{
        appendItem(createItem(idx, slideItemArr));
    })
}

const slideItem =  (type) => {
    const distanceToMove = type === DIRECTION_LEFT ? position + IMG_WIDTH : position - IMG_WIDTH;
    itemEl.animate([{transform:`translateX(${position}px)`}, {transform:`translateX(${distanceToMove}px)`}],300);
    return distanceToMove;
}

const transformItem = () => {
    itemEl.style.transform = `translateX(${position}px)`;
}

const prev =  () => {
    position =  slideItem(DIRECTION_LEFT);
    if(currentItem === FIRST_INDEX) {
        currentItem = LAST_INDEX;
        position= -IMG_WIDTH*imageArray.length;
    } else{
        currentItem -= 1;
    }
    transformItem();
}
const next =  () => {
    position =  slideItem(DIRECTION_RIGHT);
    if(currentItem === LAST_INDEX) {
        currentItem = FIRST_INDEX;
        position= -IMG_WIDTH;
    } else{
        currentItem += 1;
    }
    transformItem();
}

const main = () => {
    createCarouselItem();
    transformItem();
    prevBtnEl.addEventListener("click",prev);
    nextBtnEl.addEventListener("click",next);
}

main();