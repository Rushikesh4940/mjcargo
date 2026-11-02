import type { PhotoName } from '../components/Photo'

// Where every third-party photograph on the site comes from. The /credits/
// page is built from this list, so a new stock photo in assets-src/ needs an
// entry here too. None of these show the company's own vehicles; the one
// photograph of its own trucks (own-trucks) is the company's and needs no credit.

export interface PhotoCredit {
  title: string
  author: string
  licence: string
  licenceUrl: string
  source: string
  sourceUrl: string
  usedOn: string
}

export type CreditedPhoto = Exclude<PhotoName, 'own-trucks'>

export const photoCredits: Record<CreditedPhoto, PhotoCredit> = {
  warehouse: {
    title: 'Palletstellingen in een warehouse met framebescherming',
    author: 'Holland Storage Solutions',
    licence: 'CC BY-SA 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Palletstellingen_in_een_warehouse_met_framebescherming.jpg',
    usedOn: 'Home and Services pages (warehousing)',
  },
  'freight-forwarding': {
    title: 'Freight transportation by road on open truck',
    author: 'Sneha G Gupta',
    licence: 'CC BY-SA 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Freight_transportation_by_road_on_open_truck.jpg',
    usedOn: 'Home and Services pages (freight forwarding)',
  },
  expressway: {
    title: 'Mumbai-Pune Expressway 3',
    author: 'Nikhil.kawale',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mumbai-Pune_Expressway_3.JPG',
    usedOn: 'Home page (the office section)',
  },
}

export const photoAlts: Record<PhotoName, string> = {
  'own-trucks': "Two of M J Cargo Movers' own trucks, maroon Ashok Leylands with 'M.J. Cargo Movers' painted on their headboards and marigold garlands across their fronts, parked side by side at dusk",
  warehouse: 'A warehouse aisle between tall pallet racks stacked with cartons',
  'freight-forwarding': 'A loaded flatbed trailer heading away down a four-lane Indian expressway under a grey sky',
  expressway: 'The Mumbai–Pune Expressway curving towards a tunnel through green hills',
}
