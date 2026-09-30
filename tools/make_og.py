# -*- coding: utf-8 -*-
"""링크 공유용 미리보기 이미지(1200x630) 생성.
문구를 바꾸려면 아래 make(...) 호출의 글자만 고치고 실행한다:  python tools/make_og.py
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOLD = r"C:\Windows\Fonts\malgunbd.ttf"
REG = r"C:\Windows\Fonts\malgun.ttf"
W, H = 1200, 630
INK, ACCENT, MUTED, EYEBROW = (232, 234, 237), (167, 139, 250), (154, 162, 173), (116, 143, 252)


def font(path, size):
    return ImageFont.truetype(path, size)


def make(name, eyebrow, lines, sub, foot):
    img = Image.new("RGB", (W, H), (15, 18, 22))
    glow = Image.new("RGB", (W, H), (15, 18, 22))
    g = ImageDraw.Draw(glow)
    g.ellipse((640, -260, 1400, 420), fill=(44, 58, 120))
    g.ellipse((-300, 380, 380, 900), fill=(52, 40, 96))
    img = Image.blend(img, glow.filter(ImageFilter.GaussianBlur(140)), 0.85)
    d = ImageDraw.Draw(img)
    d.text((80, 70), "라파엔투자자문", font=font(BOLD, 34), fill=INK)
    d.text((80, 190), eyebrow, font=font(BOLD, 24), fill=EYEBROW)
    y = 236
    for text, color in lines:
        d.text((80, y), text, font=font(BOLD, 62), fill=color)
        y += 84
    d.text((80, y + 18), sub, font=font(REG, 30), fill=MUTED)
    d.line((80, 540, 1120, 540), fill=(37, 43, 51), width=2)
    d.text((80, 560), foot, font=font(REG, 24), fill=MUTED)
    path = os.path.join(ROOT, "assets", name)
    img.save(path, optimize=True)
    print(name, os.path.getsize(path))


if __name__ == "__main__":
    make("og-site.png", "RAPHA-N INVESTMENT ADVISORY",
         [("AI 투자의 새로운 기준", INK), ("SEE THE UNSEEN", ACCENT)],
         "오를 땐 집중하고, 위험할 땐 지키는 포트폴리오", "10년 백테스트  ·  자기자본 실전 운용으로 검증")
    make("og-product.png", "PRODUCT · 투자자문 상품",
         [("성장·방어 포트폴리오 자문", INK), ("오를 땐 집중, 위험할 땐 방어", ACCENT)],
         "핵심 3~10종목 집중 · 시장 상태에 따라 주식 비중 조절", "10년 백테스트  ·  자기자본 실전 운용으로 검증")
    make("og-edu.png", "EDUCATION · AI 퀀트 투자 과정",
         [("AI가 코드를 씁니다.", INK), ("당신은 무엇을 검증할지만.", ACCENT)],
         "코딩을 몰라도, 직장인·대학생 누구나", "7개 모듈  ·  3개 프로젝트  ·  코딩 경험 불필요")
