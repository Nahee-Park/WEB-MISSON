# 비동기 처리를 하기 위한 세 가지 방법
## 1. 콜백함수
- 1급 객체인 함수를 인자로 넘김으로써 그 실행 제어권도 함께 넘겨준 함수 
- 에러핸들링 가능하도록 커스텀 가능 -> 오류 우선 콜백 함수
```javascript
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  // 로딩에 성공하면 이걸 로드
  script.onload = () => callback(null, script);
  // 로딩에 실패하면 이걸 로드
  script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생했습니다.`));

  document.head.append(script);
}

// 에러 핸들링 가능!
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // 에러 처리
  } else {
    // 스크립트 로딩이 성공적으로 끝남
  }
});
```
- 그러나 근본적인 문제 ) 중첩 구조 , 어떻게 함수들 분리해내도 가독성 구림
## 2. 프로미스
- JS에서 비동기 처리를 할 때 이용하는 객체
- 비동기 처리 로직이 처리 전인지, 완료 되었는지, 실패했는지 여부에 따라 상태가 결정됨
- 그렇지만 굳이 시간을 setTimeout이나 데이터 등등으로 지연시키지 않아도 됨. 그냥 바로 실행시킬 수도 있다. 다만 비동기적이라고 했을 때 시간드는 일들을 더 많이 시켜서일뿐

### 주의할 것
- resolve / reject 여러 개 있어도 결국 하나만 실행. 

### 새로 알게된 부분
- .then(f,f)으로 받았을 때, resolve함수는 첫번째 함수를, reject함수는 두번째 함수를 실행한다 
- 성공한 케이스만 받고 싶으면 .then(f)에 하나의 인자만 넣으면 된다
- 실패한 케이스만 받고 싶으면 .catch(f)로 받거나, .then(n,f)의 첫번째 인자에 null을 넣으면 된다 (catch를 주로 사용하는 이유는 문법상의 간결성 때문!)
- Finally는 프로미스의 처리 결과를 모름 그냥 실행됨

### 와 진짜 헷갈리는 거
```javascript
// 이건 f1을 수행하면서 난 에러를 받음
promise.then(f1).catch(f2);

// 이건 처음부터 정의된 reject함수만 실행시킬 뿐, f1을 수행할 때 난 에러는 받지 못함 
promise.then(f1, f2);
```

## 프로미스 API 
- 사실 언제 쓰일지 아직 잘 모르겠음. 이런 게 있다 정도로만 알고 넘겨도 될 지
- `Promise.all(promises)` – 모든 프라미스가 이행될 때까지 기다렸다가 그 결괏값을 담은 배열을 반환합니다. 주어진 프라미스 중 하나라도 실패하면 Promise.all는 거부되고, 나머지 프라미스의 결과는 무시됩니다.
- `Promise.allSettled(promises)` – 최근에 추가된 메서드로 모든 프라미스가 처리될 때까지 기다렸다가 그 결과(객체)를 담은 배열을 반환합니다. 객체엔 다음과 같은 정보가 담깁니다.
status: "fulfilled" 또는 "rejected"
value(프라미스가 성공한 경우) 또는 reason(프라미스가 실패한 경우)
- `Promise.race(promises)` – 가장 먼저 처리된 프라미스의 결과 또는 에러를 담은 프라미스를 반환합니다.
- `Promise.resolve(value)` – 주어진 값을 사용해 이행 상태의 프라미스를 만듭니다.
- `Promise.reject(error)` – 주어진 에러를 사용해 거부 상태의 프라미스를 만듭니다.

## 3. async/await 

- async는 무조건 프로미스를 리턴. 일반 리턴값을 보내도 이행 상태의 프로미스를 반환. 물론 프로미스를 리턴해도 예상한대로 동작함. 그렇지만 프로미스 꼴로 리턴할 거면 굳이 async의 형태가 아니어도 되지 않을까
- await은 프로미스가 이행(fulfill)될 때까지 기다렸다가 그 값을 리턴함. 

### 퀴즈 풀면서 들었던 의문점
- 리턴 값이 없는 async함수는 await의 의미가 없는 게 아닌가 ? 
- await없이 async함수를 받으면 이행을 기다리지 않고 일단 프로미스를 반환하므로 우선 pending상태를 받는 건가? 그리고 Pending일 때 그 뒤의 애가 굳이 얘를 안 기다리고 실행되고, 이행되었을 때의 값이 나오는 건가 …?
- 찾아보니까 나오는 매크로 테스트 큐와 마이크로 테스크 큐의 차이는 뭐지. 둘 다 내가 이벤트큐라고 지칭한 것 안에서 세분화되는 것인가?

# 이벤트 루프
- 기본적으로 자바스크립트 함수는 콜스택에 쌓임으로써 거기서 팝 되어 실행됨
- webApi는 비동기적으로 콜백함수를 실행시키기 위해 이벤트 큐에 콜백함수를 잠시 담아두고 콜스택이 비었을 때를 틈타서 콜스택으로 함수를 보냄
- 렌더큐도 유사. 콜스택이 비워져야 렌더를 시킴. 그렇지만 콜백함수에 비해 렌더의 우선순위가 더 높다 (16밀리세컨드마다 렌더큐에 렌더가 들어감. 그때마다 지금 렌더해도 될까? 콜스택에 아무거도 없으면 ㅇㅋㅇㅋ~ 를 반복)
- 콜스택에 무언가 있으면 렌더가 막혀버린다 -> 비동기적 콜백함수(with webapi)는 일단 이벤트 큐에 담겼다가 콜스택으로 넘어가므로 중간에 렌더가 끼어들 수 있는 기회를 줌. 
### 그렇지만 이벤트큐에 너무 많은 게 쌓이는 경우(스크롤 이벤트 등..) -> 우린 유동적으로 센스있게 시간을 건다던가 등의 방식을 택할 수 있음

### 근데 콜백이라고 다 비동기적인 것은 아님
- 비동기적 콜백함수는 이벤트 큐에 담겼다가 콜스택으로 빠지기 때문에 렌더가 끼어들 틈을 주지만 그냥 콜백함수는 바로 콜스택 갈김. 콜백큐로 이동시키려면 교묘하게 webapi를 이용해야 함
```javascript
// Synchronous
[1,2,3,4].forEach(function(i) {
   console.log(i); 
});

