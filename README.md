## 포미스테이 웹어드민 외주

### Introduction

소프트스퀘어드 외주 연계로 숙박프로그램 예약 앱 포미스테이의 웹어드민 외주를 진행했습니다.

### Directory Structure
```
📂 build                                                  
📂 public                                                 
📂 src
├── 📂 assets                                            
├── 📂 constant
│   ├── 📄 Constant.js                                    
│   ├── 📄 TempAdminApi.js                                 
│   ├── 📄 TempAdminApiMap.js                             
├── 📂 containers                                         
│   └── _nav.js                                        
├── 📂 scss                                                
├── 📂 utils
│   ├── 📂 common
│   │   └── 📄 commonFunction.js                          
│   ├── 📂 firebase
│   │   └── 📄 uploadFirebase.js                          
│   ├── 📂 session
│   │   ├── 📄 expirySession.js                            
│   │   └── 📄 sessionManager.js                        
├── 📂 views
│   ├── 📂 admin
│   │   └── 📄 AddAdmin.js                                 # 관리자 회원가입 화면
│   ├── 📂 component                                       # 자주 사용되는 컴포턴트 관리
│   ├── 📂 enterprises
│   │   ├── 📄 AddEnterprise.js                            # 업체 추가 화면
│   │   ├── 📄 Enterprise.js                               # 업체 상세 조회 화면
│   │   └── 📄 Enterprises.js                              # 업체 전체 조회 화면
│   ├── 📂 pages
│   │   ├── 📂 login                                       # 로그인 화면
│   │   └── 📂 page404, page500                            # 404, 500 에러 페이지
│   ├── 📂 payments
│   │   └── 📄 Payments.js                                 # 결제 내역 조회 화면
│   ├── 📂 programs
│   │   ├── 📄 AddProgram.js                               # 프로그램 추가 화면
│   │   └── 📄 Program.js                                  # 프로그램 상세 조회 화면
│   ├── 📂 users                        
│   │   ├── 📄 User.js                                     # 유저 상세 조회 화면
│   │   └── 📄 Users.js                                    # 유저 전체 조회 화면
├── 📄 App.js
└── 📄 routes.js                                        
📄 .env.development                                    
📄 .env.production                                       
📄 .gitignore                                              
📄 package.json                                           
📄 package-lock.json                                       
📄 README.md
```

### Role

- 이미지 업로드 기능 개발
- 캘린더를 통해 업체에서 예약관리(예약 수락, 취소) 기능 개발
