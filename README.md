## 프로젝트 명

-   {프로젝트 명}

## 사용언어

-   React.js (CoreUI 템플릿)

## 폴더 구조

```
.
├── build                                                   # 빌드 파일
├── node_modules                    	                    # 노드 모듈
├── public                                                  # 파비콘 등 관리
├── src
│   ├── assets                                              # 아이콘, 로고 관리
│   ├── constant
│   │   ├── Constant.js                                     # 앱 내 공통적으로 사용되는 상수 관리
│   │   ├── TempAdminApi.js                                 # API 통신을 위한 설정파일
│   │   ├── TempAdminApiMap.js                              # 서버와 통신하기 위한 URL과 각 API에 해당하는 URI 및 Method 설정
│   ├── containers                                          # 전체적인 레이아웃 구성 관리 (좌측 네비게이션 바, 헤더 등)
│   │   ├── _nav.js                                         # 좌측 네비게이션 바 설정
│   ├── scss                                                # 커스터마이즈 CSS 적용
│   ├── utils
│   │   ├── common
│   │   │   ├── commonFunction.js                           # 자주 사용되는 함수들을 포함 (ex. isEmpty, 정규식 검사)
│   │   ├── firebase
│   │   │   ├── configFirebase.js                           # 파이어베이스 초기 설정 파일
│   │   │   ├── uploadFirebase.js                           # 파이어베이스 스토리지에 파일을 업로드
│   │   ├── session
│   │   │   ├── expirySession.js                            # Key/Value 형식으로 세션에 get/set 할 수 있도록 모듈화
│   │   │   ├── sessionManager.js                           # 자동로그인, get JWT 등 세션을 사용하는 함수 정의
│   ├── views
│   │   ├── component                                       # 자주 사용되는 컴포턴트 관리
│   │   ├── pages
│   │   │   ├── login                                       # 로그인 화면
│   │   │   ├── page404, page500                            # 404, 500 에러 페이지
│   │   ├── user
│   │   │   ├── Users.js                                    # 사용자 목록 화면
│   │   │   ├── User.js                                     # 사용자 상세조회 화면
│   │   │   ├── AddUser.js                                  # 사용자 추가 화면
│   │   ├── board
│   │   │   ├── Board.js                                    # 게시물 목록 화면
│   │   │   ├── Boards.js                                   # 게시물 상세조회 화면
│   │   │   ├── AddBoard.js                                 # 게시물 추가 화면
│   ├── App.js
│   ├── routes.js                                           # 페이지마다의 라우트 설정
├── .env.development                                        # 개발서버 URL을 등록 할 수 있는 환경변수 파일. npm start 사용 시 해당 파일이 자동 호출.
├── .env.production                                         # 실서버 URL을 등록 할 수 있는 환경변수 파일. npm run build 사용 시 해당 파일이 자동 호출.
├── .gitignore                                              # git에 포함되지 않아야 하는 폴더, 파일들 작성
├── package.json                                            # 프로그램 이름, 버전, 필요한 모듈 설정
├── package-lock.json                                       # package.json의 의존성 관리
└── README.md
```

## 실행 명령어

-   `npm install`을 통해 package.json에 명시된 버전으로 node_modules를 설치합니다.
-   `npm run build`를 통해 빌드파일을 생성합니다.
-   `npm start`를 통해 웹어드민 파일을 실행합니다 localhost:3000
