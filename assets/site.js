/* ───────── 라파엔투자자문 홈페이지 공통 스크립트 ─────────
 * 이 파일 하나에 사이트 설정(회사 정보·메뉴·대시보드 목록·공지)을 모아 두었다.
 * 내용을 바꾸려면 아래 SITE 객체만 고치면 모든 페이지에 반영된다.
 */
(function () {
  'use strict';

  /* ── 1. 사이트 설정 ───────────────────────────────── */
  var SITE = {
    name: '라파엔투자자문',
    nameEn: 'RAPHA-N INVESTMENT ADVISORY',
    // 알파노트 대시보드가 배포된 주소(끝에 / 포함). 같은 폴더에 두면 './' 로 바꾸면 된다.
    alphaBase: 'https://pdhman.github.io/report-summary/',
    // 공지 글이 저장되는 GitHub 저장소(admin.html 이 이 저장소의 notices.json 을 갱신한다)
    repo: 'pdhman/rapha-n-site',
    noticesFile: 'notices.json',
    company: {
      ceo: '이증락',
      addr: '서울특별시 금천구 벚꽃로 26길 30 가산 KS타워 1511호',
      tel: '02-2025-2305',
      email: '',                       // 예: contact@rapha-n.com
      reg: '5-1-1(투자자문업)',
      founded: '2025'
    },
    menu: [
      { label: 'Business',    href: 'business.html' },
      { label: 'Product',     href: 'product.html', sub: [
          { label: '성장·방어 포트폴리오 자문', href: 'product.html' } ] },
      { label: 'Process',     href: 'process.html' },
      { label: 'Information', href: 'information.html', sub: [
          { head: '오늘의 시장' },
          { label: '오늘의 시황',            href: 'information.html?v=briefs' },
          { label: '시장 온도계',            href: 'information.html?v=market' },
          { label: '투자자별 매매 동향',     href: 'information.html?v=flow' },
          { head: '종목 발굴' },
          { label: '오늘의 주도주',          href: 'information.html?v=screener' },
          { label: '오늘의 주도 업종',       href: 'information.html?v=strategy' },
          { label: '상대 강도 순위',         href: 'information.html?v=rs' },
          { label: '종목 투자 포인트 점검',  href: 'information.html?v=thesis' },
          { head: '큰 흐름 · 도구' },
          { label: '한국 증시 사이클',       href: 'information.html?v=korea_cycle' },
          { label: '주식 차트',              href: 'information.html?v=chart' },
          { label: '월별 성적표',            href: 'information.html?v=seasonality' },
          { label: '전체 보기 →',            href: 'information.html' } ] },
      { label: 'Education',   href: 'education.html', sub: [
          { label: 'AI 퀀트 투자 과정', href: 'edu-quant.html' } ] },
      { label: 'Notice',      href: 'notice.html', sub: [
          { label: '공지/공시',        href: 'notice.html' } ] },
      { label: 'About',       href: 'about.html' }
    ],
    /* 교육 과정. 새 과정은 courses 에 한 줄 추가(href 가 없으면 '준비 중' 카드로 표시). */
    courses: [
      { ic: '🤖', title: 'AI 퀀트 투자 과정', status: '모집 예정', href: 'edu-quant.html',
        desc: '코딩을 몰라도 AI와 함께 나만의 투자 규칙을 만들고 과거 데이터로 검증하는 입문 과정.' },
      { ic: '📊', title: '시장 지표 읽기', status: '준비 중', href: '',
        desc: '수급·레버리지·시장 온도계 등 매일 보는 지표를 해석하는 법.' },
      { ic: '🧭', title: '투자 논리 세우기', status: '준비 중', href: '',
        desc: '재료에서 실적까지, 한 종목의 투자 논리를 점검표로 검증하는 법.' }
    ],
    /* AI 퀀트 과정 모집 정보(edu-quant.html 의 신청 영역에 표시). 확정되면 값만 바꾸면 된다. */
    eduQuant: {
      schedule: '추후 공지 (예: 주 1회 · 8주)',
      format:   '추후 공지 (예: 오프라인 강의 + 실습)',
      seats:    '추후 공지 (예: 20명 내외)',
      price:    '추후 공지',
      teacher:  '라파엔투자자문 박동현 팀장',
      applyUrl: ''     // 구글 폼 등 실제 접수 주소. 넣으면 신청서 제출 시 그 주소로 이동한다.
    },
    /* 자문 상품(product.html 과 홈에서 공통으로 쓰는 문구·숫자). */
    product: {
      name: '성장·방어 포트폴리오 자문',
      stats: [
        { big: '10년',    label: '과거 데이터로 검증',   sub: '백테스트' },
        { big: '실전',    label: '회사 자기자본으로 운용', sub: '직접 투자로 검증' },
        { big: '3~10',    label: '핵심 종목에 집중',     sub: '가장 강한 산업의 대표주' },
        { big: '0~100%',  label: '주식 비중 조절',       sub: '시장 상태에 따라' }
      ],
      /* 시장 상태 5단계와 주식 비중 범위(가운데 값으로 막대 높이를 그린다). */
      regime: [
        { ic: '☀️', name: '매우 좋음', stock: [90, 100] },
        { ic: '🌤️', name: '좋음',      stock: [70, 90] },
        { ic: '⛅', name: '보통',      stock: [40, 70] },
        { ic: '🌧️', name: '나쁨',      stock: [20, 40] },
        { ic: '⛈️', name: '매우 나쁨', stock: [0, 20] }
      ],
      flow: [
        { ic: '🔬', q: '무엇을 살까?',     a: '성장하는 산업',   d: '산업 리서치' },
        { ic: '🌦️', q: '지금 사도 될까?', a: '시장 날씨 확인',  d: '금리 · 유동성 · 이익' },
        { ic: '⏱️', q: '언제 살까?',       a: '오르는 흐름에서', d: '추세 · 상대 강도' },
        { ic: '⚖️', q: '얼마나 살까?',     a: '위험만큼만',      d: '비중 · 현금 조절' }
      ]
    },
    /* 홈 '매일 공개하는 리서치'에 보여 줄 카드(순서대로, data-limit 개수만큼). */
    homeCards: ['screener', 'strategy', 'market', 'flow', 'insights', 'briefs'],
    /* 콘텐츠 목록. key 는 URL ?v=key, file 은 알파노트의 파일명.
       title 은 누구나 알 수 있는 이름으로, desc 는 한 줄 설명, about 은 화면 위에 보여 주는 보충 설명. */
    dashboards: {
      information: [
        { grp: '오늘의 시장' },
        { key: 'briefs',      ic: '📰', title: '오늘의 시황',        file: 'briefs.html',
          desc: '장 시작 전에 알아야 할 핵심 뉴스와 대응 포인트',
          about: '밤사이 해외 시장과 주요 뉴스를 정리하고, 오늘 시장을 어떻게 볼지 매일 아침 요약합니다.' },
        { key: 'market',      ic: '🌡️', title: '시장 온도계',        file: 'market.html',
          desc: '지금 시장이 과열인지 침체인지 0~100점으로',
          about: '오르는 종목 수, 신고가·신저가, 변동성 등을 합쳐 시장의 체온을 점수로 보여 줍니다. 높을수록 과열, 낮을수록 침체입니다.' },
        { key: 'flow',        ic: '💰', title: '투자자별 매매 동향', file: 'flow.html',
          desc: '외국인·기관·개인이 오늘 얼마나 사고팔았나',
          about: '누가 사고 누가 팔았는지를 매일 집계합니다. 외국인과 기관의 움직임은 시장 방향을 읽는 단서입니다.' },
        { key: 'leverage',    ic: '📊', title: '빚투 · 대기자금',    file: 'leverage.html',
          desc: '빚내서 투자한 돈과 대기 중인 돈의 추이',
          about: '신용잔고(빚내서 산 주식)와 예탁금(살 준비가 된 돈)의 흐름입니다. 빚투가 급증하면 과열 신호로 봅니다.' },
        { grp: '종목 발굴' },
        { key: 'screener',    ic: '🔎', title: '오늘의 주도주',      file: 'screener.html',
          desc: '회사 내부 기준을 통과한 오늘의 강한 종목',
          about: '거래대금·수급·추세 등 회사 내부 기준을 모두 통과한 종목만 매일 자동으로 추립니다. 매수 추천이 아니라 관심 종목 후보입니다.' },
        { key: 'strategy',    ic: '📝', title: '오늘의 주도 업종',   file: 'strategy.html',
          desc: '오늘 시장을 이끈 업종과 그 이유',
          about: '그날 시장을 주도한 업종과 종목, 배경을 매일 리포트로 정리합니다.' },
        { key: 'rs',          ic: '🔥', title: '상대 강도 순위',     file: 'rs.html',
          desc: '시장보다 더 강하게 오르는 업종·테마·종목',
          about: '시장 평균보다 얼마나 더 강한지를 1~99점으로 매긴 순위입니다. 점수가 높을수록 주도주에 가깝습니다.' },
        { key: 'insights',    ic: '🚀', title: '증권사 리포트 요약', file: 'insights.html',
          desc: '오늘 나온 증권사 리포트와 목표가 대비 상승 여력',
          about: '그날 발간된 증권사 리포트를 요약하고, 목표 주가까지 얼마나 남았는지 순위로 보여 줍니다.' },
        { key: 'thesis',      ic: '🧭', title: '종목 투자 포인트 점검', file: 'thesis.html',
          desc: '왜 이 종목인가를 30점 체크리스트로 점검',
          about: '산업 전망부터 실적, 가격까지 투자 이유를 단계별로 점검해 30점 만점으로 채점합니다.' },
        { grp: '큰 흐름' },
        { key: 'korea_cycle', ic: '🔄', title: '한국 증시 사이클',   file: 'korea_cycle.html',
          desc: '지금 시장은 사이클의 어디쯤인가',
          about: '글로벌 경기, 반도체, 시장 참여도, 과열 정도를 종합해 현재 국면을 판단합니다.' },
        { key: 'aicycle',     ic: '🤖', title: 'AI 투자 붐 점검',    file: 'aicycle.html',
          desc: 'AI 투자 열기가 꺾일 위험 신호',
          about: '공급 과잉, 수요 둔화, 과도한 빚 등 AI 투자 붐이 끝날 때 나타나는 신호를 점검합니다.' },
        { key: 'x',           ic: '𝕏',  title: '해외 투자자 동향',   file: 'x.html',
          desc: '글로벌 투자 전문가들이 오늘 주목한 주제',
          about: '해외 유명 투자자와 분석가의 글을 모아 오늘의 주요 논점을 주제별로 정리합니다.' },
        { key: 'crypto',      ic: '₿',  title: '비트코인 지표',      file: 'crypto.html',
          desc: '비트코인 가격과 ETF 자금 흐름',
          about: '비트코인의 과열·침체 지표와 현물 ETF로 들어오고 나가는 자금을 매일 확인합니다.' },
        { grp: '분석 도구' },
        { key: 'chart',       ic: '📈', title: '주식 차트',          file: 'chart.html',
          desc: '종목별 가격 흐름을 한눈에',
          about: '국내외 종목의 가격 흐름과 평균선을 확인하는 차트입니다.' },
        { key: 'seasonality', ic: '🗓️', title: '월별 성적표',        file: 'seasonality.html',
          desc: '이 종목은 몇 월에 강했을까',
          about: '과거 데이터로 월별 평균 수익률과 오른 비율을 보여 줍니다. 계절적인 강세·약세 구간을 찾을 때 씁니다.' }
      ]
    },
    /* 공지/공시 글은 notices.json 에 있다(admin.html 에서 작성). 아래는 파일을 못 읽을 때의 폴백. */
    notices: []
  };
  window.SITE = SITE;

  /* ── 2. 유틸 ─────────────────────────────────────── */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function param(k) { try { return new URLSearchParams(location.search).get(k); } catch (e) { return null; } }
  function pageFile() { var p = location.pathname.split('/').pop(); return p || 'index.html'; }
  function findDash(key) {
    var groups = SITE.dashboards, g, i;
    for (g in groups) for (i = 0; i < groups[g].length; i++) if (groups[g][i].key === key) return { group: g, item: groups[g][i] };
    return null;
  }
  function dashByFile(file) {
    var groups = SITE.dashboards, g, i;
    for (g in groups) for (i = 0; i < groups[g].length; i++) if (groups[g][i].file === file) return { group: g, item: groups[g][i] };
    return null;
  }

  /* ── 3. 테마 ─────────────────────────────────────── */
  function curTheme() { return document.documentElement.dataset.theme || 'dark'; }
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('theme', t); } catch (e) {}
    var b = $('#theme-btn'); if (b) b.textContent = t === 'dark' ? '☀️' : '🌙';
    var f = $('#v-frame'); if (f && f.src) { var u = f.src; f.src = 'about:blank'; setTimeout(function () { f.src = u; }, 30); }
  }
  (function () { var t = null; try { t = localStorage.getItem('theme'); } catch (e) {} if (t) document.documentElement.dataset.theme = t; })();

  /* ── 4. 헤더·푸터 렌더 ────────────────────────────── */
  function renderHeader() {
    var here = pageFile();
    var html = '<div class="wrap">' +
      '<a class="brand" href="index.html"><span class="mark"></span><span>' + esc(SITE.name) + '</span></a>' +
      '<ul class="nav" id="nav">';
    SITE.menu.forEach(function (m) {
      var active = here === m.href.split('?')[0] ? ' active' : '';
      html += '<li class="' + active.trim() + '"><a class="top" href="' + m.href + '">' + esc(m.label) + '</a>';
      if (m.sub) {
        html += '<ul class="sub">';
        m.sub.forEach(function (s) {
          html += s.head ? '<li class="sub-head">' + esc(s.head) + '</li>' : '<li><a href="' + s.href + '">' + esc(s.label) + '</a></li>';
        });
        html += '</ul>';
      }
      html += '</li>';
    });
    html += '</ul><div class="hdr-tools">' +
      '<button class="icon-btn" id="theme-btn" aria-label="테마 전환">🌙</button>' +
      '<button class="icon-btn" id="menu-btn" aria-label="메뉴">☰</button></div></div>';
    var h = $('.site-header'); if (!h) { h = document.createElement('header'); h.className = 'site-header'; document.body.insertBefore(h, document.body.firstChild); }
    h.innerHTML = html;
    $('#theme-btn').addEventListener('click', function () { applyTheme(curTheme() === 'dark' ? 'light' : 'dark'); });
    $('#menu-btn').addEventListener('click', function () { $('#nav').classList.toggle('open'); });
    applyTheme(curTheme());
  }

  function renderFooter() {
    var c = SITE.company, f = $('.site-footer');
    if (!f) { f = document.createElement('footer'); f.className = 'site-footer'; document.body.appendChild(f); }
    f.innerHTML = '<div class="wrap"><div class="cols"><div>' +
      '<div class="brand">' + esc(SITE.name) + '</div>' +
      '<p>대표이사 : ' + esc(c.ceo) + '</p>' +
      '<p>주소 : ' + esc(c.addr) + '</p>' +
      '<p>대표전화 : ' + esc(c.tel) + (c.email ? ' &nbsp;|&nbsp; 이메일 : ' + esc(c.email) : '') + '</p>' +
      '<p>등록업무 : ' + esc(c.reg) + '</p></div>' +
      '<div class="links"><p><a href="about.html">회사소개</a><a href="notice.html">공지/공시</a><a href="about.html#privacy">개인정보처리방침</a><a href="about.html#terms">이용약관</a><a href="admin.html" style="color:#7f8ab5;font-weight:500">관리자</a></p>' +
      '<p class="disc">본 홈페이지의 리서치·대시보드는 공개 데이터를 자동 수집·가공한 참고 자료로, 특정 종목의 매수·매도를 권유하는 것이 아닙니다. 투자 판단과 그 결과에 대한 책임은 투자자 본인에게 있습니다.</p></div></div>' +
      '<p class="copy">Copyright © ' + esc(c.founded) + '–' + new Date().getFullYear() + ' ' + esc(SITE.name) + '. All rights reserved.</p></div>';
  }

  /* ── 5. 히어로 파티클 캔버스 ──────────────────────── */
  function particles(canvas) {
    var ctx = canvas.getContext('2d'), W, H, pts = [], N = 90, raf;
    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    function init() { pts = []; for (var i = 0; i < N; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: 1 + Math.random() * 1.6 }); }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < N; i++) {
        var p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        for (var j = i + 1; j < N; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 130 * 130) { ctx.strokeStyle = 'rgba(140,160,255,' + (0.22 * (1 - d / (130 * 130))).toFixed(3) + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        ctx.fillStyle = 'rgba(190,205,255,.85)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    resize(); init(); draw();
    window.addEventListener('resize', function () { resize(); init(); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) cancelAnimationFrame(raf); else draw(); });
  }

  /* ── 6. 대시보드 뷰어 ─────────────────────────────── */
  function renderViewer(el) {
    var group = el.dataset.viewer, list = SITE.dashboards[group] || [];
    var firstKey = null; list.forEach(function (d) { if (!firstKey && d.key) firstKey = d.key; });
    var key = param('v') || firstKey, cur = findDash(key) || findDash(firstKey);
    if (!cur) return;
    var side = '<nav class="side">';
    list.forEach(function (d) {
      if (d.grp) { side += '<div class="grp">' + esc(d.grp) + '</div>'; return; }
      side += '<a href="' + pageFile() + '?v=' + d.key + '" data-key="' + d.key + '" class="' + (d.key === cur.item.key ? 'on' : '') + '"><span class="i">' + d.ic + '</span>' + esc(d.title) + '</a>';
    });
    side += '</nav>';
    el.className = 'viewer';
    el.innerHTML = side + '<div class="main"><div class="bar"><b id="v-title"></b><span class="desc" id="v-desc"></span><a class="ext" id="v-ext" target="_blank" rel="noopener">새 창에서 열기 ↗</a></div><div class="about" id="v-about"></div><iframe id="v-frame" title="대시보드"></iframe></div>';
    function show(item, push) {
      $('#v-title', el).textContent = item.ic + ' ' + item.title;
      $('#v-desc', el).textContent = item.desc || '';
      var ab = $('#v-about', el); ab.textContent = item.about ? '💡 ' + item.about : ''; ab.hidden = !item.about;
      $('#v-ext', el).href = SITE.alphaBase + item.file;
      $('#v-frame', el).src = SITE.alphaBase + item.file;
      $$('.side a', el).forEach(function (a) { a.classList.toggle('on', a.dataset.key === item.key); });
      document.title = item.title + ' · ' + SITE.name;
      if (push) history.pushState({ v: item.key }, '', pageFile() + '?v=' + item.key);
    }
    show(cur.item, false);
    $$('.side a', el).forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); var d = findDash(a.dataset.key); if (d) show(d.item, true); });
    });
    window.addEventListener('popstate', function () { var d = findDash(param('v') || firstKey); if (d) show(d.item, false); });
  }

  /* ── 7. 홈: 알파노트 라이브 카드 ─────────────────── */
  function cardHead(d, date) {
    return '<div class="sc-head"><span class="sc-icon">' + d.ic + '</span><span class="sc-title">' + esc(d.title) + '</span>' +
      (date ? '<span class="sc-date">' + esc(date) + '</span>' : '') + '</div><div class="sc-desc">' + esc(d.desc) + '</div>';
  }
  function homeList(limit) {
    var keys = SITE.homeCards.slice(0, limit || 99), out = [];
    keys.forEach(function (k) { var d = findDash(k); if (d) out.push(d.item); });
    return out;
  }
  function renderLive(el) {
    var status = $('#live-status'), dateEl = $('#live-date'), limit = +el.dataset.limit || 6;
    var items = homeList(limit);
    el.innerHTML = items.map(function (d) {
      return '<a class="scard" href="information.html?v=' + d.key + '">' + cardHead(d) + '<div class="sc-more">자세히 →</div></a>';
    }).join('');
    fetch(SITE.alphaBase + 'index.html', { cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html'), byFile = {};
        $$('.scard', doc).forEach(function (c) { byFile[(c.getAttribute('href') || '').split('?')[0]] = c; });
        el.innerHTML = items.map(function (d) {
          var c = byFile[d.file], body = c && $('.sc-body', c), dt = c && $('.sc-date', c);
          return '<a class="scard" href="information.html?v=' + d.key + '">' + cardHead(d, dt ? dt.textContent.trim() : '') +
            (body ? body.outerHTML : '') + '<div class="sc-more">자세히 →</div></a>';
        }).join('');
        var top = $('.date', doc); if (top && dateEl) dateEl.textContent = top.textContent.trim();
        if (status) status.textContent = '';
      })
      .catch(function () { if (status) status.textContent = ''; });
  }

  /* ── 7-1. 공통 그림 컴포넌트(홈·자문 상품 페이지가 함께 쓴다) ── */
  function compStats() {
    return '<div class="statband">' + SITE.product.stats.map(function (x) {
      return '<div class="stat"><b>' + esc(x.big) + '</b><span>' + esc(x.label) + '</span><small>' + esc(x.sub) + '</small></div>';
    }).join('') + '</div>';
  }
  function compRegime() {
    var cols = SITE.product.regime.map(function (r) {
      var mid = (r.stock[0] + r.stock[1]) / 2;
      return '<div class="rg-col"><div class="rg-ic">' + r.ic + '</div><div class="rg-name">' + esc(r.name) + '</div>' +
        '<div class="rg-bar"><div class="rg-cash" style="height:' + (100 - mid) + '%"></div><div class="rg-stock" style="height:' + mid + '%"></div></div>' +
        '<div class="rg-val">주식 <b>' + r.stock[0] + '~' + r.stock[1] + '%</b></div></div>';
    }).join('');
    return '<div class="regime"><div class="rg-grid">' + cols + '</div>' +
      '<div class="rg-legend"><span><i class="lg-stock"></i>주식</span><span><i class="lg-cash"></i>현금</span></div></div>';
  }
  function compFlow4() {
    return '<div class="flow4">' + SITE.product.flow.map(function (f, i) {
      return '<div class="f4"><div class="f4-no">' + (i + 1) + '</div><div class="f4-ic">' + f.ic + '</div><div class="f4-q">' + esc(f.q) + '</div>' +
        '<div class="f4-a">' + esc(f.a) + '</div><div class="f4-d">' + esc(f.d) + '</div></div>';
    }).join('<div class="f4-arrow">→</div>') + '</div>';
  }
  function compDots(el) {
    var focus = el.dataset.dots === 'focus', n = 120, pick = {};
    [2, 26, 39, 50, 71, 88, 99, 112].forEach(function (i) { pick[i] = 1; });
    var h = '';
    for (var i = 0; i < n; i++) h += '<i class="' + (focus ? (pick[i] ? 'hit' : 'dim') : '') + '"></i>';
    el.innerHTML = h;
  }
  function renderComps() {
    var map = { stats: compStats, regime: compRegime, flow4: compFlow4 };
    $$('[data-comp]').forEach(function (e) { var f = map[e.dataset.comp]; if (f) e.innerHTML = f(); });
    $$('[data-dots]').forEach(compDots);
    $$('[data-product]').forEach(function (e) { var v = SITE.product[e.dataset.product]; if (v != null) e.textContent = v; });
  }

  /* ── 8. 공지 게시판 ───────────────────────────────── */
  // 아주 작은 마크다운 변환기: 제목(#), 굵게(**), 링크, 목록(- ), 빈 줄로 문단 구분, 줄바꿈 유지
  function md(src) {
    var lines = String(src || '').replace(/\r/g, '').split('\n'), out = [], para = [], list = [];
    function inline(t) {
      t = esc(t);
      t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      t = t.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
      t = t.replace(/(^|[^"'>])(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
      return t;
    }
    function flushP() { if (para.length) { out.push('<p>' + para.map(inline).join('<br>') + '</p>'); para = []; } }
    function flushL() { if (list.length) { out.push('<ul>' + list.map(function (x) { return '<li>' + inline(x) + '</li>'; }).join('') + '</ul>'); list = []; } }
    lines.forEach(function (ln) {
      var h = ln.match(/^(#{1,3})\s+(.*)$/), li = ln.match(/^[-*]\s+(.*)$/);
      if (h) { flushP(); flushL(); out.push('<h' + (h[1].length + 2) + '>' + inline(h[2]) + '</h' + (h[1].length + 2) + '>'); }
      else if (li) { flushP(); list.push(li[1]); }
      else if (!ln.trim()) { flushP(); flushL(); }
      else { flushL(); para.push(ln); }
    });
    flushP(); flushL();
    return out.join('');
  }
  window.renderMarkdown = md;

  function loadNotices() {
    return fetch(SITE.noticesFile + '?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .catch(function () { return SITE.notices; });
  }
  function noticeBody(n) { return /<[a-z][\s\S]*>/i.test(n.body || '') ? n.body : md(n.body); }
  function renderNotices(el) {
    el.innerHTML = '<p class="center" style="color:var(--muted)">불러오는 중…</p>';
    loadNotices().then(function (notices) {
      var id = param('id');
      if (id) {
        var n = notices.filter(function (x) { return String(x.id) === id; })[0];
        if (n) {
          el.innerHTML = '<div class="notice-body"><h2><span class="badge' + (n.pin ? ' pin' : '') + '">' + esc(n.cat) + '</span>' + esc(n.title) + '</h2>' +
            '<div class="meta">' + esc(n.date) + ' · ' + esc(SITE.name) + '</div><div class="md">' + noticeBody(n) + '</div><a class="back" href="notice.html">← 목록으로</a></div>';
          document.title = n.title + ' · ' + SITE.name; return;
        }
      }
      var rows = notices.slice().sort(function (a, b) { return (b.pin - a.pin) || (b.date > a.date ? 1 : b.date < a.date ? -1 : b.id - a.id); });
      var html = '<table class="board"><thead><tr><th style="width:60px">No</th><th>제목</th><th style="width:90px">분류</th><th style="width:120px">작성일</th></tr></thead><tbody>';
      rows.forEach(function (n) {
        html += '<tr><td class="no">' + n.id + '</td><td class="title"><a href="notice.html?id=' + n.id + '">' + (n.pin ? '<span class="badge pin">고정</span>' : '') + esc(n.title) + '</a></td><td>' + esc(n.cat) + '</td><td class="date">' + esc(n.date) + '</td></tr>';
      });
      html += '</tbody></table>';
      if (!rows.length) html = '<p class="center" style="color:var(--muted)">등록된 공지가 없습니다.</p>';
      el.innerHTML = html;
    });
  }

  /* ── 9. 회사 정보 치환 ────────────────────────────── */
  function fillCompany() {
    $$('[data-co]').forEach(function (e) { var v = SITE.company[e.dataset.co]; if (v != null) e.textContent = v; });
    $$('[data-alpha]').forEach(function (a) { a.href = SITE.alphaBase + a.dataset.alpha; });
  }

  /* ── 9-1. 교육 ───────────────────────────────────── */
  function renderCourses(el) {
    el.innerHTML = SITE.courses.map(function (c) {
      var open = !!c.href, tag = open ? 'a' : 'div';
      return '<' + tag + ' class="card course' + (open ? '' : ' soon') + '"' + (open ? ' href="' + c.href + '"' : '') + '>' +
        '<div class="ic">' + c.ic + '</div><span class="badge' + (open ? '' : ' mute') + '">' + esc(c.status) + '</span>' +
        '<h3>' + esc(c.title) + '</h3><p>' + esc(c.desc) + '</p>' + (open ? '<span class="tag">자세히 →</span>' : '') + '</' + tag + '>';
    }).join('');
  }
  function initApply(form) {
    var E = SITE.eduQuant, msgEl = $('#apply-msg');
    $$('[data-edu]').forEach(function (e) { if (E[e.dataset.edu] != null) e.textContent = E[e.dataset.edu]; });
    function say(t, cls) { msgEl.textContent = t; msgEl.className = 'form-msg ' + (cls || ''); }
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var v = function (id) { return ($('#' + id).value || '').trim(); };
      if (!v('a-name') || !v('a-phone') || !v('a-email')) { say('이름, 연락처, 이메일을 입력해 주세요.', 'err'); return; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('a-email'))) { say('이메일 형식을 확인해 주세요.', 'err'); return; }
      if (!$('#a-agree').checked) { say('개인정보 수집·이용에 동의해 주세요.', 'err'); return; }
      if (E.applyUrl) { say('접수 페이지로 이동합니다…', 'ok'); window.open(E.applyUrl, '_blank', 'noopener'); return; }
      if (SITE.company.email) {
        var body = ['[AI 퀀트 투자 과정 수강 신청]', '이름: ' + v('a-name'), '연락처: ' + v('a-phone'), '이메일: ' + v('a-email'),
          '구분: ' + v('a-job'), '코딩 경험: ' + v('a-code'), '투자 경험: ' + v('a-inv'), '', v('a-msg')].join('\n');
        location.href = 'mailto:' + SITE.company.email + '?subject=' + encodeURIComponent('AI 퀀트 투자 과정 수강 신청 - ' + v('a-name')) + '&body=' + encodeURIComponent(body);
        say('메일 작성 창이 열립니다. 보내기를 누르면 접수됩니다.', 'ok'); return;
      }
      // 접수 채널이 아직 연결되지 않은 예시 상태: 입력값은 어디에도 전송·저장하지 않는다.
      say('신청 화면 예시입니다. 실제 접수 채널 연결 전이라 입력하신 내용은 전송되지 않았습니다. 문의: ' + SITE.company.tel, 'ok');
    });
  }

  /* ── 10. 부트 ────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    renderHeader(); renderFooter(); fillCompany(); renderComps();
    var c = $('#hero-canvas'); if (c) particles(c);
    $$('[data-viewer]').forEach(renderViewer);
    var live = $('#live-cards'); if (live) renderLive(live);
    var nb = $('#notice-board'); if (nb) renderNotices(nb);
    var cl = $('#course-list'); if (cl) renderCourses(cl);
    var af = $('#apply-form'); if (af) initApply(af);
  });
})();
