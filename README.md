# 비동기 자바스크립트 내 이름 경쟁하기

## 게임 셋팅

1. **팀장님이 아무 폴더에 package.json라고 파일을 생성 후 다음 처럼 입력^^**
- 내용

    ```jsx
    {
      "type": "module"
    }
    ```


1. **main.js 생성 후 다음 코드 입력 (이 함수는 바꾸지 마세요)**
- 코드 내용

    ```jsx
    function myNameVS(teamNames, teamFunctions) {
        const counts = {};
        let stop = false;

        teamNames.forEach(name => counts[name] = 0);
        const stopSignal = () => stop;

        setTimeout(() => {
          stop = true;
        }, 5000);

        const promises = teamFunctions.map((func, index) => {
          return new Promise((resolve) => {
            try {
              func(() => {
                if (!stop) {
                  counts[teamNames[index]]++;
                  if (counts[teamNames[index]] % 100 === 0) {
                    setTimeout(() => {}, 1);
                  }
                }
              }, stopSignal);
            } catch (e) {
              console.error(`${teamNames[index]} 님의 함수에서 에러가 발생했습니다:`, e);
            } finally {
              setTimeout(() => resolve(), 5000);
            }
          });
        });

        Promise.all(promises).then(() => {
          teamNames.forEach(name => {
            console.log(`${name} 님은 ${counts[name]}번 이름을 출력했습니다.`);
          });
          const winner = teamNames.reduce((prev, current) =>
            counts[prev] > counts[current] ? prev : current
          );
          console.log(`승자는 ${winner} 님입니다!`);
        });
      }
    ```


1. **github로 서로에게 공유하고, 각자 파일 이름.js를 만들어서 함수 생성**

1. **1시간 경과 후 모두 github에 올리고, 팀장님은 로컬로 pull 받아서 결과를 모두 같이 본다.**
- 내 이름.js 예시

    ![스크린샷 2024-10-07 오전 3.37.40.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/b61e308d-6f89-4ccf-8a77-e99afdf603ed/8193fd44-0b13-433c-9545-f095708182f3/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_3.37.40.png)

    - 첫번째 파라미터에 함수를 받아서, 내 이름이 출력되는 곳마다 실행시켜줘야 한다. (해당 콜백 함수가 이름 수를 측정하는 함수이기 때문)
    - console.log(”내이름”)는 생략해도 됩니다.
    - 앞에다 반드시 export를 붙여서 다른 파일에서 쓸 수 있게끔 해줍니다.
- main.js 예시

    ![스크린샷 2024-10-07 오전 3.36.14.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/b61e308d-6f89-4ccf-8a77-e99afdf603ed/2086a645-2623-408f-8081-90011a8a4dc2/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_3.36.14.png)

    팀원의 함수

    - import { 팀원_함수_이름}  from “팀원파일경로”

    myNameVS 함수

    - 첫번째 파라미터엔 팀원 이름이 String으로 되어있는 배열을 넣고,
    - 두번째 파라미터엔 팀원들이 만든 함수를 배열로 만들어서 넣는다.
    - 이때 반드시 순서대로 넣어야한다. 첫번쨰 파라미터의 0번쨰 인덱스가 “강태진”이면, 두번쨰 파라미터의 0번째 인덱스도 “강태진”이 만든 함수여야 한다.

- 결과 예시

    ![스크린샷 2024-10-07 오전 3.34.04.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/b61e308d-6f89-4ccf-8a77-e99afdf603ed/8de19a1e-76fd-4899-aea8-8d7a2b3f6dda/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_3.34.04.png)


1. **모든 팀원이 완성되었으면 팀장님이 결과 스크린샷과 함께 repository주소를 저에게 디스코드 DM으로 주세요^^**

## **조건**

- 내 코드는 300줄이 넘지 않을 것
- 1줄당 100자가 넘지 않을 것.
- 즉 전체 글자 수가 3000자를 넘지 않을 것 (https://textcount.sawoo.com/)
- 5초 제한
    - main함수에 5초 제한이 있으나, 5초를 넘어간 이후 카운팅 되게 짠건 무효
- 반복문을 사용할 경우 반복문 하나당 **최대 반복 횟수**는 100회입니다.
    - 반복문을 여러개 쓰는건 가능하나 하나의 하나의 반복문에 최대 100회 반복을 넘어가면 안됩니다.
    - while문 사용 금지
- setTimeout, setInterval을 사용할 경우 최소 150ms이상을 가져야합니다.
- 도움없이 내 힘으로만 일단 최대한 해보려고 한다. (그래야 실력이 늡니다)
- 전역 변수 사용 제한
- 재귀 함수 제한