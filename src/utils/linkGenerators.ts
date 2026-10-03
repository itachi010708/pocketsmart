import { ShoppingLinks } from '../types';

export interface PlatformMeta {
  key: string;
  name: string;
  domain: string;
  color: string;
  badgeBg: string;
  badgeText: string;
}

export const PLATFORM_REGISTRY: Record<string, PlatformMeta> = {
  amazon: {
    key: 'amazon',
    name: 'Amazon',
    domain: 'amazon.in',
    color: '#ff9900',
    badgeBg: 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-900',
    badgeText: 'Amazon',
  },
  flipkart: {
    key: 'flipkart',
    name: 'Flipkart',
    domain: 'flipkart.com',
    color: '#2874f0',
    badgeBg: 'bg-blue-100 hover:bg-blue-200 border-blue-300 text-blue-900',
    badgeText: 'Flipkart',
  },
  ikea: {
    key: 'ikea',
    name: 'IKEA',
    domain: 'ikea.com',
    color: '#0058a3',
    badgeBg: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-400 text-blue-900 font-semibold',
    badgeText: 'IKEA',
  },
  myntra: {
    key: 'myntra',
    name: 'Myntra',
    domain: 'myntra.com',
    color: '#ff3f6c',
    badgeBg: 'bg-pink-100 hover:bg-pink-200 border-pink-300 text-pink-900',
    badgeText: 'Myntra',
  },
  ajio: {
    key: 'ajio',
    name: 'Ajio',
    domain: 'ajio.com',
    color: '#2c4152',
    badgeBg: 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800',
    badgeText: 'Ajio',
  },
  swiggy: {
    key: 'swiggy',
    name: 'Swiggy',
    domain: 'swiggy.com',
    color: '#fc8019',
    badgeBg: 'bg-orange-100 hover:bg-orange-200 border-orange-300 text-orange-900',
    badgeText: 'Swiggy',
  },
  zomato: {
    key: 'zomato',
    name: 'Zomato',
    domain: 'zomato.com',
    color: '#cb202d',
    badgeBg: 'bg-red-100 hover:bg-red-200 border-red-300 text-red-900',
    badgeText: 'Zomato',
  },
  bigbasket: {
    key: 'bigbasket',
    name: 'BigBasket',
    domain: 'bigbasket.com',
    color: '#84c225',
    badgeBg: 'bg-emerald-100 hover:bg-emerald-200 border-emerald-300 text-emerald-900',
    badgeText: 'BigBasket',
  },
  bookmyshow: {
    key: 'bookmyshow',
    name: 'BookMyShow',
    domain: 'bookmyshow.com',
    color: '#dc3558',
    badgeBg: 'bg-rose-100 hover:bg-rose-200 border-rose-300 text-rose-900',
    badgeText: 'BookMyShow',
  },
  meesho: {
    key: 'meesho',
    name: 'Meesho',
    domain: 'meesho.com',
    color: '#f43397',
    badgeBg: 'bg-fuchsia-100 hover:bg-fuchsia-200 border-fuchsia-300 text-fuchsia-900',
    badgeText: 'Meesho',
  },
  bluestone: {
    key: 'bluestone',
    name: 'BlueStone',
    domain: 'bluestone.com',
    color: '#5b3256',
    badgeBg: 'bg-purple-100 hover:bg-purple-200 border-purple-300 text-purple-900',
    badgeText: 'BlueStone',
  },
  tanishq: {
    key: 'tanishq',
    name: 'Tanishq',
    domain: 'tanishq.co.in',
    color: '#8c2425',
    badgeBg: 'bg-amber-50 hover:bg-amber-100 border-amber-400 text-amber-950 font-serif',
    badgeText: 'Tanishq',
  },
  caratlane: {
    key: 'caratlane',
    name: 'CaratLane',
    domain: 'caratlane.com',
    color: '#de57e5',
    badgeBg: 'bg-violet-100 hover:bg-violet-200 border-violet-300 text-violet-900',
    badgeText: 'CaratLane',
  },
  melorra: {
    key: 'melorra',
    name: 'Melorra',
    domain: 'melorra.com',
    color: '#f26522',
    badgeBg: 'bg-orange-50 hover:bg-orange-100 border-orange-300 text-orange-800',
    badgeText: 'Melorra',
  },
  google: {
    key: 'google',
    name: 'Google Maps',
    domain: 'google.com/maps',
    color: '#4285f4',
    badgeBg: 'bg-sky-100 hover:bg-sky-200 border-sky-300 text-sky-900',
    badgeText: 'Google Maps',
  },
  booking: {
    key: 'booking',
    name: 'Booking.com',
    domain: 'booking.com',
    color: '#003580',
    badgeBg: 'bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-950',
    badgeText: 'Booking.com',
  },
  makemytrip: {
    key: 'makemytrip',
    name: 'MakeMyTrip',
    domain: 'makemytrip.com',
    color: '#d63b27',
    badgeBg: 'bg-red-50 hover:bg-red-100 border-red-300 text-red-900',
    badgeText: 'MakeMyTrip',
  },
  oyorooms: {
    key: 'oyorooms',
    name: 'OYO Rooms',
    domain: 'oyorooms.com',
    color: '#ee2e24',
    badgeBg: 'bg-rose-50 hover:bg-rose-100 border-rose-300 text-rose-800',
    badgeText: 'OYO Rooms',
  },
  nobroker: {
    key: 'nobroker',
    name: 'NoBroker',
    domain: 'nobroker.in',
    color: '#fd3753',
    badgeBg: 'bg-red-100 hover:bg-red-200 border-red-300 text-red-900',
    badgeText: 'NoBroker',
  },
};

