#!/usr/bin/env python3
"""白背景のイラストPNGを透過webpにする。外周からつながる白だけ抜き、書類など内側の白は残す。

    python3 scripts/ebook-illus-transparent.py <PNGのフォルダ> <出力フォルダ>
"""
import glob
import os
import sys

from PIL import Image, ImageDraw, ImageFilter

src, dst = sys.argv[1:3]
KEY = (255, 0, 255)
for f in glob.glob(f"{src}/*.png"):
    im = Image.open(f).convert("RGB")
    W, H = im.size
    m = im.copy()
    edge = [(i, 0) for i in range(0, W, 16)] + [(i, H - 1) for i in range(0, W, 16)] + [(0, j) for j in range(0, H, 16)] + [(W - 1, j) for j in range(0, H, 16)]
    for x, y in edge:
        if min(m.getpixel((x, y))) > 232:
            ImageDraw.floodfill(m, (x, y), KEY, thresh=24)
    a = Image.new("L", (W, H), 255)
    p, q = m.load(), a.load()
    for y in range(H):
        for x in range(W):
            if p[x, y] == KEY:
                q[x, y] = 0
    a = a.filter(ImageFilter.GaussianBlur(0.8))
    out = im.copy()
    out.putalpha(a)
    out = out.crop(a.point(lambda v: 255 if v > 16 else 0).getbbox())
    name = os.path.basename(f)[:-4]
    h = 560 if name == "cover" else 420
    if out.height > h:
        out = out.resize((round(out.width * h / out.height), h), Image.LANCZOS)
    out.save(f"{dst}/{name}.webp", quality=88, method=6)
    print(name, out.size)
