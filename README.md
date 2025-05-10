# 프로젝트 설명

초기 frontend 폴더 셋팅 구조를 기반으로 쇼핑몰 구매 데이터 대시보드 애플리케이션을 개발하였습니다.
pc chome 기준 (해상도 1280)으로 개발 진행하였고, 해상도에 따른 반응형 UI 처리는 진행되지 않은 상태입니다.

## 별도 추가한 Package 
- react-router-dom
  - 대시보드/상세 페이지 navigate/params 처리
- antd
  - card, table, rangePicker 등 기본 UI 구성 사용 
- chart.js + react-chartjs-2 (wrapper) 
  - 가격대별 구매 빈도 차트 (bar chart)
- tanstack-query 
  - 데이터 페칭 등 서버 상태 관리 

## apps/frontend/src 구조 설명 
<pre>

src/
├── components/
│   ├── common/
│   │   └── StatusDisplay.tsx             - loading, error 상태 처리 공통 컴포넌트
│   └── dashboard/
│       ├── CustomerTable.tsx             - 가장 많이 구매한 고객 목록 및 검색 기능 컴포넌트
│       └── PurchaseFrequencyChart.tsx    - 가격대별 구매 빈도 차트 컴포넌트
├── hooks/
│   ├── useCustomers.ts                   - 고객 목록 조회 훅
│   ├── useCustomerPurchases.ts           - 특정 고객 구매 내역 조회 훅
│   ├── usePurchaseFrequency.ts           - 모든 구매 데이터 조회 훅
│   └── useQueryWithFetcher.ts            - useQuery customhook
├── pages/
│   ├── Dashboard.tsx                     - 대시보드
│   ├── CustomerDetail.tsx                - 고객 ID 기반 상세 기능
│   └── NotFound.tsx                      - 404 페이지
└── utils/
    ├── fetchWithHandling.ts              - 에러 핸들링 공통 유틸
    └── urlWithParams.ts                  - query param 관련 공통 유틸

</pre>


## 추가 작업 
- vite.config.ts
  - api 호출을 위한 proxy 설정
  - import시 path에서 '@' 별칭을 사용하기 위해 src 디렉토리 @ 별칭 설정 
- tsconfig.app.json 
  - vite.config.ts에서 별칭 설정했던 부분을 IDE, typescript 컴파일러 등에서의 일관성을 위해 동일하게 적용 
  - include 경로 src 하위 path도 포함하도록 확장 

## 프로젝트 실행 방법 
- 기존에 셋팅 되어있던 대로 동일하게 실행하면 동작 합니다. 
- `node.20.14.0`, `yarn 1.22.22` 버전에서 개발 진행하였습니다.

```cmd
cd apps
yarn install
yarn start-server
yarn start-client
```

### 요구 사항 구현
- 가격대별 구매 빈도 차트
  - x축: 가격대의 범위, y축: 구매 건수, 구매 건수에 대한 범례, 기간에 대한 필터 컴포넌트 구현
  - 기본 설정: 7월 한달에 대한 데이터 조회
  - 날짜값 설정이 있으면 해당 날짜를 조회하여 차트를 구현 
  - RangePicker내 x버튼으로 초기화(기본 설정)

- 가장 많이 구매한 고객 목록 및 검색 기능
  - 고객 목록 테이블 구현 
    - 컬럼: ID, 이름, 구매횟수, 총 구매 금액
    - 정렬 기능: 총 구매금액 컬럼의 화살표 클릭으로 오름차순/내림차순/기본 정렬 선택 가능 
    - 검색 기능: 테이블 상단 이름 검색, input 내 x버튼으로 초기화 가능, 빈값 조회로 전체 검색 가능 
    - 상세 조회: 테이블 row 클릭시 해당 고객의 구매 내역 상세 페이지 이동 

- 고객 ID 기반 상세 기능
  - 우측 상단에 대시보드로 다시 돌아가기 버튼으로 화면 이동
  - 고객 구매 내역 테이블 구현 
    - 컬럼: 상품 썸네일, 상품명, 구매일자, 금액, 수량, 총 금액 

- 기타 추가 처리
  - 404 페이지
    - route에 선언되지 않은 기타 페이지 처리
  - 예외 처리 
    - utils/fetchWithHandling에서 fetch + 에러 처리
    - hooks/useQueryWithFetcher 내에서 useQuery + fetchWithHandling을 추가하여 데이터 조회 wrapper로 사용
  - 쿼리 파람 처리 함수 추가 (utils/urlWithParams)
    - url에 query params가 있는 경우 URLSearchParams 를 이용하여 baseUrl뒤로 queryString 추가
   