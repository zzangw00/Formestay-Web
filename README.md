## 프로젝트 명

-   포미스테이 웹 어드민

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
│   │   ├── admin
│   │   │   ├── AddAdmin.js                                 # 관리자 회원가입 화면
│   │   ├── component                                       # 자주 사용되는 컴포턴트 관리
│   │   ├── enterprises
│   │   │   ├── AddEnterprise.js                            # 업체 추가 화면
│   │   │   ├── Enterprise.js                               # 업체 상세 조회 화면
│   │   │   ├── Enterprises.js                              # 업체 전체 조회 화면
│   │   ├── pages
│   │   │   ├── login                                       # 로그인 화면
│   │   │   ├── page404, page500                            # 404, 500 에러 페이지
│   │   ├── programs
│   │   │   ├── AddProgram.js                               # 프로그램 추가 화면
│   │   │   ├── Program.js                                  # 프로그램 상세 조회 화면
│   │   ├── users
│   │   │   ├── User.js                                     # 유저 상세 조회 화면
│   │   │   ├── Users.js                                    # 유저 전체 조회 화면
│   ├── App.js
│   ├── routes.js                                           # 페이지마다의 라우트 설정
├── .env.development                                        # 개발서버 URL을 등록 할 수 있는 환경변수 파일. npm start 사용 시 해당 파일이 자동 호출.
├── .env.production                                         # 실서버 URL을 등록 할 수 있는 환경변수 파일. npm run build 사용 시 해당 파일이 자동 호출.
├── .gitignore                                              # git에 포함되지 않아야 하는 폴더, 파일들 작성
├── package.json                                            # 프로그램 이름, 버전, 필요한 모듈 설정
├── package-lock.json                                       # package.json의 의존성 관리
└── README.md
```
