import React from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Copy, Check } from 'lucide-react';

interface OutputDisplayProps {
  content: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ content }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!content) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 p-12 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/30">
        <BookOpen size={48} className="mb-4 opacity-50" />
        <h3 className="text-xl font-medium mb-2">无字天书</h3>
        <p className="text-center max-w-sm">
          请在左侧配置你的道途，祈请天道降下大纲。
        </p>
      </div>
    );
  }

  return (
    <div className="relative bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50 border-b border-slate-700">
            <h2 className="font-bold text-lg text-emerald-400 flex items-center gap-2">
                <BookOpen size={20} />
                天道大纲
            </h2>
            <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors border border-slate-700"
            >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? '已复制' : '复制全文'}
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="markdown-body max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm italic">
                — 天机泄露至此，切勿逆天而行 —
            </div>
        </div>
    </div>
  );
};

export default OutputDisplay;