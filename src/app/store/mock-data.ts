import { Doctor, Practice } from './doctor';

const practices: Practice[] = [{
  name: 'מרכז מומחים שניידר',
  location: {
    city: 'מודיעין',
    textLine: 'מרכז רננים, מכבים-קומת קרקע',
    coordinates: 'https://www.google.com/maps/dir/?api=1&destination=31.889236%2C35.034649'
  },
  phone: '08-6999888',
  fax: '08-6999889',
  email: 'info@schneider-center.co.il',
  open: [{
    days: 'א\'-ה\'',
    hours: '8:00-18:00'
  },
    {
      days: 'ו\'',
      hours: '8:00-13:00'
    }
  ]
}];

export const doctors: Doctor[] = [
  {
    slug: 'אריאלה_פורטנוי_הידש',
    listName: 'ד"ר אריאלה פורטנוי הידש',
    portraitPhotoUrl: 'assets/ariela.jpg',
    tagline: 'רופאת שיניים מומחית לרפואת שיניים לילדים ונוער',
    primaryPhoneNumber: '08-6999888',
    practices: [practices[0], practices[0], practices[0]],
    recommendations: []///{text: 'yeah!'}]
  },
  {
    slug: 'גיא_הידש',
    listName: 'ד"ר גיא הידש',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
    tagline: 'אורולוג בכיר ומומחה באורולגית ילדים',
    primaryPhoneNumber: '02-6778899',
  },
];
