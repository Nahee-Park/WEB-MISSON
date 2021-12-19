const item = document.querySelector('.item');
const prevBtn = document.querySelector('.btn__prev');
const nextBtn = document.querySelector('.btn__next');

const imageArray = ["https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg", "https://www.newspenguin.com/news/photo/202101/3899_12249_529.jpg","http://cdn.ksilbo.co.kr/news/photo/202106/902252_501806_3356.png","https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335"]

const IMG_WIDTH = 500;
const LAST_INDEX = imageArray.length-1;
const FIRST_INDEX = 0;
let currentItem = 0;
let position = -IMG_WIDTH;

const createFakeItem = (idx, classId) =>{
    const fakeImg = document.createElement('img');
    fakeImg.setAttribute('src', imageArray[idx]);
    fakeImg.setAttribute('class', `item${classId}`);
    item.appendChild(fakeImg);
}

const createCarouselItem = () =>{
    imageArray.map((o,key)=>{
        if (key === FIRST_INDEX) {
            createFakeItem(LAST_INDEX, 0);
        }
        const img = document.createElement('img');
        img.setAttribute('src', o);
        img.setAttribute('class', `item${key+1}`);
        item.appendChild(img);
        if (key === LAST_INDEX) {
            createFakeItem(FIRST_INDEX, imageArray.length+1);
        }
    })
}

const slideItem = async (type) => {
    let newPosition;
    if (type==="prev") {
        newPosition = position+IMG_WIDTH;
        item.animate([{transform:`translateX(${position}px)`}, {transform:`translateX(${newPosition}px)`}],300);
    } else {
        newPosition = position-IMG_WIDTH;
        item.animate([{transform:`translateX(${position}px)`}, {transform:`translateX(${newPosition}px)`}],300);
    }
    return newPosition;
}

const transformItem = () => {
    item.style.transform = `translateX(${position}px)`;
}

const prev = async () => {
    position = await slideItem("prev");
    if(currentItem === FIRST_INDEX) {
        currentItem = LAST_INDEX;
        position= -IMG_WIDTH*imageArray.length;
    } else{
        currentItem -= 1;
    }
    transformItem();
}
const next = async () => {
    position = await slideItem("next");
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
    prevBtn.addEventListener("click",prev);
    nextBtn.addEventListener("click",next);
}

main();