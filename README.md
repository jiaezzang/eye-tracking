# EyeTracking🙄
- 시선 추적 라이브러리 webGazer를 활용하여 학습자의 학습 상태를 피드백하는 React 프로젝트
- Notion: **[EyeTracking (240122~240226)](https://jiaezzang.notion.site/MediaPipe-Gesture-Interaction-240306-240326-6281c7b5705949748a277c546ca9fef7?pvs=4)**

# 개발 환경

![ye...png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmTqc7%2FbtsFyyohIz3%2FNQySudSgBHLIkTgraMRBNk%2Fimg.png)

# 라이브러리

## webGazer : 시선 추적

[WebGazer.js: Democratizing Webcam Eye Tracking on the Browser](https://webgazer.cs.brown.edu/)

- 필요한 기능만 가져와 커스텀하여 사용

## clsx : cassName 조건화

[npm: clsx](https://www.npmjs.com/package/clsx)

## Jotai : 전역관리

[Jotai, primitive and flexible state management for React](https://jotai.org/)

# 프로젝트 구조

![Untitled](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FrJb25%2FbtsFoJk6ixB%2FhOVxMhsvczzHLNtMK0Sk3k%2Fimg.png)

- 커스텀한 `webGazer` 라이브러리를 `src/lib` 하위에서 따로 관리
- page는 `Main` 하나로 구성하여 해당 페이지 안에서 시선 추적 세팅과 시선 추적에 대한 피드백을 모두 제공
- `webGazer`를 window 객체로 관리하기 위해 types에 다음과 같이 설정
    
    ```tsx
    declare global {
        interface Window {
            webgazer: Webgazer;
        }
    }
    
    export {};
    ```
    
- 전역 관리를 위해 Jotai를 사용하여 `atoms.ts` 파일로 관리

# 구현

![startTracking.gif](https://blog.kakaocdn.net/dn/tn1AR/btsFvZNpWx5/g3A9K2pndJmd4PMOvbtFnk/img.gif)

- ‘Start EyeTracking’ 버튼을 누르면 webGazer 세팅 모드가 열림

![setting.gif](https://blog.kakaocdn.net/dn/x5uX1/btsFqYhq4Y5/8SukZxuVooWIxIbpGxbtK1/img.gif)

- webGazer를 세팅하기 위해서는 최소 4개의 모서리 지점 데이터를 넣어주어야 하기 때문에 오브젝트를 드래그하여 네 모서리를 클릭할 수 있도록 유도하는 컨텐츠를 제작

![feedback.gif](https://blog.kakaocdn.net/dn/c8Wi6t/btsFxXIAB17/K6fhfWIoaCJCwRGnHzVO0K/img.gif)

- 세팅 후 일정 영역에 있거나 카메라 내에서 이탈할 경우 피드백 제공
    - 화면 내 중앙 응시(하얀색 영역) : 긍정 피드백
    - 화면 내 중앙 이탈(오차 고려하여 하늘색 영역의 바깥쪽 3/1영역) : 부정 피드백
    - 카메라에서 이탈할 경우 : 똑똑! 어디에 있나요? 피드백
- 정확한 추적을 위해 바른 자세일 때만 시선 추적을 하여 피드백
    - 바른 자세의 기준
        1. 학습자가 카메라 내에 존재
        2. 학습자가 카메라 중앙에 위치
        3. 학습자가 정면을 응시
- 추적 상황에 따라 gazeDot의 색상이 다르게 표시
    - Red : 학습자가 바른자세를 취하고 있어 학습자의 시선을 추적하고 있는 상태
    - Green : 학습자가 카메라 내에 있으나 바른자세가 아니어 시선추적을 하고있지 않은 상태
    - Black : 학습자가 카메라 내에 보이지 않아 시선추적을 하고 있지 않은 상태
