# 문제 1
file/example' 로 소켓 요청(socket.emit)을 보내면 데이터가 socket.on에서 데이터를 받을 수 있잖아? 
이걸 그냥 사용하는 측에서 await getExampleData() 만하면 데이터가 반환될 수 있도록 getExampleData함수를 짜봐
힌트는 emit과 on이 둘 다 getExampleData 에 들어있어야 해

- 처음 답 
전제 ) 소켓은 on으로 이벤트를 등록해주고 emit으로 호출해야한다 
틀린 이유 : 컴퓨터는 그냥 순서대로 실행시킨다 -> data가 1이므로 영원히 resolve되지 않는다 
```javascript
const socket = io();
 const getExampleData = async () => {
     let data =  1;
     socket.on('file',(fileData)=>{
         data= fileData;
     })
     socket.emit('file' , fileData);
     return new Promise((resolve)=>{
         if (data !== 1) {
             resolve(data)
         }
     });
 }
 const result = await getExampleData()
```   

- 최종 답
프로미스가 resolve되는 타이밍을 구체적으로 지정해주고 싶으면 async함수가 아닌, promise객체를 직접 선언해야 한다 
'파일 데이터가 들어왔을 때' -> 그 값을 넘겨주고 싶은 것이므로 그 시점을 정해주기 위해선 resolve타이밍을 직접 잡아줘야 한다.
```javascript
 const getExampleData = () => new Promise((res) => {
     socket.on('file',(fileData)=>{
         res(fileData)
     })
     socket.emit('file' , fileData);
 })

 const result = await getExampleData()
````



