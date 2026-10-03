import {
  HomeBudgetInput,
  HomeBudgetResult,
  PartyBudgetInput,
  PartyBudgetResult,
  JewelryBudgetInput,
  JewelryBudgetResult,
  HistoryRecord,
  User,
} from '../types';
import {
  buildHomeShoppingLinks,
  buildPartyShoppingLinks,
  buildJewelryShoppingLinks,
} from '../utils/linkGenerators';

export const LOCAL_STORAGE_HISTORY_KEY = 'pocketsmart_history';
export const LOCAL_STORAGE_USER_KEY = 'pocketsmart_user';

export async function generateHomeRecommendations(input: HomeBudgetInput): Promise<HomeBudgetResult> {
  try {
    const res = await fetch('/api/generate-home', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    const data: HomeBudgetResult = await res.json();

    // Augment with rich shopping links for each item (Activity 2.2 / Page 12)
    if (data.budget_breakdown) {
      data.budget_breakdown.forEach((category) => {
        category.items.forEach((item) => {
          if (!item.shopping_links || Object.keys(item.shopping_links).length === 0) {
            item.shopping_links = buildHomeShoppingLinks(item.search_terms || item.name);
          }
        });
      });
    }

    return data;
  } catch (err) {
    console.warn('API error, using local fallback computation:', err);
    return computeFallbackHome(input);
  }
}

export async function generatePartyRecommendations(input: PartyBudgetInput): Promise<PartyBudgetResult> {
  try {
    const res = await fetch('/api/generate-party', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    const data: PartyBudgetResult = await res.json();

    // Augment with rich shopping links for each category & venue (Pages 15-16)
    if (data.budget_breakdown) {
      data.budget_breakdown.forEach((category) => {
        category.items.forEach((item) => {
          if (!item.shopping_links || Object.keys(item.shopping_links).length === 0) {
            item.shopping_links = buildPartyShoppingLinks(category.category, item.search_terms || item.name);
          }
        });
      });
    }

    if (data.venue_suggestions) {
      data.venue_suggestions.forEach((venue) => {
        if (!venue.search_links) {
          venue.search_links = buildPartyShoppingLinks('venue', venue.search_terms || venue.name);
        }
      });
    }

    return data;
  } catch (err) {
    console.warn('API error, using local fallback computation:', err);
    return computeFallbackParty(input);
  }
}

export async function generateJewelryRecommendations(input: JewelryBudgetInput): Promise<JewelryBudgetResult> {
  try {
    const res = await fetch('/api/generate-jewelry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    const data: JewelryBudgetResult = await res.json();

    // Augment with jewelry shopping links (Page 17)
    if (data.jewelry_recommendations) {
      data.jewelry_recommendations.forEach((item) => {
        if (!item.shopping_links || Object.keys(item.shopping_links).length === 0) {
          item.shopping_links = buildJewelryShoppingLinks(item.search_terms || `${item.item_type} ${item.style}`);
        }
      });
    }

    return data;
  } catch (err) {
    console.warn('API error, using local fallback computation:', err);
    return computeFallbackJewelry(input);
  }
}

// -------------------------------------------------------------
// History Management
// -------------------------------------------------------------
export async function fetchUserHistory(username = 'sai'): Promise<HistoryRecord[]> {
  try {
    const res = await fetch(`/api/history?username=${encodeURIComponent(username)}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.history) && data.history.length > 0) {
        return data.history;
      }
    }
  } catch {
    // ignore
  }

  // LocalStorage fallback
  const local = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      // ignore
    }
  }

  return [];
}

export async function saveToHistory(record: HistoryRecord, username = 'sai'): Promise<void> {
  try {
    await fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, record }),
    });
  } catch {
    // ignore
  }

  // Always sync to local storage as well
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
    const list: HistoryRecord[] = local ? JSON.parse(local) : [];
    list.unshift(record);
    localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export async function deleteHistoryRecord(id: string, username = 'sai'): Promise<void> {
  try {
    await fetch(`/api/history/${id}?username=${encodeURIComponent(username)}`, {
      method: 'DELETE',
    });
  } catch {
    // ignore
  }

  try {
    const local = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
    if (local) {
      const list: HistoryRecord[] = JSON.parse(local);
      const updated = list.filter((item) => item.id !== id);
      localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
    }
  } catch {
    // ignore
  }
}

// -------------------------------------------------------------
// Client Fallbacks in case server is unavailable
// -------------------------------------------------------------
function computeFallbackHome(input: HomeBudgetInput): HomeBudgetResult {
  const b = input.total_budget || 5000;
  const numLights = input.num_lights || 5;
  const numFans = input.num_fans || 4;
  const numFurn = input.num_furniture || 2;
  const numDining = input.num_dining_tables || 1;

  const lightingAlloc = Math.round(b * 0.25);
  const fanAlloc = Math.round(b * 0.35);
  const furnAlloc = Math.round(b * 0.25);
  const diningAlloc = Math.round(b * 0.10);
  const remaining = Math.max(0, b - (lightingAlloc + fanAlloc + furnAlloc + diningAlloc));

  const result: HomeBudgetResult = {
    total_budget: b,
    allocated_budget: b - remaining,
    remaining_budget: remaining,
    budget_breakdown: [
      {
        category: 'Lighting',
        allocation: lightingAlloc,
        items: [
          {
            name: 'LED Bulb (Warm White)',
            description: 'Energy-efficient LED bulbs for ambient & room illumination.',
            estimated_price: Math.round(lightingAlloc / numLights),
            quantity: numLights,
            search_terms: 'Philips Warm White LED bulb pack',
            shopping_links: buildHomeShoppingLinks('Philips Warm White LED bulb pack'),
          },
        ],
      },
      {
        category: 'Ceiling_fans',
        allocation: fanAlloc,
        items: [
          {
            name: 'Havells / Crompton Ceiling Fan',
            description: 'Basic, functional 1200mm high-efficiency ceiling fan.',
            estimated_price: Math.round(fanAlloc / numFans),
            quantity: numFans,
            search_terms: 'Havells 1200mm ceiling fan',
            shopping_links: buildHomeShoppingLinks('Havells 1200mm ceiling fan'),
          },
        ],
      },
      {
        category: 'Furniture',
        allocation: furnAlloc,
        items: [
          {
            name: 'Plastic / Wood Accent Chairs',
            description: 'Stackable modern chairs for kitchen or living room.',
            estimated_price: Math.round(furnAlloc / (numFurn || 1)),
            quantity: numFurn,
            search_terms: 'stackable plastic chairs modern',
            shopping_links: buildHomeShoppingLinks('stackable plastic chairs modern'),
          },
        ],
      },
      {
        category: 'Dining',
        allocation: diningAlloc,
        items: [
          {
            name: 'Small Wooden Table',
            description: 'Simple wooden table for dining or side table.',
            estimated_price: Math.round(diningAlloc / (numDining || 1)),
            quantity: numDining,
            search_terms: 'IKEA compact wooden dining table',
            shopping_links: buildHomeShoppingLinks('IKEA compact wooden dining table'),
          },
        ],
      },
    ],
    calculation_table: [
      { category: 'Lighting', items_count: numLights, total_cost: lightingAlloc, percentage_of_budget: Math.round((lightingAlloc / b) * 100) },
      { category: 'Ceiling Fans', items_count: numFans, total_cost: fanAlloc, percentage_of_budget: Math.round((fanAlloc / b) * 100) },
      { category: 'Furniture', items_count: numFurn, total_cost: furnAlloc, percentage_of_budget: Math.round((furnAlloc / b) * 100) },
      { category: 'Dining Table', items_count: numDining, total_cost: diningAlloc, percentage_of_budget: Math.round((diningAlloc / b) * 100) },
    ],
    additional_suggestions: [
      'Consider purchasing used furniture for further cost savings.',
      'Look for sales and discounts on online marketplaces (Amazon, Flipkart, IKEA).',
      'Prioritize essential items and postpone non-essential purchases.',
    ],
  };

  return result;
}

function computeFallbackParty(input: PartyBudgetInput): PartyBudgetResult {
  const b = input.total_budget || 5000;
  const isHome = (input.venue_type || 'Home').toLowerCase().includes('home');
  const venueCost = isHome ? 0 : Math.round(b * 0.25);
  const foodCost = input.needs_catering !== false ? Math.round(b * 0.40) : 0;
  const decorCost = input.needs_decoration !== false ? Math.round(b * 0.15) : 0;
  const entCost = input.needs_entertainment !== false ? Math.round(b * 0.10) : 0;
  const contingency = Math.round(b * 0.08);
  const allocated = venueCost + foodCost + decorCost + entCost + contingency;
  const remaining = Math.max(0, b - allocated);

  return {
    total_budget: b,
    allocated_budget: allocated,
    remaining_budget: remaining,
    budget_breakdown: [
      {
        category: 'venue',
        allocation: venueCost,
        items: [
          {
            name: isHome ? 'Home' : `${input.venue_type} Booking`,
            description: isHome ? 'Utilizing the home as the venue.' : `Event space reserved for ${input.num_guests} guests.`,
            estimated_price: venueCost,
            search_terms: isHome ? 'home event setup' : `${input.venue_type} venue booking`,
            shopping_links: buildPartyShoppingLinks('venue', input.venue_type || 'Home'),
          },
        ],
      },
      {
        category: 'catering',
        allocation: foodCost,
        items: [
          {
            name: 'Home cooked meal / Catered Platters',
            description: `Simple gourmet meal package curated for ${input.num_guests} people.`,
            estimated_price: foodCost,
            search_terms: 'party food platter Swiggy Zomato',
            shopping_links: buildPartyShoppingLinks('catering', 'party catering food platter'),
          },
        ],
      },
      {
        category: 'entertainment',
        allocation: entCost,
        items: [
          {
            name: 'Streaming service subscription',
            description: 'One-time streaming pass for party music and entertainment.',
            estimated_price: Math.round(entCost * 0.25),
            search_terms: 'music streaming pass party',
            shopping_links: buildPartyShoppingLinks('entertainment', 'music streaming subscription'),
          },
          {
            name: 'Board games/cards',
            description: 'Set of interactive card games and trivia.',
            estimated_price: Math.round(entCost * 0.25),
            search_terms: 'board games party cards',
            shopping_links: buildPartyShoppingLinks('entertainment', 'board games party pack'),
          },
          {
            name: 'Small gift for couple / host',
            description: 'A small token of celebration or party favors.',
            estimated_price: Math.round(entCost * 0.50),
            search_terms: 'celebration gift hamper',
            shopping_links: buildPartyShoppingLinks('gifts', 'celebration gift hamper'),
          },
        ],
      },
      {
        category: 'decoration',
        allocation: decorCost,
        items: [
          {
            name: 'Celebration Themed Decor Kit',
            description: 'Balloons, banners, fairy lights, and table centerpiece.',
            estimated_price: decorCost,
            search_terms: `${input.party_type} celebration decoration kit`,
            shopping_links: buildPartyShoppingLinks('decoration', `${input.party_type} celebration decoration kit`),
          },
        ],
      },
      {
        category: 'contingency',
        allocation: contingency,
        items: [
          {
            name: 'Unexpected expenses',
            description: 'Buffer for extra drinks, ice, or last minute items.',
            estimated_price: contingency,
            search_terms: 'party backup supplies',
            shopping_links: buildPartyShoppingLinks('catering', 'party snacks drinks'),
          },
        ],
      },
    ],
    venue_suggestions: [
      {
        name: isHome ? 'Home' : `${input.party_type} Venue`,
        type: isHome ? 'Residential' : input.venue_type,
        capacity: input.num_guests + 4,
        estimated_cost: venueCost,
        search_terms: `${input.venue_type} celebration space`,
        search_links: buildPartyShoppingLinks('venue', input.venue_type || 'Home'),
      },
    ],
    calculation_table_inr: [
      { category: 'Venue', items_count: 1, total_cost: venueCost, percentage_of_budget: Math.round((venueCost / b) * 100) },
      { category: 'Catering', items_count: 1, total_cost: foodCost, percentage_of_budget: Math.round((foodCost / b) * 100) },
      { category: 'Entertainment', items_count: 3, total_cost: entCost, percentage_of_budget: Math.round((entCost / b) * 100) },
      { category: 'Decoration', items_count: 1, total_cost: decorCost, percentage_of_budget: Math.round((decorCost / b) * 100) },
      { category: 'Contingency', items_count: 1, total_cost: contingency, percentage_of_budget: Math.round((contingency / b) * 100) },
    ],
    additional_suggestions: [
      'Consider making the meal a potluck style if comfortable with guests to reduce catering costs.',
      'Look for discounts or offers on streaming services or board games.',
      'Homemade decorations can be a cost-effective alternative if you decide to add some.',
    ],
  };
}

function computeFallbackJewelry(input: JewelryBudgetInput): JewelryBudgetResult {
  const b = input.total_budget || 5000;
  const braceletCost = Math.round(b * 0.15);
  const ringCost = Math.round(b * 0.18);
  const watchCost = Math.round(b * 0.50);
  const allocated = braceletCost + ringCost + watchCost;
  const remaining = Math.max(0, b - allocated);

  return {
    total_budget: b,
    allocated_budget: allocated,
    remaining_budget: remaining,
    outfit_analysis: {
      colors: input.outfit_image_base64 ? 'Blue, White' : 'Navy, Neutral Ivory',
      style: 'Casual / Semi-Formal',
      formality: 'Informal',
    },
    jewelry_recommendations: [
      {
        item_type: 'Bracelet',
        description: 'A simple braided leather bracelet with metal accents. This complements the casual style of the outfit without being overly flashy.',
        style: 'Casual',
        estimated_price: braceletCost,
        search_terms: 'braided leather bracelet with silver accents',
        shopping_links: buildJewelryShoppingLinks('braided leather bracelet silver'),
      },
      {
        item_type: 'Ring',
        description: 'A silver or dark grey metal ring with a minimalist design. Avoid anything too large or ostentatious to maintain the casual feel.',
        style: 'Minimalist',
        estimated_price: ringCost,
        search_terms: 'minimalist silver dark grey band ring',
        shopping_links: buildJewelryShoppingLinks('minimalist silver dark grey band ring'),
      },
      {
        item_type: 'Watch',
        description: 'A classic, simple watch with a leather or metal band. A darker band would complement the shirt’s colors.',
        style: 'Classic',
        estimated_price: watchCost,
        search_terms: 'classic analog watch dark leather strap',
        shopping_links: buildJewelryShoppingLinks('classic analog watch dark leather strap'),
      },
    ],
    styling_tips: [
      'Keep the jewelry minimal to match the casual style of the outfit.',
      'Consider the watch as a statement piece, choosing a design that reflects personal style.',
      'Ensure the metal tones of the ring and bracelet (if metal accents are chosen) complement each other.',
    ],
  };
}
