import React, { useState } from 'react';
import {
  Home,
  DollarSign,
  Lamp,
  Wind,
  Armchair,
  Utensils,
  CheckSquare,
  Sparkles,
  ExternalLink,
  Save,
  Printer,
  RotateCcw,
  CheckCircle2,
  Info,
  Layers,
} from 'lucide-react';
import { HomeBudgetInput, HomeBudgetResult, Currency, User, HistoryRecord } from '../types';
import { generateHomeRecommendations, saveToHistory } from '../services/apiService';
import { PLATFORM_REGISTRY, formatPrice } from '../utils/linkGenerators';

interface HomePlannerViewProps {
  currentUser: User | null;
  currency: Currency;
  onNavigate: (view: string) => void;
  onPlanSaved?: () => void;
}

export const HomePlannerView: React.FC<HomePlannerViewProps> = ({
  currentUser,
  currency,
  onNavigate,
  onPlanSaved,
}) => {
  const [totalBudget, setTotalBudget] = useState<number>(5000);
  const [numLights, setNumLights] = useState<number>(5);
  const [numFans, setNumFans] = useState<number>(4);
  const [numFurniture, setNumFurniture] = useState<number>(2);
  const [numDiningTables, setNumDiningTables] = useState<number>(1);
  const [rooms, setRooms] = useState({
    living_room: true,
    kitchen: true,
    bedroom: true,
    bathroom: false,
    balcony: false,
  });
  const [additionalRequirements, setAdditionalRequirements] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<HomeBudgetResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSaved(false);

    const input: HomeBudgetInput = {
      total_budget: totalBudget,
      currency,
      num_lights: numLights,
      num_fans: numFans,
      num_furniture: numFurniture,
      num_dining_tables: numDiningTables,
      rooms,
      additional_requirements: additionalRequirements,
    };

    try {
      const data = await generateHomeRecommendations(input);
      setResult(data);

      // Auto-save to history if user is logged in
      if (currentUser) {
        const historyRecord: HistoryRecord = {
          id: `home-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'home',
          title: 'Home Interior Budget Plan',
          total_budget: data.total_budget,
          remaining_budget: data.remaining_budget,
          currency,
          input_summary: {
            rooms: Object.entries(rooms)
              .filter(([_, v]) => v)
              .map(([k]) => k.replace('_', ' '))
              .join(', '),
            lights: numLights,
            fans: numFans,
            furniture: numFurniture,
            dining: numDiningTables,
          },
          result: data,
        };
        await saveToHistory(historyRecord, currentUser.username);
        setIsSaved(true);
        if (onPlanSaved) onPlanSaved();
      }
    } catch (err) {
      console.error('Failed to generate recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Header Banner matching Page 32 */}
      <div className="bg-[#0f2b48] text-white py-10 px-4 sm:px-6 lg:px-8 text-center border-b border-[#1b3d63]">
        <div className="max-w-4xl mx-auto space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Home Interior Budget Planner
          </h1>
          <p className="text-sm text-slate-200">
            Create a customized budget plan for your dream home interior
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {!result ? (
          /* Form matching Page 32 */
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

            {/* 2. Fixtures & Furniture */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm uppercase tracking-wide">
                <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs">
                  <Lamp className="w-3.5 h-3.5" />
                </div>
                <span>Fixtures & Furniture</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Lamp className="w-3.5 h-3.5 text-blue-600" />
                    Number of Lights/Fixtures
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={numLights}
                    onChange={(e) => setNumLights(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-blue-600" />
                    Number of Ceiling Fans
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={numFans}
                    onChange={(e) => setNumFans(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Armchair className="w-3.5 h-3.5 text-blue-600" />
                    Number of Furniture Pieces
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={numFurniture}
                    onChange={(e) => setNumFurniture(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-blue-600" />
                    Number of Dining Tables
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={numDiningTables}
                    onChange={(e) => setNumDiningTables(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Rooms to Include */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm uppercase tracking-wide">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">
                  <Home className="w-3.5 h-3.5" />
                </div>
                <span>Rooms to Include</span>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rooms.living_room}
                    onChange={(e) => setRooms({ ...rooms, living_room: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span>Living Room</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rooms.kitchen}
                    onChange={(e) => setRooms({ ...rooms, kitchen: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span>Kitchen</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rooms.bedroom}
                    onChange={(e) => setRooms({ ...rooms, bedroom: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span>Bedroom</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rooms.bathroom}
                    onChange={(e) => setRooms({ ...rooms, bathroom: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span>Bathroom</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rooms.balcony}
                    onChange={(e) => setRooms({ ...rooms, balcony: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span>Balcony</span>
                </label>
              </div>
            </div>

            {/* 4. Additional Information */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm uppercase tracking-wide">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs">
                  <Info className="w-3.5 h-3.5" />
                </div>
                <span>Additional Information</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Special Requirements or Preferences
                </label>
                <textarea
                  rows={3}
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  placeholder="Any specific requirements or preferences (e.g. Scandinavian style, wooden finish, warm LED tone, compact space-saving)..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto min-w-[260px] py-3.5 px-8 rounded-lg bg-[#1e4672] hover:bg-[#163659] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 mx-auto"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Analyzing Budget with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Generate Recommendations</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Output Recommendations View matching Page 33 */
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
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save
                </button>
                {isSaved && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Saved to History
                  </span>
                )}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                Your Personalized Budget Plan
              </h2>
            </div>

            {/* Budget Summary Card matching Page 33 */}
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

            {/* Category Tables matching Page 33 */}
            <div className="space-y-6">
              {result.budget_breakdown.map((category, catIdx) => (
                <div
                  key={catIdx}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-600" />
                      <h3 className="font-bold text-slate-900 capitalize text-base">
                        {category.category.replace('_', ' ')}
                      </h3>
                    </div>
                    <div className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                      Allocation: {formatPrice(category.allocation, currency)}
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-100/70 text-slate-600 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4">Item</th>
                          <th className="py-3 px-4">Description</th>
                          <th className="py-3 px-4 text-right">Price</th>
                          <th className="py-3 px-4 text-center">Quantity</th>
                          <th className="py-3 px-4">Shopping Links</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {category.items.map((item, itemIdx) => (
                          <tr key={itemIdx} className="hover:bg-slate-50/50 transition">
                            <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                              {item.name}
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 max-w-xs text-xs">
                              {item.description}
                            </td>
                            <td className="py-3.5 px-4 text-right font-medium text-slate-900 whitespace-nowrap">
                              {formatPrice(item.estimated_price, currency)}
                            </td>
                            <td className="py-3.5 px-4 text-center font-medium text-slate-700 whitespace-nowrap">
                              {item.quantity || 1}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex flex-wrap gap-1.5 items-center">
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
                                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold border transition ${
                                          meta ? meta.badgeBg : 'bg-slate-100 text-slate-800 border-slate-300'
                                        }`}
                                      >
                                        <span>{meta ? meta.badgeText : platformKey}</span>
                                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                                      </a>
                                    );
                                  })}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Suggestions Box matching Page 33 */}
            {result.additional_suggestions && result.additional_suggestions.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="bg-[#1e4672] text-white px-5 py-3 font-bold text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Additional Suggestions</span>
                </div>
                <div className="p-5 space-y-2.5">
                  {result.additional_suggestions.map((suggestion, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span>{suggestion}</span>
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
