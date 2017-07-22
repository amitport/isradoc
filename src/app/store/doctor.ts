export interface Doctor {
  slug: string;
  listName: string;
  title?: 'דוקטור' | 'פרופסור';
  firstName?: string;
  middleName?: string;
  lastName?: string;
  tagline?: string;
  portraitPhotoUrl?: string;
  primaryPhoneNumber?: string;

  practices?: Practice[];
  recommendations?: Recommendation[];
  //
  // constructor(raw: any) {
  //   Object.assign(this, raw);
  // }
  //
  // get listName() {
  //   return `${this.title} ${this.firstName} ${this.lastName}`;
  // }
}

export interface Recommendation {
  text: string;
}

export interface StreetAddress {
  city: string;
  textLine?: string;
  coordinates?: string;
}

export interface Practice {
  name: string;
  description?: string;
  phone?: string;
  fax?: string;
  email?: string;
  open?: any;
  websiteUrl?: string;
  imageUrls?: string[];
  location?: StreetAddress;
}

export interface Speciality {
  name: string;
  category: string;
  description?: string;
}
export interface License {
  issueDate: Date;
}
export interface DoctorDetails {
  bio?: string;
  languages?: string[];
  practices?: Practice[];
  specialties: Speciality[];
  license: License;
}
