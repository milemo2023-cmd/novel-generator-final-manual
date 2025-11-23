import React, { useState } from 'react';
import { GeneratorParams, NovelSubGenre, Tone, NovelCategory, NovelLength } from './types';
import InputSection from './components/InputSection';
import OutputDisplay from './components/OutputDisplay';
import { generateNovelOutline } from './services/geminiService';
import { PenTool } from 'lucide-react';

const App: React.FC = () => {
  const [params, setParams] = useState<GeneratorParams>({
    category: NovelCategory.Male,
    subGenre: NovelSubGenre.Classic,
    tone: Tone.HotBlooded,
    length: NovelLength.Long,
    protagonistName: '',
    goldFinger: '',
    extraDetails: '',
  });

  const [generatedOutline, setGeneratedOutline] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateNovelOutline(params);
      setGeneratedOutline(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2568&auto=format&fit=crop')] bg-cover bg-fixed bg-center">
      <div className="min-h-screen bg-slate-950/90 backdrop-blur-sm">
        
        {/* Navbar */}
        <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-emerald-600 p-1.5 rounded text-white">
                    <PenTool size={20} />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200">
                    道友执笔 <span className="text-slate-500 text-sm font-normal ml-2 hidden sm:inline-block">| 你的网文大纲架构师</span>
                </h1>
            </div>
            <div className="text-xs text-slate-500">
                v1.2 • Gemini 驱动
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-lg flex items-center justify-center">
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Inputs */}
            <div className="lg:col-span-4 xl:col-span-3">
              <InputSection 
                params={params} 
                setParams={setParams}
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
            </div>

            {/* Right Column: Output */}
            <div className="lg:col-span-8 xl:col-span-9 h-[calc(100vh-12rem)] min-h-[500px]">
              <OutputDisplay content={generatedOutline} />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default App;