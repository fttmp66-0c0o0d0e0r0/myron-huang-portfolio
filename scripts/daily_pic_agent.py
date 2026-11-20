#!/usr/bin/env python3
"""
daily_pic_agent.py
Automated AI Agent that generates a richly colorful, abstract artwork
based on daily global current affairs.
Runs daily at 08:00 TST (00:00 UTC) via GitHub Actions.

Outputs:
1. assets/pic-of-day.jpg (latest site display)
2. Daily Pic/{YYYY-MM-DD}.jpg (permanent archive in 'Daily Pic' folder)
3. Daily Pic/{YYYY-MM-DD}.txt (bilingual Traditional Chinese & English description)
4. data/pic-of-the-day.json (structured metadata)
"""

import os
import sys
import json
import shutil
import random
import datetime
import xml.etree.ElementTree as ET
import urllib.request
import urllib.parse

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
ASSETS_DIR = os.path.join(PROJECT_ROOT, "assets")
DATA_DIR = os.path.join(PROJECT_ROOT, "data")
DAILY_PIC_DIR = os.path.join(PROJECT_ROOT, "Daily Pic")

TARGET_IMAGE = os.path.join(ASSETS_DIR, "pic-of-day.jpg")
METADATA_JSON = os.path.join(DATA_DIR, "pic-of-the-day.json")

# Abstract Artistic Styles Palette (Diverse, Primarily Abstract, Rich Color)
ABSTRACT_STYLES = [
    {
        "name": "Chromatic Fluid Expressionism",
        "name_zh": "高彩流體表現主義",
        "desc": "Flowing luminous pigments, organic gradients, vibrant acrylic swirls, bold layered palette knife impasto.",
        "desc_zh": "流動的發光顏料、有機漸層色彩、奔放的壓克力旋渦與多層次刮刀油彩厚塗質感。",
        "colors": "deep cobalt blue, radiant magenta, emerald green, warm amber gold, luminous violet",
        "colors_zh": "深邃鈷藍、奔放洋紅、翡翠綠、溫潤琥珀金、發光紫羅蘭"
    },
    {
        "name": "Geometric Constructivist Harmony",
        "name_zh": "幾何構成主義和諧",
        "desc": "Crisp geometric planes, dynamic intersecting color fields, rhythmic Bauhaus-inspired precision, high saturation.",
        "desc_zh": "清晰的幾何切面、動態交錯的色塊力場、包浩斯律動美學與高飽和度色彩對比。",
        "colors": "ultramarine, vermilion orange, cadmium yellow, jade turquoise, deep slate contrast",
        "colors_zh": "群青、朱砂橘、鎘黃、玉石綠松色、深石板對比色"
    },
    {
        "name": "Prismatic Algorithmic Flow",
        "name_zh": "稜鏡演算法光流",
        "desc": "Generative digital color waves, refraction optics, neon-infused spectral dispersion, ethereal fluid dynamics.",
        "desc_zh": "生成式數位色彩波紋、折射光學效應、霓虹光譜色散與空靈流體動態。",
        "colors": "neon cyan, electric violet, sunset coral, iridescent pearl, obsidian dark depths",
        "colors_zh": "霓虹青、電光紫、落日珊瑚橘、幻彩珍珠光、曜石深墨"
    },
    {
        "name": "Cosmic Neo-Abstract Colorfield",
        "name_zh": "宇宙新抽象色域",
        "desc": "Expansive atmospheric color washes, textured mineral glazes, contemplative chromatic resonance, kinetic energy.",
        "desc_zh": "遼闊大氣渲染色暈、礦物釉面肌理質感、沉浸式色彩共鳴與躍動能量。",
        "colors": "sapphire blue, fiery ochre, celestial rose, verdigris copper, gold dust highlights",
        "colors_zh": "藍寶石深藍、燃燒赭石、星雲玫瑰粉、銅綠色、金箔微塵高光"
    },
    {
        "name": "Kinetic Stippled Abstraction",
        "name_zh": "動態點彩抽象律動",
        "desc": "Pointillist textural rhythm, vibrating multi-hued particles, dimensional chromatic layering, avant-garde contemporary.",
        "desc_zh": "點彩紋理節奏、震顫微粒光點、多維度色彩疊加與前衛當代抽象張力。",
        "colors": "topaz blue, ruby crimson, chartreuse green, electric amber, amethyst purple",
        "colors_zh": "黃玉藍、紅寶石深紅、黃綠色、電光琥珀、紫水晶紫"
    }
]

