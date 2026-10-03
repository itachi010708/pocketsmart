import React, { useState } from 'react';
import {
  PartyPopper,
  Users,
  DollarSign,
  UtensilsCrossed,
  Sparkles,
  Music,
  MapPin,
  ExternalLink,
  Save,
  Printer,
  RotateCcw,
  CheckCircle2,
  Calendar,
  ShieldAlert,
  Info,
  Building,
} from 'lucide-react';
import { PartyBudgetInput, PartyBudgetResult, Currency, User, HistoryRecord } from '../types';
import { generatePartyRecommendations, saveToHistory } from '../services/apiService';
import { PLATFORM_REGISTRY, formatPrice } from '../utils/linkGenerators';

interface PartyPlannerViewProps {
  currentUser: User | null;
  currency: Currency;
  onNavigate: (view: string) => void;
  onPlanSaved?: () => void;
}

export const PartyPlannerView: React.FC<PartyPlannerViewProps> = ({
  currentUser,
  currency,
  onNavigate,
  onPlanSaved,
}) => {
  const [totalBudget, setTotalBudget] = useState<number>(5000);
  const [numGuests, setNumGuests] = useState<number>(3);
  const [partyType, setPartyType] = useState<string>('Wedding');
  const [venueType, setVenueType] = useState<string>('Home');
  const [needsCatering, setNeedsCatering] = useState<boolean>(true);
  const [needsDecoration, setNeedsDecoration] = useState<boolean>(true);
  const [needsEntertainment, setNeedsEntertainment] = useState<boolean>(true);
  const [additionalRequirements, setAdditionalRequirements] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PartyBudgetResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSaved(false);

    const input: PartyBudgetInput = {
      total_budget: totalBudget,
      currency,
      num_guests: numGuests,
      party_type: partyType,
      venue_type: venueType,
      needs_catering: needsCatering,
      needs_decoration: needsDecoration,
      needs_entertainment: needsEntertainment,
      additional_requirements: additionalRequirements,
    };

    try {
      const data = await generatePartyRecommendations(input);
      setResult(data);

      if (currentUser) {
        const historyRecord: HistoryRecord = {
          id: `party-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'party',
          title: `${partyType} Party Budget Plan`,
          total_budget: data.total_budget,
          remaining_budget: data.remaining_budget,
          currency,
          input_summary: {
            party_type: partyType,
            guests: numGuests,
            venue_type: venueType,
            needs: [
              needsCatering ? 'Catering' : null,
              needsDecoration ? 'Decoration' : null,
              needsEntertainment ? 'Entertainment' : null,
            ]
              .filter(Boolean)
              .join(', '),
          },
          result: data,
        };
        await saveToHistory(historyRecord, currentUser.username);
        setIsSaved(true);
        if (onPlanSaved) onPlanSaved();
      }
    } catch (err) {
      console.error('Failed to generate party recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Header Banner matching Page 34 */}
      <div className="bg-[#0f2b48] text-white py-10 px-4 sm:px-6 lg:px-8 text-center border-b border-[#1b3d63]">
        <div className="max-w-4xl mx-auto space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Party Budget Planner
          </h1>
          <p className="text-sm text-slate-200">
            Plan your perfect event with AI-powered budget recommendations
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {!result ? (
          /* Form matching Page 34 */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-8"
          >
            {/* 1. Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm uppercase tracking-wide">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                  $
                </div>
                <span>Basic Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Budget ({currency === 'INR' ? '₹' : '$'})
                  </label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="5000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={numGuests}
                    onChange={(e) => setNumGuests(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="3"
                  />
                </div>
              </div>
            </div>

            {/* 2. Event Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm uppercase tracking-wide">
                <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span>Event Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Party Type
                  </label>
                  <select
                    value={partyType}
                    onChange={(e) => setPartyType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="House Party">House Party</option>
                    <option value="Cocktail Party">Cocktail Party</option>
                    <option value="Baby Shower">Baby Shower</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    Venue Type
                  </label>
                  <select
                    value={venueType}
                    onChange={(e) => setVenueType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Home">Home</option>
                    <option value="Banquet Hall">Banquet Hall</option>
                    <option value="Outdoor Lawn">Outdoor Lawn</option>
                    <option value="Restaurant / Cafe">Restaurant / Cafe</option>
                    <option value="Hotel / Resort">Hotel / Resort</option>
                    <option value="Rooftop">Rooftop Lounge</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Party Needs */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm uppercase tracking-wide">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                </div>
                <span>Party Needs</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                    needsCatering
                      ? 'bg-orange-50 border-orange-300 text-orange-950 font-semibold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={needsCatering}
                    onChange={(e) => setNeedsCatering(e.target.checked)}
                    className="w-4 h-4 text-orange-600 rounded border-slate-300"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs">
                      🍽️
                    </div>
                    <span>Catering</span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                    needsDecoration
                      ? 'bg-pink-50 border-pink-300 text-pink-950 font-semibold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={needsDecoration}
                    onChange={(e) => setNeedsDecoration(e.target.checked)}
                    className="w-4 h-4 text-pink-600 rounded border-slate-300"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs">
                      🎈
                    </div>
                    <span>Decoration</span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                    needsEntertainment
                      ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={needsEntertainment}
                    onChange={(e) => setNeedsEntertainment(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs">
                      🎵
                    </div>
                    <span>Entertainment</span>
                  </div>
                </label>
              </div>
            </div>

            {/* 4. Additional Requirements */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm uppercase tracking-wide">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">
                  <Info className="w-3.5 h-3.5" />
                </div>
                <span>Additional Requirements</span>
              </div>

              <div>
                <textarea
                  rows={3}
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  placeholder="Special requests, themes, dietary restrictions (e.g. vegetarian only, Bollywood music theme, pastel color balloons)..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    <span>Allocating Budget with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Generate Budget Plan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Output Recommendations View matching Page 35 */
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
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1e4672] hover:bg-[#163659] rounded-lg transition flex items-center gap-1.5 shadow-xs"
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

            {/* Title matching Page 35 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Your Party Budget Plan
                  </h2>
                  <div className="text-xl font-bold text-blue-700 mt-1">
                    Budget: {formatPrice(result.total_budget, currency)}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium">
                  <div className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 text-blue-900">
                    Allocated: <span className="font-bold">{formatPrice(result.allocated_budget, currency)}</span>
                  </div>
                  <div className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 text-emerald-900">
                    Remaining: <span className="font-bold">{formatPrice(result.remaining_budget, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Category Breakdown Cards matching Page 35 */}
              <div className="divide-y divide-slate-100 mt-2">
                {result.budget_breakdown.map((category, catIdx) => (
                  <div key={catIdx} className="py-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        <h3 className="font-bold text-slate-900 capitalize text-base">
                          {category.category}
                        </h3>
                      </div>
                      <span className="font-bold text-slate-900 text-sm">
                        {formatPrice(category.allocation, currency)}
                      </span>
                    </div>

                    <div className="space-y-3 pl-4">
                      {category.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <span className="font-semibold text-slate-800">{item.name}</span>
                            <span className="font-medium text-slate-700">
                              {formatPrice(item.estimated_price, currency)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600">{item.description}</p>

                          {/* Direct shop on links matching Page 35 */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[11px] text-slate-500 font-medium">Shop on:</span>
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
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border transition ${
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
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Calculation Summary matching Page 35 */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mt-6 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-semibold">Total Budget</span>
                  <span>{formatPrice(result.total_budget, currency)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-semibold">Allocated</span>
                  <span>{formatPrice(result.allocated_budget, currency)}</span>
                </div>
                <div className="flex items-center justify-between font-bold text-slate-900 border-t border-slate-200 pt-2">
                  <span>Remaining</span>
                  <span className="text-emerald-600">{formatPrice(result.remaining_budget, currency)}</span>
                </div>
              </div>
            </div>

            {/* Venue Suggestions matching Page 35 */}
            {result.venue_suggestions && result.venue_suggestions.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span>Venue Suggestions</span>
                </div>

                <div className="space-y-4">
                  {result.venue_suggestions.map((venue, vIdx) => (
                    <div key={vIdx} className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-sm">{venue.name}</h4>
                        <span className="font-bold text-blue-700 text-sm">
                          {formatPrice(venue.estimated_cost, currency)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 flex flex-wrap gap-4">
                        <span>• Type: {venue.type}</span>
                        <span>• Capacity: {venue.capacity} people</span>
                      </div>
                      {venue.search_links && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-2">
                          <span className="text-[11px] text-slate-500 font-medium">Explore & Book:</span>
                          {Object.entries(venue.search_links).map(([platformKey, linkUrl]) => {
                            const meta = PLATFORM_REGISTRY[platformKey];
                            if (!linkUrl) return null;
                            return (
                              <a
                                key={platformKey}
                                href={linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border transition ${
                                  meta ? meta.badgeBg : 'bg-slate-100 text-slate-800 border-slate-300'
                                }`}
                              >
                                <span>{meta ? meta.badgeText : platformKey}</span>
                                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Suggestions matching Page 35 */}
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
