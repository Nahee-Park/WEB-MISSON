// 1초마다 숫자 1씩 늘어나고, 이를 출력

// 콜백 함수 

let num = 0;
const increaseOne = () => {
    num += 1
}
const printNum = (num) => {
    console.log(num);
}
setInterval(()=>{
    increaseOne();
    printNum(num);
},1000)

// promise
let num = 0;
const increaseOne = () => {
    return new Promise((resolve)=>{
        resolve(num+=1)
    })
}
const printNum = (num) => {
    console.log(num)
}
setInterval(()=>{
    increaseOne().then((num)=>{
        printNum(num)
    })
},1000)

// async / await
let num = 0;
const increaseOne = async () => {
    return num+=1
}
const printNum = (num) => {
    console.log(num)
}

const getResult = async () => {
    const n = await increaseOne()
    printNum(n)
}
setInterval(()=>{
    getResult()
},1000)