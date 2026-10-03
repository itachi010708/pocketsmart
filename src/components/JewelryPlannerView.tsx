import React, { useState } from 'react';
import {
  Gem,
  DollarSign,
  Sparkles,
  Upload,
  X,
  ExternalLink,
  Printer,
  RotateCcw,
  CheckCircle2,
  Watch,
  CircleDot,
  Palette,
  Compass,
  Shirt,
  Image as ImageIcon,
} from 'lucide-react';
import { JewelryBudgetInput, JewelryBudgetResult, Currency, User, HistoryRecord } from '../types';
import { generateJewelryRecommendations, saveToHistory } from '../services/apiService';
import { PLATFORM_REGISTRY, formatPrice } from '../utils/linkGenerators';

interface JewelryPlannerViewProps {
  currentUser: User | null;
  currency: Currency;
  onNavigate: (view: string) => void;
  onPlanSaved?: () => void;
}

// Preset outfit images for quick one-click testing
const SAMPLE_OUTFITS = [
  {
    name: 'Casual Blue Shirt (from spec)',
    label: 'Casual Blue Shirt',
    colors: 'Blue & White',
    style: 'Smart Casual',
    dataUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%232563eb"/><circle cx="200" cy="140" r="60" fill="%23fcd34d"/><path d="M120 220 C120 200, 280 200, 280 220 L320 380 L80 380 Z" fill="%231d4ed8"/><path d="M180 220 L200 280 L220 220 Z" fill="%23ffffff"/><text x="200" y="340" fill="%23ffffff" font-family="sans-serif" font-size="18" text-anchor="middle" font-weight="bold">Casual Blue Shirt</text></svg>',
  },
  {
    name: 'Festive Emerald Silk',
    label: 'Emerald Silk Saree',
    colors: 'Emerald Green & Gold',
    style: 'Traditional Festive',
    dataUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23065f46"/><path d="M100 100 L300 100 L350 380 L50 380 Z" fill="%23047857"/><path d="M120 120 L280 120 L300 380 L100 380 Z" stroke="%23fbbf24" stroke-width="8" fill="none"/><text x="200" y="340" fill="%23fbbf24" font-family="sans-serif" font-size="18" text-anchor="middle" font-weight="bold">Festive Emerald &amp; Gold</text></svg>',
  },
  {
    name: 'Black Tie Evening Tux',
    label: 'Black Tuxedo / Gown',
    colors: 'Jet Black & Satin',
    style: 'Black Tie Formal',
    dataUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%230f172a"/><path d="M120 180 L200 320 L280 180 L320 380 L80 380 Z" fill="%231e293b"/><path d="M170 180 L200 240 L230 180 Z" fill="%23ffffff"/><text x="200" y="340" fill="%23ffffff" font-family="sans-serif" font-size="18" text-anchor="middle" font-weight="bold">Formal Black Tie</text></svg>',
  },
];

