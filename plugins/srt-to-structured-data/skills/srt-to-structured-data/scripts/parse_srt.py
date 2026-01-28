#!/usr/bin/env python3
"""
SRT 字幕文件解析器

将 SRT 格式字幕转换为结构化 JSON 数据。

用法:
    python parse_srt.py input.srt                    # 输出到终端
    python parse_srt.py input.srt -o output.json     # 输出到文件
    python parse_srt.py input.srt --stats            # 包含统计信息
    python parse_srt.py input.srt --text-only        # 仅输出纯文本
"""

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Optional


def time_to_ms(time_str: str) -> int:
    """将 SRT 时间格式转换为毫秒"""
    # 格式: HH:MM:SS,mmm
    match = re.match(r'(\d{2}):(\d{2}):(\d{2})[,.](\d{3})', time_str)
    if not match:
        raise ValueError(f"无效的时间格式: {time_str}")

    hours, minutes, seconds, milliseconds = map(int, match.groups())
    return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds


def ms_to_formatted(ms: int) -> str:
    """将毫秒转换为 MM:SS 格式"""
    total_seconds = ms // 1000
    minutes = total_seconds // 60
    seconds = total_seconds % 60
    return f"{minutes:02d}:{seconds:02d}"


def parse_srt(content: str) -> list[dict]:
    """解析 SRT 内容，返回结构化数据列表"""
    subtitles = []

    # 按空行分割字幕块
    blocks = re.split(r'\n\s*\n', content.strip())

    for block in blocks:
        block = block.strip()
        if not block:
            continue

        lines = block.split('\n')
        if len(lines) < 2:
            continue

        # 解析序号
        try:
            index = int(lines[0].strip())
        except ValueError:
            continue

        # 解析时间码
        time_match = re.match(
            r'(\d{2}:\d{2}:\d{2}[,.]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[,.]\d{3})',
            lines[1].strip()
        )
        if not time_match:
            continue

        start_time = time_match.group(1)
        end_time = time_match.group(2)

        # 解析文本（可能是多行）
        text_lines = lines[2:] if len(lines) > 2 else []
        text = '\n'.join(line.strip() for line in text_lines if line.strip())

        if not text:
            continue

        # 计算毫秒
        start_ms = time_to_ms(start_time)
        end_ms = time_to_ms(end_time)
        duration_ms = end_ms - start_ms

        subtitles.append({
            'index': index,
            'start_time': start_time,
            'end_time': end_time,
            'start_ms': start_ms,
            'end_ms': end_ms,
            'duration_ms': duration_ms,
            'text': text
        })

    return subtitles


def calculate_statistics(subtitles: list[dict]) -> dict:
    """计算字幕统计信息"""
    if not subtitles:
        return {
            'total_count': 0,
            'total_duration_ms': 0,
            'total_duration_formatted': '00:00',
            'avg_duration_ms': 0
        }

    total_count = len(subtitles)
    total_duration_ms = sum(s['duration_ms'] for s in subtitles)
    avg_duration_ms = total_duration_ms // total_count if total_count > 0 else 0

    return {
        'total_count': total_count,
        'total_duration_ms': total_duration_ms,
        'total_duration_formatted': ms_to_formatted(total_duration_ms),
        'avg_duration_ms': avg_duration_ms
    }


def main():
    parser = argparse.ArgumentParser(
        description='将 SRT 字幕文件转换为结构化 JSON 数据'
    )
    parser.add_argument('input', help='输入的 SRT 文件路径')
    parser.add_argument('-o', '--output', help='输出文件路径（默认输出到终端）')
    parser.add_argument('--stats', action='store_true', help='包含统计信息')
    parser.add_argument('--text-only', action='store_true', help='仅输出纯文本')

    args = parser.parse_args()

    # 读取输入文件
    input_path = Path(args.input)
    if not input_path.exists():
        print(f"错误: 文件不存在 - {args.input}", file=sys.stderr)
        sys.exit(1)

    # 尝试不同编码读取
    content = None
    for encoding in ['utf-8', 'utf-8-sig', 'gbk', 'gb2312', 'latin-1']:
        try:
            content = input_path.read_text(encoding=encoding)
            break
        except UnicodeDecodeError:
            continue

    if content is None:
        print(f"错误: 无法读取文件，编码未知 - {args.input}", file=sys.stderr)
        sys.exit(1)

    # 解析 SRT
    subtitles = parse_srt(content)

    # 生成输出
    if args.text_only:
        output = '\n'.join(s['text'] for s in subtitles)
    else:
        result = {'subtitles': subtitles}
        if args.stats:
            result['statistics'] = calculate_statistics(subtitles)
        output = json.dumps(result, ensure_ascii=False, indent=2)

    # 输出结果
    if args.output:
        output_path = Path(args.output)
        output_path.write_text(output, encoding='utf-8')
        print(f"已保存到: {args.output}", file=sys.stderr)
    else:
        print(output)


if __name__ == '__main__':
    main()