def fetch_top_global_headline():
    """Fetches the latest global headline from international Google News RSS."""
    rss_urls = [
        "https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US:en", # World
        "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en" # Top
    ]
    for url in rss_urls:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
            with urllib.request.urlopen(req, timeout=10) as resp:
                xml_data = resp.read()
                root = ET.fromstring(xml_data)
                items = root.findall(".//item")
                if items:
                    title = items[0].find("title").text
                    clean_title = title.split(" - ")[0].strip()
                    print(f"[Agent] Fetched global headline: {clean_title}")
                    return clean_title
        except Exception as e:
            print(f"[Agent] Warning: RSS fetch error from {url}: {e}")
            continue

    fallback_topics = [
        "Global Clean Energy Acceleration & Renewable Supergrid Interconnections",
        "International AI Safety Summit & Frontier Reasoning Model Governance",
        "Space Exploration Breakthrough: Next-Generation Orbital Telescopes",
        "Cross-Continental High-Speed Transit Networks & Infrastructure Resiliency",
        "Quantum Computational Frontiers & Molecular Discovery Milestones"
    ]
    chosen = random.choice(fallback_topics)
    print(f"[Agent] Using curated headline: {chosen}")
    return chosen

def build_abstract_prompt(headline):
    """Crafts a rich, vivid abstract prompt derived from the day's event."""
    style = random.choice(ABSTRACT_STYLES)
    prompt = (
        f"Masterpiece fine-art abstract painting inspired by global concept '{headline}'. "
        f"Style: {style['name']}, {style['desc']} "
        f"Palette: {style['colors']}. "
        f"Rich vivid chromatic saturation, museum-grade visual texture, dynamic compositional balance, "
        f"pure abstract art, no human faces, no legible words or typography, elegant, highly detailed, 8k resolution."
    )
    return prompt, style

def generate_image_hf(prompt, token):
    """Calls Hugging Face Inference API (FLUX.1-schnell or SDXL) to generate the image."""
    models = [
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
    ]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    payload = json.dumps({"inputs": prompt, "parameters": {"num_inference_steps": 25}}).encode("utf-8")

    for model_url in models:
        try:
            print(f"[Agent] Requesting Hugging Face model: {model_url.split('/')[-1]}...")
            req = urllib.request.Request(model_url, data=payload, headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=90) as resp:
                image_bytes = resp.read()
                if image_bytes and len(image_bytes) > 5000:
                    return image_bytes
        except Exception as e:
            print(f"[Agent] HF Error with {model_url}: {e}")
            continue
    return None