// Asynchronous
function asyncForEach(array, cb) {
    array.forEach(function(){
       setTimeout(cb, 0); 
    });
}
asyncForEach([1,2,3,4], function(i){
    console.log(i); 
});
```

## js엔진이 await을 만났을 때
1. await 키워드가 붙었으면 일단 그 함수를 실행시키고 
2. await을 품고 있는 async 함수를 일시정지시키고 이벤트큐로 옮김. 이때 await위치 기억. 
3. 콜스택에서 해당 함수 나갔으므로 콜스택의 다른 애들 실행시킴
4. 콜스택 비워지면 이벤트루프는 아까의 이벤트큐에서 await을 만나서 아까 옮겨졌던 async함수를 콜스택으로 옮김
5. 함수가 await된 지점부터 다시 실행
 
# 구선생님 퀴즈
```javascript
//받은 시간 뒤에 출력
const delayTimeOut = async (text, time) => {
    setTimeout(() => {
        console.log('타임아웃' + text)
    },time)
}

// 1초 뒤에 일단 콘솔 찍고 res에 빈 값 보냄 
const delayPromise = async (text) => {
    return new Promise((res) => {
        setTimeout(() => {
            console.log('프라미스' + text)
            res()
        },1000)
    })
}

/* 
1. 콘솔1 콜스택에 들어가자마자 퐁 나옴. 
-----
1
-----

2. delayTimeOut 콜스택에 들어갔다 나오면서 실행되는데 setTimeout내부 콜백함수는 이벤트 큐에 담김(setTimeout web api라서 콜스택이 얘네가 비동기적으로 동작함을 인지하고 이벤트 큐로 넘김) 
콘솔2 콜스택 들어가자마자 나오면서 실행  
-----
1
2
-----

3. delayPromise 함수 콜스택에 들어갔다 나오면서 실행되는데 거기 안의 setTimeout은 아까처럼 이벤트큐로 들어감. 근데 여기서 await이 걸려있어서 콘솔3은 delayPromise함수가 이행되기까지 콜스택으로 들어가지 못함(이건 무슨 원리인지 사실 모르겠음) 콜스택이 빈 그 틈을 타서 아까 처음에 실행된 '타임아웃 첫번째'가 콜스택으로 올라가면서 실행됨
-----
1
2
타임아웃 첫번째
-----

4. 콜스택이 비어있으므로 '프로미스 첫번째'도 콜스택으로 올라가면서 실행됨
-----
1
2
타임아웃 첫번째
프로미스 첫번째
-----

5. 남은 콘솔3은 바로 콜스택으로 들어갔다가 퐁 나옴
-----
1
2
타임아웃 첫번째
프로미스 첫번째
3
*/
const a = async () => {
    console.log(1)
    await delayTimeOut('첫번째', 1000)
    console.log(2)
    await delayPromise('첫번째')
    console.log(3)
}

const b = async () => {
    console.log(1)
    delayTimeOut('첫번째', 1000)
    console.log(2)
    delayPromise('첫번째')
    console.log(3)
}

const c = async () => {
    console.log(1)
    await delayPromise('첫번째', 1000)
    await delayTimeOut('첫번째')
    console.log(2)
} 

const d = async () => {
    console.log(1)
    await delayTimeOut('첫번째', 1001)
    console.log(2)
    await delayPromise('첫번째')
    console.log(3)
}

const e = async () => {
    console.log(1)
    await delayTimeOut('첫번째', 1002)
    console.log(2)
    await delayPromise('첫번째')
    console.log(3)
}
```