/**
 * Builds standard shopping links for Home interior items based on search terms
 * (Matching Activity 2.2 / Page 12 of spec)
 */
export function buildHomeShoppingLinks(searchTerms: string): ShoppingLinks {
  const q = encodeURIComponent(searchTerms.trim());
  return {
    amazon: `https://www.amazon.in/s?k=${q}`,
    flipkart: `https://www.flipkart.com/search?q=${q}`,
    ikea: `https://www.ikea.com/in/en/search/?q=${q}`,
    myntra: `https://www.myntra.com/search?q=${q}`,
    ajio: `https://www.ajio.com/search/?text=${q}`,
  };
}

/**
 * Builds platform-appropriate links for Party items based on category
 * (Matching Activity 2.2 / Pages 15-16 of spec)
 */
export function buildPartyShoppingLinks(category: string, searchTerms: string): ShoppingLinks {
  const q = encodeURIComponent(searchTerms.trim());
  const cat = category.toLowerCase();
  const links: ShoppingLinks = {};

  if (cat.includes('venue') || cat.includes('hotel') || cat.includes('space')) {
    links.google = `https://www.google.com/search?q=${q}+venues+near+me`;
    links.booking = `https://www.booking.com/search.html?ss=${q}`;
    links.makemytrip = `https://www.makemytrip.com/hotels/hotel-listing/?searchText=${q}`;
    links.oyorooms = `https://www.oyorooms.com/search/?location=${q}`;
    links.nobroker = `https://www.nobroker.in/property/search/?searchTerm=${q}`;
  } else if (cat.includes('catering') || cat.includes('food') || cat.includes('meal')) {
    links.swiggy = `https://www.swiggy.com/search?query=${q}`;
    links.zomato = `https://www.zomato.com/search?q=${q}`;
    links.bigbasket = `https://www.bigbasket.com/ps/?q=${q}`;
    links.amazon = `https://www.amazon.in/s?k=${q}+grocery`;
    links.flipkart = `https://www.flipkart.com/search?q=${q}`;
  } else if (cat.includes('drink') || cat.includes('beverage')) {
    links.swiggy = `https://www.swiggy.com/search?query=${q}`;
    links.zomato = `https://www.zomato.com/search?q=${q}`;
    links.bigbasket = `https://www.bigbasket.com/ps/?q=${q}`;
  } else if (cat.includes('decor') || cat.includes('theme') || cat.includes('balloon') || cat.includes('flower')) {
    links.amazon = `https://www.amazon.in/s?k=${q}`;
    links.flipkart = `https://www.flipkart.com/search?q=${q}`;
    links.meesho = `https://www.meesho.com/search?q=${q}`;
    links.myntra = `https://www.myntra.com/search?q=${q}`;
  } else if (cat.includes('entertainment') || cat.includes('music') || cat.includes('dj') || cat.includes('show')) {
    links.bookmyshow = `https://in.bookmyshow.com/search?q=${q}`;
    links.amazon = `https://www.amazon.in/s?k=${q}`;
    links.flipkart = `https://www.flipkart.com/search?q=${q}`;
  } else if (cat.includes('gift') || cat.includes('favor') || cat.includes('return')) {
    links.amazon = `https://www.amazon.in/s?k=${q}`;
    links.flipkart = `https://www.flipkart.com/search?q=${q}`;
    links.myntra = `https://www.myntra.com/search?q=${q}`;
    links.meesho = `https://www.meesho.com/search?q=${q}`;
  } else {
    links.amazon = `https://www.amazon.in/s?k=${q}`;
    links.flipkart = `https://www.flipkart.com/search?q=${q}`;
    links.google = `https://www.google.com/search?q=${q}`;
  }

  return links;
}

/**
 * Builds jewelry shopping links for top Indian & global jewelry platforms
 * (Matching Activity 2.2 / Page 17 of spec)
 */
export function buildJewelryShoppingLinks(searchTerms: string): ShoppingLinks {
  const q = encodeURIComponent(searchTerms.trim());
  return {
    amazon: `https://www.amazon.in/s?k=${q}`,
    flipkart: `https://www.flipkart.com/search?q=${q}`,
    bluestone: `https://www.bluestone.com/search.html?query=${q}`,
    tanishq: `https://www.tanishq.co.in/search?q=${q}`,
    caratlane: `https://www.caratlane.com/search?q=${q}`,
    melorra: `https://www.melorra.com/search?q=${q}`,
    meesho: `https://www.meesho.com/search?q=${q}`,
  };
}

export function formatPrice(amount: number, currency: 'INR' | 'USD' = 'INR'): string {
  if (currency === 'USD') {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
