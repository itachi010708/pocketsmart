import React, { useState } from 'react';
import {
  History,
  Home,
  PartyPopper,
  Gem,
  Calendar,
  DollarSign,
  ArrowRight,
  Trash2,
  ExternalLink,
  X,
  Printer,
  Sparkles,
  Tag,
} from 'lucide-react';
import { HistoryRecord, Currency, User } from '../types';
import { deleteHistoryRecord } from '../services/apiService';
import { PLATFORM_REGISTRY, formatPrice } from '../utils/linkGenerators';

interface HistoryViewProps {
  currentUser: User | null;
  history: HistoryRecord[];
  onRefreshHistory: () => void;
  currency: Currency;
  onNavigate: (view: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  currentUser,
  history,
  onRefreshHistory,
  currency,
  onNavigate,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'home' | 'party' | 'jewelry'>('all');
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);

  const filteredHistory = history.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this recommendation from your history?')) {
      await deleteHistoryRecord(id, currentUser?.username || 'sai');
      onRefreshHistory();
      if (selectedRecord?.id === id) {
        setSelectedRecord(null);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Banner matching Page 38 */}
      <div className="bg-[#0f2b48] text-white py-10 px-4 sm:px-6 lg:px-8 text-center border-b border-[#1b3d63]">
        <div className="max-w-4xl mx-auto space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Your Recommendation History
          </h1>
          <p className="text-sm text-slate-200">
            View and manage all your previous budget plans and recommendations
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Recent Recommendations ({filteredHistory.length})
            </h2>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-md transition ${
                filterType === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('home')}
              className={`px-3 py-1.5 rounded-md transition ${
                filterType === 'home'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home Interior
            </button>
            <button
              onClick={() => setFilterType('party')}
              className={`px-3 py-1.5 rounded-md transition ${
                filterType === 'party'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Party Planning
            </button>
            <button
              onClick={() => setFilterType('jewelry')}
              className={`px-3 py-1.5 rounded-md transition ${
                filterType === 'jewelry'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Jewelry
            </button>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">No recommendations found</h3>
              <p className="text-xs text-slate-500 mt-1">
                You haven't generated any budget plans in this category yet.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('home-planner')}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition"
              >
                Plan Home Budget
              </button>
              <button
                onClick={() => onNavigate('party-planner')}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-700 rounded-lg transition"
              >
                Plan Party
              </button>
            </div>
          </div>
        ) : (
          /* Cards Grid matching Page 38 */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredHistory.map((item) => {
              const formattedDate = new Date(item.timestamp).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              });

              const isJewelry = item.type === 'jewelry';
              const isParty = item.type === 'party';
              const isHome = item.type === 'home';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between overflow-hidden relative group"
                >
                  {/* Top Color Accent Line */}
                  <div
                    className={`h-1.5 w-full ${
                      isHome ? 'bg-emerald-500' : isParty ? 'bg-amber-500' : 'bg-pink-500'
                    }`}
                  />

                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-md flex items-center justify-center text-xs ${
                            isHome
                              ? 'bg-emerald-100 text-emerald-700'
                              : isParty
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-pink-100 text-pink-700'
                          }`}
                        >
                          {isHome && <Home className="w-4 h-4" />}
                          {isParty && <PartyPopper className="w-4 h-4" />}
                          {isJewelry && <Gem className="w-4 h-4" />}
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                      </div>
                      <span className="text-[11px] text-slate-500 whitespace-nowrap">
                        {formattedDate}
                      </span>
                    </div>

                    {/* Budget Metrics */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Total Budget</span>
                        <span className="font-bold text-slate-900 text-sm">
                          {formatPrice(item.total_budget, currency)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Remaining</span>
                        <span className="font-bold text-sky-700 text-sm">
                          {formatPrice(item.remaining_budget, currency)}
                        </span>
                      </div>
                    </div>

                    {/* Criteria Details */}
                    <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                      {isJewelry && (
                        <>
                          <div>
                            <span className="font-semibold text-slate-800">Occasion: </span>
                            <span>{item.input_summary?.occasion || 'General'}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-800">With outfit image: </span>
                            <span>{item.input_summary?.has_image ? 'Yes' : 'No'}</span>
                          </div>
                        </>
                      )}

                      {isParty && (
                        <>
                          <div>
                            <span className="font-semibold text-slate-800">Party Type: </span>
                            <span className="capitalize">{item.input_summary?.party_type || 'Event'}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-800">Guests: </span>
                            <span>{item.input_summary?.guests || 1}</span>
                          </div>
                          {item.input_summary?.needs && (
                            <div>
                              <span className="font-semibold text-slate-800">Needs: </span>
                              <span>{item.input_summary.needs}</span>
                            </div>
                          )}
                        </>
                      )}

                      {isHome && (
                        <>
                          {item.input_summary?.rooms && (
                            <div>
                              <span className="font-semibold text-slate-800">Rooms: </span>
                              <span>{item.input_summary.rooms}</span>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
                            <span>Lights: {item.input_summary?.lights || 0}</span>
                            <span>Fans: {item.input_summary?.fans || 0}</span>
                            <span>Furniture: {item.input_summary?.furniture || 0}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {isHome && (
                        <>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-sky-50 text-sky-700 border border-sky-200">
                            lighting
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-sky-50 text-sky-700 border border-sky-200">
                            ceiling_fans
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-sky-50 text-sky-700 border border-sky-200">
                            furniture
                          </span>
                        </>
                      )}
                      {isParty && (
                        <>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                            venue
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                            catering
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                            entertainment
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                            Contingency
                          </span>
                        </>
                      )}
                      {isJewelry && (
                        <>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-pink-50 text-pink-700 border border-pink-200">
                            bracelet
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-pink-50 text-pink-700 border border-pink-200">
                            ring
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-pink-50 text-pink-700 border border-pink-200">
                            watch
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions matching Page 38 */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedRecord(item)}
                      className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>View Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 relative">
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-lg">
                  {selectedRecord.title}
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">
                  {new Date(selectedRecord.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
                  title="Print"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Summary Cards */}
              <div className="bg-[#1e4672] text-white rounded-xl p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-300 block uppercase tracking-wider font-semibold">
                    Total Budget
                  </span>
                  <div className="text-xl font-bold">
                    {formatPrice(selectedRecord.total_budget, currency)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-200 block uppercase tracking-wider font-semibold">
                    Remaining
                  </span>
                  <div className="text-xl font-bold text-emerald-300">
                    {formatPrice(selectedRecord.remaining_budget, currency)}
                  </div>
                </div>
              </div>

              {/* Jewelry Specific Result View */}
              {selectedRecord.type === 'jewelry' && (
                <div className="space-y-4">
                  {/* @ts-ignore */}
                  {selectedRecord.result?.outfit_analysis && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm">
                      <span className="font-bold text-slate-900 block mb-2">Outfit Analysis:</span>
                      {/* @ts-ignore */}
                      <p className="text-slate-600">Colors: {selectedRecord.result.outfit_analysis.colors}</p>
                      {/* @ts-ignore */}
                      <p className="text-slate-600">Style: {selectedRecord.result.outfit_analysis.style}</p>
                    </div>
                  )}

                  {/* @ts-ignore */}
                  <div className="space-y-3">
                    {/* @ts-ignore */}
                    {selectedRecord.result?.jewelry_recommendations?.map((item: any, i: number) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 capitalize">{item.item_type}</h4>
                          <span className="font-bold text-blue-700">{formatPrice(item.estimated_price, currency)}</span>
                        </div>
                        <p className="text-xs text-slate-600">{item.description}</p>
                        {item.shopping_links && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {Object.entries(item.shopping_links).map(([k, url]) => (
                              <a
                                key={k}
                                href={url as string}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
                              >
                                {k}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Home or Party Result View */}
              {(selectedRecord.type === 'home' || selectedRecord.type === 'party') && (
                <div className="space-y-4">
                  {/* @ts-ignore */}
                  {selectedRecord.result?.budget_breakdown?.map((cat: any, i: number) => (
                    <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                      <div className="bg-slate-100 px-4 py-2.5 font-bold text-xs uppercase flex justify-between">
                        <span>{cat.category}</span>
                        <span>{formatPrice(cat.allocation, currency)}</span>
                      </div>
                      <div className="divide-y divide-slate-100 p-4 space-y-3">
                        {cat.items?.map((it: any, j: number) => (
                          <div key={j} className="pt-2 first:pt-0 space-y-1">
                            <div className="flex justify-between text-xs font-semibold">
                              <span>{it.name}</span>
                              <span>{formatPrice(it.estimated_price, currency)}</span>
                            </div>
                            <p className="text-xs text-slate-500">{it.description}</p>
                            {it.shopping_links && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {Object.entries(it.shopping_links).map(([k, url]) => (
                                  <a
                                    key={k}
                                    href={url as string}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
                                  >
                                    {k}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
