# 라파엔투자자문 홈페이지

rapha-n.com 과 같은 메뉴 구조(Business / Strategy / Process / Information / Notice / About)로 만든
정적 사이트. 서버·빌드 도구 없이 HTML·CSS·JS 파일만으로 동작한다.

## 파일 구성

| 파일 | 내용 |
|---|---|
| `index.html` | 메인. 히어로 + 알파노트 라이브 요약 카드 + 회사 철학 + AI 소개 |
| `business.html` | 사업 영역, 데이터 소스, 고객 |
| `strategy.html` | 운용전략 대시보드 뷰어(주도섹터 리포트·논리 랩·종목탐색·RS·차트·계절성) |
| `process.html` | 5단계 투자 프로세스, 하루 일정, 운용 원칙 |
| `information.html` | 시황·시장 지표·사이클 대시보드 뷰어 |
| `notice.html` | 공지/공시 게시판 (목록 + `?id=` 상세) |
| `about.html` | 회사 개요, 연혁, 오시는 길, 개인정보처리방침·이용약관 |
| `assets/site.js` | **모든 설정이 여기 있음** — 회사 정보, 메뉴, 대시보드 목록, 공지 글 |
| `assets/style.css` | 공통 스타일(다크 기본, 라이트 토글) |

## 내용 수정하는 법

`assets/site.js` 맨 위 `SITE` 객체만 고치면 된다.

- 회사 정보(대표·주소·전화·이메일) → `SITE.company`
- 상단 메뉴·드롭다운 → `SITE.menu`
- 대시보드 추가/삭제 → `SITE.dashboards.strategy` 또는 `.information` 에 `{ key, ic, title, file, desc }` 한 줄 추가.
  `file` 은 알파노트(`docs/`)의 파일명.
- 공지 글 → `notices.json` 이 원본. **admin.html** 에서 GitHub 토큰(rapha-n-site 저장소 Contents 읽기/쓰기)을 등록하면 사이트 안에서 작성·수정·삭제할 수 있고, 저장하면 GitHub API 로 notices.json 이 커밋된다(1~2분 뒤 반영). GitHub 웹에서 notices.json 을 직접 편집해도 된다.

알파노트 대시보드는 `SITE.alphaBase`(기본 `https://pdhman.github.io/report-summary/`)에서
iframe 으로 불러온다. 메인의 "오늘의 리서치" 카드는 알파노트 `index.html` 을 fetch 해
최신 요약을 그대로 보여 주고, 실패하면 기본 목록으로 대체된다.

## 로컬에서 보기

```powershell
cd homepage
python -m http.server 8080
```

브라우저에서 http://localhost:8080 열기. (`file://` 로 열면 라이브 카드 fetch 만 실패하고 나머지는 동작한다.)

## 배포 (완료)

- 저장소: https://github.com/pdhman/rapha-n-site (homepage/ 폴더가 독립 git 저장소)
- 공개 주소: https://pdhman.github.io/rapha-n-site/
- main 브랜치 루트를 GitHub Pages 가 서빙하므로 `git push` 가 곧 배포다(1~2분 소요).
- rapha-n.com 을 연결하려면 Settings → Pages → Custom domain 에 입력하고 DNS 를 GitHub Pages 로 변경.

## 다른 배포 방법 (참고)

1. **GitHub Pages 새 저장소** — `homepage/` 내용을 새 저장소(예: `rapha-n-site`) 루트에 올리고
   Settings → Pages 에서 main 브랜치 서빙. 커스텀 도메인에 `rapha-n.com` 을 등록하고
   DNS 의 A/CNAME 을 GitHub Pages 로 바꾸면 기존 주소가 이 사이트로 연결된다.
2. **기존 report-summary 저장소 안에 두기** — `docs/site/` 로 복사하면 바로
   `https://pdhman.github.io/report-summary/site/` 에서 열린다. 이 경우 `site.js` 의
   `alphaBase` 를 `'../'` 로 바꾸면 절대 주소 없이도 동작한다.
3. **일반 웹호스팅** — 폴더째 FTP 업로드.

## 확인할 것

- 참고 사이트 푸터에 주소가 "벚꽃로 26길"과 "36길" 두 가지로 적혀 있어 26길로 넣어 두었다. 실제 주소로 확인 필요.
- 이메일 주소는 비워 두었다(`SITE.company.email`).
- 연혁(about.html)은 예시이므로 실제 일정으로 고칠 것.