export const JewelryPlannerView: React.FC<JewelryPlannerViewProps> = ({
  currentUser,
  currency,
  onNavigate,
  onPlanSaved,
}) => {
  const [totalBudget, setTotalBudget] = useState<number>(5000);
  const [occasion, setOccasion] = useState<string>('Birthday');
  const [preferences, setPreferences] = useState<string>(
    'Describe your style preferences, materials, colors, etc.'
  );
  const [outfitImage, setOutfitImage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<JewelryBudgetResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOutfitImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setOutfitImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSaved(false);

    const input: JewelryBudgetInput = {
      total_budget: totalBudget,
      currency,
      occasion,
      preferences: preferences.includes('Describe your style') ? 'Minimalist and complementary' : preferences,
      outfit_image_base64: outfitImage || undefined,
    };

    try {
      const data = await generateJewelryRecommendations(input);
      setResult(data);

      if (currentUser) {
        const historyRecord: HistoryRecord = {
          id: `jewelry-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'jewelry',
          title: 'Jewelry Budget Plan',
          total_budget: data.total_budget,
          remaining_budget: data.remaining_budget,
          currency,
          input_summary: {
            occasion,
            has_image: !!outfitImage,
            preferences: preferences.slice(0, 50),
          },
          result: data,
        };
        await saveToHistory(historyRecord, currentUser.username);
        setIsSaved(true);
        if (onPlanSaved) onPlanSaved();
      }
    } catch (err) {
      console.error('Failed to generate jewelry recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Header Banner matching Page 36 */}
      <div className="bg-[#0f2b48] text-white py-10 px-4 sm:px-6 lg:px-8 text-center border-b border-[#1b3d63]">
        <div className="max-w-4xl mx-auto space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Jewelry Budget Planner
          </h1>
          <p className="text-sm text-slate-200">
            Get AI-powered jewelry recommendations within your budget for any occasion
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {!result ? (
          /* Form matching Page 36 */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-8"
          >
            {/* 1. Budget Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm uppercase tracking-wide">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                  $
                </div>
                <span>Budget Details</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Budget ({currency === 'INR' ? '₹' : '$'})
                </label>
                <div className="relative max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                    {currency === 'INR' ? '₹' : '$'}
                  </div>
                  <input
                    type="number"
                    min="100"
                    required
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>

            {/* 2. Occasion & Preferences */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm uppercase tracking-wide">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                  <Gem className="w-3.5 h-3.5" />
                </div>
                <span>Occasion & Preferences</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  Occasion
                </label>
                <input
                  type="text"
                  required
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  placeholder="Birthday, Wedding, Anniversary, Cocktail..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-blue-600" />
                  Style Preferences
                </label>
                <textarea
                  rows={3}
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="Describe your style preferences, materials, colors (e.g. minimalist sterling silver, rose gold, Kundan, pearl)..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 3. Upload Outfit Image matching Page 36 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm uppercase tracking-wide">
                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs">
                  <Shirt className="w-3.5 h-3.5" />
                </div>
                <span>Upload Outfit Image</span>
              </div>

              {outfitImage ? (
                <div className="relative border-2 border-blue-200 rounded-xl p-4 bg-slate-50 flex flex-col items-center justify-center">
                  <div className="w-48 h-48 rounded-lg overflow-hidden border border-slate-300 bg-white shadow-sm flex items-center justify-center">
                    <img
                      src={outfitImage}
                      alt="Uploaded outfit"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-3 px-3 py-1.5 rounded-md bg-slate-600 hover:bg-slate-700 text-white text-xs font-semibold transition flex items-center gap-1 shadow-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Remove Image</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50/60 hover:bg-slate-50 transition group">
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition mb-2" />
                    <span className="text-xs font-semibold text-slate-700">
                      Click to upload an outfit photo or drag and drop
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5">
                      JPG, PNG, WebP supported for Gemini Multimodal Vision analysis
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {/* One-click Sample Outfits */}
                  <div className="pt-1">
                    <span className="text-xs text-slate-500 block mb-2 font-medium">
                      Or select a sample outfit to test multimodal analysis:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {SAMPLE_OUTFITS.map((sample, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setOutfitImage(sample.dataUrl)}
                          className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md transition flex items-center gap-1.5"
                        >
                          <ImageIcon className="w-3 h-3 text-blue-600" />
                          <span>{sample.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button matching Page 36 */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto min-w-[260px] py-3.5 px-8 rounded-lg bg-[#1e4672] hover:bg-[#163659] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 mx-auto"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Analyzing Outfit & Budget with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Get Recommendations</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Output Recommendations View matching Page 37 */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setResult(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition flex items-center gap-1.5 shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Adjust Inputs
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save
                </button>
                {isSaved && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Saved
                  </span>
                )}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                Your Personalized Jewelry Recommendations
              </h2>
            </div>

            {/* Budget Summary Card matching Page 37 */}
            <div className="bg-[#1e4672] text-white rounded-xl shadow-md p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                    Budget Summary
                  </span>
                  <div className="text-lg font-extrabold text-white">
                    Total Budget: {formatPrice(result.total_budget, currency)}
                  </div>
                </div>
              </div>

              <div className="text-right bg-white/10 px-4 py-2 rounded-lg border border-white/15">
                <span className="text-xs text-emerald-200 block font-medium">Remaining Budget</span>
                <span className="text-lg font-bold text-emerald-300">
                  {formatPrice(result.remaining_budget, currency)}
                </span>
              </div>
            </div>

            {/* Outfit Analysis Card matching Page 37 */}
            {result.outfit_analysis && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center gap-2 font-bold text-slate-800 text-sm">
                  <Shirt className="w-4 h-4 text-purple-600" />
                  <span>Outfit Analysis</span>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900">Colors: </span>
                      <span className="text-slate-600">{result.outfit_analysis.colors}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900">Style: </span>
                      <span className="text-slate-600">{result.outfit_analysis.style}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900">Formality: </span>
                      <span className="text-slate-600">{result.outfit_analysis.formality}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Jewelry Recommendations List matching Page 37 */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="bg-[#1e4672] text-white px-6 py-3 font-bold text-sm flex items-center gap-2">
                <Gem className="w-4 h-4 text-amber-300" />
                <span>Jewelry Recommendations</span>
              </div>

              <div className="divide-y divide-slate-100 p-6 space-y-6">
                {result.jewelry_recommendations.map((item, idx) => (
                  <div key={idx} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-600" />
                        <h4 className="font-bold text-slate-900 text-base capitalize">
                          {item.item_type}
                        </h4>
                      </div>
                      <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1 rounded shadow-xs">
                        {formatPrice(item.estimated_price, currency)}
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed pl-5">
                      <span className="font-semibold text-slate-900">Description: </span>
                      {item.description}
                    </p>

                    <p className="text-xs text-slate-600 pl-5">
                      <span className="font-semibold text-slate-900">Style: </span>
                      {item.style}
                    </p>

                    {/* Shop For This platforms matching Page 37 */}
                    <div className="pl-5 pt-2">
                      <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                        Shop For This:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.shopping_links &&
                          Object.entries(item.shopping_links).map(([platformKey, linkUrl]) => {
                            const meta = PLATFORM_REGISTRY[platformKey];
                            if (!linkUrl) return null;
                            return (
                              <a
                                key={platformKey}
                                href={linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold border transition ${
                                  meta ? meta.badgeBg : 'bg-slate-100 text-slate-800 border-slate-300'
                                }`}
                              >
                                <span>{meta ? meta.badgeText : platformKey}</span>
                                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                              </a>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Styling Tips Box matching Page 37 */}
            {result.styling_tips && result.styling_tips.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="bg-[#1e4672] text-white px-5 py-3 font-bold text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Styling Tips</span>
                </div>
                <div className="p-5 space-y-2.5">
                  {result.styling_tips.map((tip, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
