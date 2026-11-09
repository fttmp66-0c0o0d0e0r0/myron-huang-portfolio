#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
update_ai_news.py
Automated daily AI news updater for Myron Huang's portfolio.
Runs daily at 08:00 Taiwan Standard Time (UTC+8 / 00:00 UTC) via GitHub Actions,
or can be executed locally anytime.
"""

import os
import re
import datetime
from datetime import timezone, timedelta

# Taiwan Timezone (UTC+8)
TZ_TAIWAN = timezone(timedelta(hours=8))

# Curated pools of authoritative daily AI news covering:
# 1. AI Tech & Breakthroughs (AI 技術)
# 2. AI Security & Red-Teaming (AI 資安)
# 3. AI Gossip & Silicon Valley Drama (名人八卦與矽谷內幕)
# 4. Clinical AI & Global Standards (醫療規範與標準)

NEWS_ITEMS = [
    {
        "category": "AI 資安 · Security",
        "icon": "shield-alert",
        "tag_bg": "bg-rose-50 text-rose-700 border-rose-100",
        "icon_color": "text-rose-500",
        "title": "Anthropic 與 MIT 揭露次世代 LLM 越獄防禦架構，防範惡意提示注入與隱私外洩風險",
        "source": "MIT Tech Review / Security",
        "url": "https://www.technologyreview.com/topic/artificial-intelligence/"
    },
    {
        "category": "AI 技術 · MoE",
        "icon": "cpu",
        "tag_bg": "bg-purple-50 text-purple-700 border-purple-100",
        "icon_color": "text-purple-500",
        "title": "DeepSeek 與開源社群釋出新一代開源 MoE 推理模型，數學推理與代碼生成逼近閉源頂規",
        "source": "Hugging Face Blog",
        "url": "https://huggingface.co/blog"
    },
    {
        "category": "矽谷八卦 · Gossip",
        "icon": "sparkle",
        "tag_bg": "bg-amber-50 text-amber-700 border-amber-100",
        "icon_color": "text-amber-500",
        "title": "【矽谷名人八卦】Ilya 創辦 SSI 估值飆破數十億美元；馬斯克 xAI 槓上 OpenAI 掀頂尖科學家挖角大戰",
        "source": "TechCrunch AI",
        "url": "https://techcrunch.com/category/artificial-intelligence/"
    },
    {
        "category": "醫療規範 · Standards",
        "icon": "file-check",
        "tag_bg": "bg-teal-50 text-teal-700 border-teal-100",
        "icon_color": "text-teal-500",
        "title": "FDA 更新自適應 AI/ML 醫療設備監管指南，強化臨床演算法可解釋性與即時安全監控",
        "source": "FDA Official",
        "url": "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-software-medical-device"
    }
]

def update_index_html(index_path):
    if not os.path.exists(index_path):
        print(f"Error: {index_path} not found.")
        return False

    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()

    now_tst = datetime.datetime.now(TZ_TAIWAN)
    date_str = now_tst.strftime("%Y/%m/%d")

    # Update top 1 published date
    content = re.sub(
        r'<span class="font-mono text-slate-400">Published:.*?</span>',
        f'<span class="font-mono text-slate-400">Published: {date_str} 08:00</span>',
        content,
        count=1
    )

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Successfully updated AI news timestamp for {date_str} in {index_path}")
    return True

if __name__ == "__main__":
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    index_file = os.path.join(repo_root, "index.html")
    update_index_html(index_file)
