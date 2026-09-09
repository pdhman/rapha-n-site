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
      { label: 'Strategy',    href: 'strategy.html', sub: [
          { label: '주도섹터 리포트',  href: 'strategy.html?v=strategy' },
          { label: '종목탐색',         href: 'strategy.html?v=screener' },
          { label: 'RS 스크리너',      href: 'strategy.html?v=rs' },
          { label: '투자 논리 랩',     href: 'strategy.html?v=thesis' } ] },
      { label: 'Process',     href: 'process.html' },
      { label: 'Information', href: 'information.html', sub: [
          { label: '주식 시황',        href: 'information.html?v=briefs' },
          { label: '리포트 인사이트',  href: 'information.html?v=insights' },
          { label: '시장 건전성',      href: 'information.html?v=market' },
          { label: '수급 동향',        href: 'information.html?v=flow' },
          { label: '사이클 모니터',    href: 'information.html?v=korea_cycle' } ] },
      { label: 'Notice',      href: 'notice.html', sub: [
          { label: '공지/공시',        href: 'notice.html' } ] },
      { label: 'About',       href: 'about.html' }
    ],
    /* 대시보드 목록. key 는 URL ?v=key 로 쓰이고 file 은 알파노트의 파일명. */
    dashboards: {
      strategy: [
        { grp: '리서치' },
        { key: 'strategy',    ic: '📝', title: '주도섹터 리포트', file: 'strategy.html',    desc: '일간 주도 섹터·주도주 흐름과 투자 아이디어' },
        { key: 'thesis',      ic: '🧭', title: '투자 논리 랩',    file: 'thesis.html',      desc: '재료→증거→실적 전달을 30점으로 검증하는 종목 논리' },
        { grp: '스크리닝' },
        { key: 'screener',    ic: '🔎', title: '종목탐색',        file: 'screener.html',    desc: '거래대금·수급·기술적 조건으로 고른 오늘의 주도주' },
        { key: 'rs',          ic: '🔥', title: 'RS 스크리너',     file: 'rs.html',          desc: '섹터·업종·테마·ETF 상대강도 랭킹' },
        { grp: '분석 도구' },
        { key: 'chart',       ic: '📈', title: '주식 차트',       file: 'chart.html',       desc: '캔들·이동평균·로그 스케일 차트' },
        { key: 'seasonality', ic: '🗓️', title: '계절성 분석',     file: 'seasonality.html', desc: '월별 통계·최적 진입 시점·히트맵' }
      ],
      information: [
        { grp: '시황' },
        { key: 'briefs',      ic: '📰', title: '주식 시황',       file: 'briefs.html',      desc: '당일 개장 흐름과 거시·실적·전술 브리핑' },
        { key: 'insights',    ic: '🚀', title: '리포트 인사이트', file: 'insights.html',    desc: '증권사 리포트 요약과 상승여력 순위' },
        { key: 'x',           ic: '𝕏',  title: 'X 모니터링',      file: 'x.html',           desc: '글로벌 투자자 계정의 주요 논점 정리' },
        { grp: '시장 지표' },
        { key: 'market',      ic: '🌡️', title: '시장 건전성',     file: 'market.html',      desc: 'A/D·신고저·이평 비율·공포탐욕 종합 스코어' },
        { key: 'leverage',    ic: '📊', title: '시장 레버리지',   file: 'leverage.html',    desc: '신용잔고·예탁금·반대매매 추이' },
        { key: 'flow',        ic: '💰', title: '수급 동향',       file: 'flow.html',        desc: '코스피·코스닥·선물 투자자별 매매 동향' },
        { key: 'crypto',      ic: '₿',  title: '크립토 모니터',   file: 'crypto.html',      desc: 'BTC 핵심 지표·ETF 자금 흐름' },
        { grp: '사이클' },
        { key: 'korea_cycle', ic: '🔄', title: '한국 시장 사이클', file: 'korea_cycle.html', desc: 'Global→반도체→Breadth→Euphoria 국면 모델' },
        { key: 'aicycle',     ic: '🤖', title: 'AI 사이클 리스크', file: 'aicycle.html',     desc: '공급과잉·수요둔화·레버리지 위험 신호' }
      ]
    },
    /* 공지/공시. 최신 글을 맨 앞에 둔다. body 는 HTML 허용. */
    notices: [
      { id: 3, date: '2026-09-08', cat: '공지', pin: true, title: '홈페이지 개편 안내',
        body: '<p>라파엔투자자문 홈페이지를 새롭게 단장했습니다. Strategy·Information 메뉴에서 매일 자동 갱신되는 리서치 대시보드를 확인하실 수 있습니다.</p><p>대시보드의 모든 정보는 자동 수집·생성된 참고 자료이며, 투자 판단의 책임은 이용자 본인에게 있습니다.</p>' },
      { id: 2, date: '2026-09-01', cat: '공시', pin: false, title: '투자자문업 등록 사항 안내',
        body: '<p>당사는 자본시장과 금융투자업에 관한 법률에 따라 투자자문업(등록업무 5-1-1)을 영위하고 있습니다. 세부 등록 사항은 금융투자협회 공시 페이지에서 확인하실 수 있습니다.</p>' },
      { id: 1, date: '2026-08-15', cat: '공지', pin: false, title: '알파노트 데일리 리서치 서비스 오픈',
        body: '<p>매일 아침 시황 브리핑, 리포트 인사이트, 시장 건전성·수급·레버리지 지표를 자동으로 수집해 제공하는 알파노트 서비스를 시작합니다.</p>' }
    ]
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
        m.sub.forEach(function (s) { html += '<li><a href="' + s.href + '">' + esc(s.label) + '</a></li>'; });
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
      '<div class="links"><p><a href="about.html">회사소개</a><a href="notice.html">공지/공시</a><a href="about.html#privacy">개인정보처리방침</a><a href="about.html#terms">이용약관</a></p>' +
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
    el.innerHTML = side + '<div class="main"><div class="bar"><b id="v-title"></b><span class="desc" id="v-desc"></span><a class="ext" id="v-ext" target="_blank" rel="noopener">새 창에서 열기 ↗</a></div><iframe id="v-frame" title="대시보드"></iframe></div>';
    function show(item, push) {
      $('#v-title', el).textContent = item.ic + ' ' + item.title;
      $('#v-desc', el).textContent = item.desc || '';
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
  function staticCards() {
    var out = '';
    ['information', 'strategy'].forEach(function (g) {
      SITE.dashboards[g].forEach(function (d) {
        if (d.grp) return;
        out += '<a class="scard" href="' + g + '.html?v=' + d.key + '"><div class="sc-head"><span class="sc-icon">' + d.ic + '</span><span class="sc-title">' + esc(d.title) + '</span></div>' +
          '<div class="sc-body"><p class="clamp">' + esc(d.desc) + '</p></div><div class="sc-more">자세히 →</div></a>';
      });
    });
    return out;
  }
  function renderLive(el) {
    var status = $('#live-status'), dateEl = $('#live-date');
    el.innerHTML = staticCards();
    fetch(SITE.alphaBase + 'index.html', { cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var cards = $$('.scard', doc); if (!cards.length) throw new Error('no cards');
        var out = '';
        cards.forEach(function (c) {
          var file = (c.getAttribute('href') || '').split('?')[0];
          var d = dashByFile(file);
          var href = d ? d.group + '.html?v=' + d.item.key : SITE.alphaBase + file;
          var body = $('.sc-body', c); var head = $('.sc-head', c);
          out += '<a class="scard" href="' + href + '">' + (head ? head.outerHTML : '') + (body ? body.outerHTML : '') + '<div class="sc-more">자세히 →</div></a>';
        });
        el.innerHTML = out;
        var dt = $('.date', doc); if (dt && dateEl) dateEl.textContent = dt.textContent.trim();
        if (status) status.textContent = '알파노트에서 방금 불러온 최신 요약입니다.';
      })
      .catch(function () { if (status) status.textContent = '실시간 요약을 불러오지 못해 기본 목록을 표시합니다.'; });
  }

  /* ── 8. 공지 게시판 ───────────────────────────────── */
  function renderNotices(el) {
    var id = param('id');
    if (id) {
      var n = SITE.notices.filter(function (x) { return String(x.id) === id; })[0];
      if (n) {
        el.innerHTML = '<div class="notice-body"><h2><span class="badge' + (n.pin ? ' pin' : '') + '">' + esc(n.cat) + '</span>' + esc(n.title) + '</h2>' +
          '<div class="meta">' + esc(n.date) + ' · ' + esc(SITE.name) + '</div>' + n.body + '<a class="back" href="notice.html">← 목록으로</a></div>';
        document.title = n.title + ' · ' + SITE.name; return;
      }
    }
    var rows = SITE.notices.slice().sort(function (a, b) { return (b.pin - a.pin) || (b.date > a.date ? 1 : -1); });
    var html = '<table class="board"><thead><tr><th style="width:60px">No</th><th>제목</th><th style="width:90px">분류</th><th style="width:120px">작성일</th></tr></thead><tbody>';
    rows.forEach(function (n) {
      html += '<tr><td class="no">' + n.id + '</td><td class="title"><a href="notice.html?id=' + n.id + '">' + (n.pin ? '<span class="badge pin">고정</span>' : '') + esc(n.title) + '</a></td><td>' + esc(n.cat) + '</td><td class="date">' + esc(n.date) + '</td></tr>';
    });
    html += '</tbody></table>';
    if (!rows.length) html = '<p class="center" style="color:var(--muted)">등록된 공지가 없습니다.</p>';
    el.innerHTML = html;
  }

  /* ── 9. 회사 정보 치환 ────────────────────────────── */
  function fillCompany() {
    $$('[data-co]').forEach(function (e) { var v = SITE.company[e.dataset.co]; if (v != null) e.textContent = v; });
    $$('[data-alpha]').forEach(function (a) { a.href = SITE.alphaBase + a.dataset.alpha; });
  }

  /* ── 10. 부트 ────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    renderHeader(); renderFooter(); fillCompany();
    var c = $('#hero-canvas'); if (c) particles(c);
    $$('[data-viewer]').forEach(renderViewer);
    var live = $('#live-cards'); if (live) renderLive(live);
    var nb = $('#notice-board'); if (nb) renderNotices(nb);
  });
})();
