# 캐로셀 제작 이후 추가적으로 해볼 것, 공부할 것 

1. class 이용해서 확장성 있게 js 로직 구현해보기
2. 처음부터 돔을 그리는 것이 아닌, 돔을 추가했다 삭제하는 로직으로도 구현해보기
    - reflow, repaint 고려, 스케일이 커질 경우에 대한 고려 
3. windowing 기법 공부

# TIL
- 내부적으로 특정 로직에 따라 다른 값을 내뱉고 싶은데, 함수로는 접근( instance.getSome() )하기 싫고 instance.some 이렇게 접근하고 싶을 때 -> getter 이용
- 함수명에 있어서 -> 처음에 필요할 것 같은 함수들을 만들어두고 (추상화), 구체적인 로직을 작성해보기 
- element들에는 el을 붙여 좀 더 명시적으로 표현하기 
- 비동기적으로 처리하는 게 없는 로직에서 불필요한 async, await 사용하지 말 것 
- 아래와 같은 방식으로 애니메이션 키 프레임화 가능
```javascript
item.animate([{transform:`translateX(${position}px)`}, {transform:`translateX(${distanceToMove}px)`}],300);
```