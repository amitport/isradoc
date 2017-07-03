export class Doctor {
  slug: string;
  title: 'דוקטור' | 'פרופסור';
  firstName: string;
  middleName?: string;
  lastName: string;
  tagline?: string;
  portraitPhotoUrl: string;
  primaryPhoneNumber: string;

  constructor(raw: any) {
    Object.assign(this, raw);
  }

  get listName() {
    return `${this.title} ${this.firstName} ${this.lastName}`;
  }
}

export interface StreetAddress {
  city: string,
  street: string,
}

export interface Practice {
  name: string,
  description: string,
  phones: string[],
  websiteUrl?: string,
  imageUrls?: string[],
  location?: StreetAddress,
}

export interface Speciality {
  name: string,
  category: string,
  description?: string,
}
export interface License {
  issueDate: Date
}
export interface DoctorDetails {
  bio?: string,
  languages?: string[],
  practices?: Practice[],
  specialties: Speciality[],
  license: License
}
