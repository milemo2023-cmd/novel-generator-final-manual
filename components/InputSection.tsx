import React from 'react';
import { GeneratorParams, NovelSubGenre, Tone, NovelCategory, NovelLength } from '../types';
import { Scroll, Feather, Sparkles } from 'lucide-react';

interface InputSectionProps {
  params: GeneratorParams;
  setParams: React.Dispatch<React.SetStateAction<GeneratorParams>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ params, setParams, onGenerate, isLoading }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl p-6 shadow-xl sticky top-6">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
        <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400">
            <Scroll size={24} />
        </div>
        <h2 className="text-xl font-bold text-slate-100">小说设定面板</h2>
      </div>

      <div className="space-y-5">
        
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-emerald-400 mb-1">小说类别 (频段)</label>
          <select
            name="category"
            value={params.category}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
          >
            {Object.values(NovelCategory).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Length Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">篇幅 / 字数</label>
          <select
            name="length"
            value={params.length}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
          >
            {Object.values(NovelLength).map((len) => (
              <option key={len} value={len}>{len}</option>
            ))}
          </select>
        </div>

        {/* Genre Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">流派玩法</label>
          <select
            name="subGenre"
            value={params.subGenre}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
          >
            {Object.values(NovelSubGenre).map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">文风基调</label>
          <select
            name="tone"
            value={params.tone}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
          >
            {Object.values(Tone).map((tone) => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
        </div>

        {/* Protagonist Name */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">主角姓名</label>
          <input
            type="text"
            name="protagonistName"
            value={params.protagonistName}
            onChange={handleChange}
            placeholder="留空自动生成"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Gold Finger */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">金手指 (外挂/设定)</label>
          <div className="relative">
             <input
              type="text"
              name="goldFinger"
              value={params.goldFinger}
              onChange={handleChange}
              placeholder="例如：系统、老爷爷、重生..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all pl-10"
            />
            <Sparkles size={16} className="absolute left-3 top-3.5 text-slate-500" />
          </div>
          <p className="text-xs text-slate-500 mt-1">留空则由 AI 自动匹配。</p>
        </div>

        {/* Extra Details */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">补充脑洞 / 特殊要求</label>
          <textarea
            name="extraDetails"
            value={params.extraDetails}
            onChange={handleChange}
            rows={3}
            placeholder="特殊设定？如：'女主是魔尊'、'赛博修仙'..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-white transition-all transform active:scale-95 shadow-lg shadow-emerald-900/20
            ${isLoading 
              ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
            }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              <span>正在推演天机...</span>
            </>
          ) : (
            <>
              <Feather size={18} />
              <span>生成大纲</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;