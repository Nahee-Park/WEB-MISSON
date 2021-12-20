import RenderManager from './renderManager.js'

const imageArray = ["https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg", "https://www.newspenguin.com/news/photo/202101/3899_12249_529.jpg","http://cdn.ksilbo.co.kr/news/photo/202106/902252_501806_3356.png","https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335"]

const prevBtn = document.querySelector('.btn__prev');
const nextBtn = document.querySelector('.btn__next');

const attachEvent = (renderManager) => {
    prevBtn.addEventListener("click", renderManager.movePrev);
    nextBtn.addEventListener("click", renderManager.moveNext);
}

const init = (imageArray) => {
    const renderManager = new RenderManager(imageArray)
    renderManager.render()
    attachEvent(renderManager)
}

init(imageArray) 