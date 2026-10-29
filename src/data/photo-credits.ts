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
  'truck-front': {
    title: 'Tata Truck India',
    author: 'Adrian Sulc',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tata_Truck_India.jpg',
    usedOn: 'Home and Services pages',
  },
  'road-truck': {
    title: 'A white truck drives on a road with an advertisement',
    author: 'Mehan Talukder',
    licence: 'Unsplash License',
    licenceUrl: 'https://unsplash.com/license',
    source: 'Unsplash',
    sourceUrl: 'https://unsplash.com/photos/gYbCzQZgex4',
    usedOn: 'Home and Services pages',
  },
  expressway: {
    title: 'Mumbai-Pune Expressway 3',
    author: 'Nikhil.kawale',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mumbai-Pune_Expressway_3.JPG',
    usedOn: 'Home page',
  },
}

export const photoAlts: Record<PhotoName, string> = {
  'own-trucks': "Two of M J Cargo Movers' own trucks, maroon Ashok Leylands with 'M.J. Cargo Movers' painted on their headboards and marigold garlands across their fronts, parked side by side at dusk",
  'truck-front': 'A decorated Tata truck with a tarpaulin-covered load parked on a roadside',
  'road-truck': 'A small goods truck moving along a city road',
  expressway: 'The Mumbai–Pune Expressway curving towards a tunnel through green hills',
}
