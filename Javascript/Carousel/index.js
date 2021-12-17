const item = document.querySelector('.item');
const prevBtn = document.querySelector('.btn__prev');
const nextBtn = document.querySelector('.btn__next');
const IMG_WIDTH = 500;

const imageArray = ["https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg", "https://www.newspenguin.com/news/photo/202101/3899_12249_529.jpg","http://cdn.ksilbo.co.kr/news/photo/202106/902252_501806_3356.png"]
let currentItem = 0;
let position = -IMG_WIDTH;

const createAdditionalItem = (idx, classId) =>{
    const plusImg = document.createElement('img');
    plusImg.setAttribute('src', imageArray[idx]);
    plusImg.setAttribute('class', `item${classId}`);
    item.appendChild(plusImg);
}

const createCarouselItem = () =>{
    imageArray.map((o,key)=>{
        if (key === 0) {
            createAdditionalItem(imageArray.length-1, 0);
        }
        const img = document.createElement('img');
        img.setAttribute('src', o);
        img.setAttribute('class', `item${key+1}`);
        item.appendChild(img);
        if (key === imageArray.length-1) {
            createAdditionalItem(0, imageArray.length+1);
        }
    })
}

const slideItem = async (type) => {
    let newPosition;
    if (type==="prev") {
        item.animate([{transform:`translateX(${position}px)`}, {transform:`translateX(${position+IMG_WIDTH}px)`}],300);
        newPosition = position+IMG_WIDTH;
    } else {
        item.animate([{transform:`translateX(${position}px)`}, {transform:`translateX(${position-IMG_WIDTH}px)`}],300);
        newPosition = position-IMG_WIDTH;
    }
    return newPosition;
}

const prev = async () => {
    position = await slideItem("prev");
    if(currentItem === 0) {
        currentItem = imageArray.length-1;
        position= -IMG_WIDTH*imageArray.length;
    } else{
        currentItem -= 1;
    }
    item.style.transform = `translateX(${position}px)`;
}
const next = async () => {
    position = await slideItem("next");
    if(currentItem === imageArray.length-1) {
        currentItem = 0;
        position= -IMG_WIDTH;
    } else{
        currentItem += 1;
    }
    item.style.transform = `translateX(${position}px)`;
}

const main = () => {
    createCarouselItem();
    item.style.transform = `translateX(${position}px)`;
    prevBtn.addEventListener("click",prev);
    nextBtn.addEventListener("click",next);
}

main();
// 맨 처음엔 첫번째 아이템만 show클래스 추가, 
// 일단 imageArray 돌면서 Img테그 생성, 클래스 이름 전부 다르게 

// currentItem 변수에서 next 클릭하면 다음으로 넘어가고 prev 클릭하면 