# Web-Admin

> Core UI 를 사용한 웹 어드민 템플릿입니다. (React)

본 템플릿은 소프트스퀘어드에 소유권이 있으며 본 자료에 대한 상업적 이용 및 무단 복제,배포 및 변경을 원칙적으로 금지하며 이를 위반할 때에는 형사처벌을 받을 수 있습니다.

## 사용법

- `npm install`을 통해 package.json에 명시된 버전으로 node_modules를 설치합니다.

- `npm start`를 통해 웹어드민 파일을 실행합니다 ~~localhost:3000~~

- `npm run build-prod`를 통해 웹어드민 배포용 빌드파일을 생성합니다.

- `npm run build-dev`를 통해 웹어드민 개발용 빌드파일을 생성합니다.

## 구성

- _nav.js : 좌측 네비게이션 바를 설정하는 파일입니다.

- routes.js : 페이지마다의 라우트를 설정하는 파일입니다.

- **환경변수**
  - .env.production : 실서버 URL을 등록 할 수 있는 환경변수 파일입니다. npm run build 사용 시 해당 파일이 자동 사용됩니다.
  - .env.development : 개발서버 URL을 등록 할 수 있는 환경변수 파일입니다. npm start 사용 시 해당 파일이 자동 사용됩니다.

> 두 파일이 자동으로 상황에 맞게 적용되기 때문에 실/개발 서버 URL을 환경변수 파일에 등록 하면 자동 변경 됩니다.

- **API 통신** (src/constant)
  - TempAdminApi.js : API 통신을 위한 설정파일로 각 Method (GET, POST, PUT, PATCH, DELETE) 마다 통신 방식을 설정합니다.
  - TempAdminApiMap.js : 서버와 통신하기 위한 URL과 각 API에 해당하는 URI 및 Method를 설정는 파일입니다.

- **유틸** (src/utils)
  - common
    - commonFunction : 자주 사용되는 함수들을 포함합니다. (isEmpty, 정규식 검사)
  - firebase
    - configFirebase : 파이어베이스 초기 설정을 합니다.
    - uploadFirebase : 파이어베이스 스토리지에 파일을 업로드 합니다.
  - session
    - expirySession : Key/Value 형식으로 세션에 get/set 할 수 있도록 모듈화 하였습니다.
    - sessionManager : 자동로그인, get JWT 등의 세션을 사용하는 함수들을 모아두었습니다.


- **페이지** `실제 웹상에서 보여지는 화면` (src/views)
  - pages
    - Login : CoreUI에서 기본으로 제공해주는 회원가입과 로그인 파일이 해당됩니다.
      - 자동로그인, 로그인을 위한 API 통신 방식이 예시로 있습니다.
    - 그 외 : 404에러, 500에러 등 에러 페이지들이 해당됩니다.
  - component
    - 자주 사용되는 컴포턴트들이 위치합니다.
    - Badge, Button, Cell, Table 등
  - users
    - Users.js : 사용자 리스트 조회하는 파일입니다. API 통신을 하여 가져온 사용자 리스트를 조회하여 보여 줍니다.
    - User.js : 사용자 상세 조회하는 파일입니다. API 통신을 하여 가져온 사용자 상세 정보를 보여주며, 사용자 정보 수정과 삭제 기능도 수행합니다.
    - AddUser.js : 사용자 추가하는 파일입니다. API 통신을 통해 입력한 사용자 정보를 등록합니다.
    - UsersData.js : 사용자 더미데이터 파일입니다.
  - boards
    - Boards.js : 게시물 리스트 조회하는 파일입니다. API 통신을 하여 가져온 게시물 리스트를 조회하여 보여 줍니다.
    - Board.js : 게시물 상세 조회하는 파일입니다. API 통신을 하여 가져온 게시물 상세 정보를 보여주며, 게시물 정보 수정과 삭제 기능도 수행합니다.
    - AddBoard.js : 게시물 추가하는 파일입니다. API 통신을 통해 입력한 게시물 정보를 등록합니다.
    - BoardsData.js : 게시물 더미데이터 파일입니다.

## 히스토리

### 2021.07.30 Zero(제로)

- 전반적인 코드 최적화 (불필요한 import, 세미콜론 제거 및 코드 개선)
- 로그인 관련 오류 개선
- 화면 구조 및 내부 구성 변경
- 자주 사용되는 컴포넌트 모듈화

> made by Zero, helped by tech department

### 2020.11.10 Ted(테드)

- CoreUI 3.1.0 Update
- Class 형식의 state 설정을 Hook 방식으로 변경
  - useState, useCallback, useEffect, useHistory 등 react 함수 사용
- Axios를 통한 API 통신 시 async / await 방식의 비동기 처리
- src/containers/TheHeader.js 수정 : Prod/Dev 환경을 확연하게 보여줄 수 있도록 Dev일때만 헤더에 빨간색 배경, 하얀색 글씨 'TEST' 표현 (npm start 실행시에만 보임,
  npm run build 사용시 자동 삭제)

> made by Ted, helped by Tech

### 2020.09.07 Dory(도리)

- CoreUI 스타터 템플릿 파일 적용
- 버전 차이로 인해 실행이 안되는 문제 해결 (package.json 수정)
- src/views/Pages 폴더 추가 : CoreUI에서 기본으로 제공하는 로그인/회원가입 및 에러페이지
- src/constant 폴더 추가 : 서버와 API 통신을 하기 위한 설정 파일 및 라우트 설정
- src/utils 폴더 추가 : 파이어베이스 이미지 업로드 및 로그인 세션 관리
- src/views/Users 폴더 추가 : 유저 관리 폴더로 유저 리스트 조회 및 유저 상세 조회

> made by Dory, helped by Roy

