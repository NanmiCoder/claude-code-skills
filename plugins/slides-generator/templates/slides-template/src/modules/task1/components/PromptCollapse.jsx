import { useState } from 'react';
import { ChevronDown, ChevronUp, FileCode, Copy, Check } from 'lucide-react';
import { GlassCard } from '@/components';

export const PromptCollapse = ({
  prompt,
  defaultExpanded = true,
  maxHeight,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(prompt.fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassCard
      glow="accent"
      className={`flex flex-col overflow-hidden ${className}`}
      style={maxHeight ? { maxHeight, height: maxHeight } : undefined}
    >
      {/* 头部：可点击展开/折叠 */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 cursor-pointer flex items-center justify-between hover:bg-black/[0.02] transition-colors flex-shrink-0"
      >
        <div className="flex items-center gap-4">
          <div className="bg-accent-100/10 p-2.5 rounded-lg">
            <FileCode className="text-accent-100 w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-text-100 text-lg">{prompt.title}</h4>
            <p className="text-text-200 text-sm mt-0.5">{prompt.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-black/5 transition-colors text-text-200 hover:text-accent-100"
            title="复制完整提示词"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
          <div className="text-text-200">
            {isExpanded ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </div>
        </div>
      </div>

      {/* 预览内容（折叠时显示） */}
      {!isExpanded && (
        <div className="px-5 pb-5 flex-1 min-h-0">
          <div className="bg-bg-200 rounded-xl p-4 font-mono text-sm text-text-200 h-full overflow-hidden">
            <pre className="whitespace-pre-wrap line-clamp-6">{prompt.preview}</pre>
            <div className="mt-2 text-accent-100 text-xs flex items-center gap-1">
              <span>点击展开查看完整提示词</span>
              <span className="text-text-200/50">({prompt.lines} 行)</span>
            </div>
          </div>
        </div>
      )}

      {/* 完整内容（展开时显示） */}
      {isExpanded && (
        <div className="px-5 pb-5 flex-1 min-h-0 overflow-hidden">
          <div className="bg-bg-200 rounded-xl p-4 font-mono text-xs text-text-200 h-full overflow-y-auto">
            <pre className="whitespace-pre-wrap">{prompt.fullContent}</pre>
          </div>
        </div>
      )}
    </GlassCard>
  );
};