def build_bilingual_text(date_str, date_display, headline, style, prompt):
    """Generates a structured bilingual text containing Traditional Chinese and English descriptions."""
    tc_concept = (
        f"「有機流體 × 理性光網」：以厚塗油彩交織演算法星芒，融合生態能量與科技秩序。"
    )
    tc_convey = (
        "傳達「科技進步與全球共存的動態平衡」，在 AI 高速演進中展現人類創新韌性與美好聯結。"
    )

    en_concept = (
        f"Organic fluid impasto merges with rational geometry, weaving rich chromatic pigments with luminous algorithmic light filaments."
    )
    en_convey = (
        "Conveys dynamic balance between technological progress and human coexistence, celebrating innovation and luminous global connectivity."
    )

    content = f"""================================================================================
                    Pic. of the day | 每日時事藝術
                           {date_str}
================================================================================

【基本資訊 / Overview】
• 日期 (Date): {date_str} ({date_display})
• 產出時間 (Generated Time): 08:00 TST (00:00 UTC)
• 創作者 (Agent): Antigravity Daily Visual Agent
• 典藏圖片 (Archive Image): Daily Pic/{date_str}.jpg

--------------------------------------------------------------------------------
【繁體中文 (Traditional Chinese)】
--------------------------------------------------------------------------------
■ 今日時事靈感 (Inspiration)
  {headline}

■ 設計概念 (DESIGN CONCEPT)
  {tc_concept}

■ 想傳達的意念 (WHAT IT CONVEYS)
  {tc_convey}

--------------------------------------------------------------------------------
【English】
--------------------------------------------------------------------------------
■ Daily Inspiration
  {headline}

■ DESIGN CONCEPT
  {en_concept}

■ WHAT IT CONVEYS
  {en_convey}

================================================================================
"""
    return content, tc_concept, tc_convey, en_concept, en_convey

def main():
    os.makedirs(ASSETS_DIR, exist_ok=True)
    os.makedirs(DATA_DIR, exist_ok=True)
    os.makedirs(DAILY_PIC_DIR, exist_ok=True)

    today_dt = datetime.datetime.now(datetime.timezone.utc)
    tst_dt = today_dt + datetime.timedelta(hours=8)
    date_str = tst_dt.strftime("%Y-%m-%d")
    date_display = tst_dt.strftime("%b %d, %Y")

    headline = fetch_top_global_headline()
    prompt, style = build_abstract_prompt(headline)

    hf_token = os.environ.get("HF_TOKEN") or os.environ.get("HUGGINGFACE_API_KEY")
    image_bytes = None

    if hf_token:
        print("[Agent] Generating image via Hugging Face API...")
        image_bytes = generate_image_hf(prompt, hf_token)

    archive_jpg = os.path.join(DAILY_PIC_DIR, f"{date_str}.jpg")
    archive_txt = os.path.join(DAILY_PIC_DIR, f"{date_str}.txt")

    if image_bytes:
        with open(TARGET_IMAGE, "wb") as f:
            f.write(image_bytes)
        with open(archive_jpg, "wb") as f:
            f.write(image_bytes)
        print(f"[Agent] Saved new image to {TARGET_IMAGE} and {archive_jpg}")
    else:
        print("[Agent] Notice: No API token or generation fallback; preserving existing image.")
        if os.path.exists(TARGET_IMAGE) and not os.path.exists(archive_jpg):
            shutil.copy2(TARGET_IMAGE, archive_jpg)
            print(f"[Agent] Archived existing image to {archive_jpg}")

    txt_content, tc_concept, tc_convey, en_concept, en_convey = build_bilingual_text(
        date_str, date_display, headline, style, prompt
    )

    with open(archive_txt, "w", encoding="utf-8") as f:
        f.write(txt_content)
    print(f"[Agent] Description file saved to {archive_txt}")

    # Update structured metadata JSON
    metadata = {
        "date": date_str,
        "date_display": date_display,
        "update_time": "08:00 TST",
        "title": "Pic. of the day",
        "inspiration": headline,
        "style_name": style["name"],
        "style_name_zh": style["name_zh"],
        "style_desc": style["desc"],
        "design_concept": tc_concept,
        "message_conveyed": tc_convey,
        "design_concept_en": en_concept,
        "message_conveyed_en": en_convey,
        "prompt": prompt,
        "image_path": "./assets/pic-of-day.jpg",
        "archive_image": f"./Daily Pic/{date_str}.jpg",
        "archive_desc": f"./Daily Pic/{date_str}.txt",
        "agent": "Antigravity Daily Visual Agent",
        "version": "1.3"
    }

    with open(METADATA_JSON, "w", encoding="utf-8") as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)

    print(f"[Agent] Metadata written to {METADATA_JSON}")
    print("[Agent] Daily Pic of the Day Agent execution complete!")

if __name__ == "__main__":
    main()
