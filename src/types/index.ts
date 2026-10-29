export type RecordItem = { id: string; [key: string]: any };

export interface Church {
  id?: string;
  name?: string;
  patronSaint?: string;
  address?: string;
  status?: string;
  history?: string;
  mainPriestId?: string;
  assistantPriests?: string[] | string;
  image?: string;
  secretary?: string;
  coordinates?: { lat?: number; lng?: number } | string;
}

export interface Priest {
  id?: string;
  name?: string;
  birthday?: string;
  firstName?: string;
  lastName?: string;
  ordinationYear?: string | number;
  assignment?: string;
  photo?: string;
  biography?: string;
  status?: string;
}

export interface Bishop {
  id?: string;
  name?: string;
  birthday?: string;
  yearInstalled?: string | number;
  image?: string;
  isCurrent?: boolean;
}

export interface DioceseEvent {
  id?: string;
  title?: string;
  description?: string;
  eventDate?: string;
  eventTime?: string;
  dateExpired?: string;
  endTime?: string;
  image?: string;
}

export interface Announcement {
  id?: string;
  title?: string;
  content?: string;
  publishedDate?: string;
  active?: boolean;
  status?: string;
  createdAt?: string;
}

export interface YearTheme {
  id?: string;
  name?: string;
  title?: string;
  description?: string;
  image?: string;
  isCurrent?: boolean;
}

export interface HeroSlide {
  id?: string;
  title?: string;
  subtitle?: string;
  caption?: string;
  image?: string;
  order?: number;
  active?: boolean;
}

export interface Stream {
  id?: string;
  title?: string;
  url?: string;
  description?: string;
  order?: number;
  active?: boolean;
}

export interface Donation {
  id?: string;
  donorName?: string;
  amount?: string | number;
  date?: string;
  method?: string;
  reference?: string;
  status?: string;
  notes?: string;
}

export type DonationMethodType = 'bank' | 'ewallet' | 'other';

export interface DonationMethod {
  id: string;
  type: DonationMethodType;
  name: string;
  accountName: string;
  accountNumber: string;
  instructions: string;
  description: string;
  qrImage: string;
  icon: string;
  enabled: boolean;
  displayOrder: number;
}

export interface MaintenanceConfig {
  enabled?: boolean;
  message?: string;
  reason?: string;
  startAt?: string;
  endAt?: string;
  contactEmail?: string;
  contactPhone?: string;
  supportLink?: string;
  countdownEnabled?: boolean;
  template?: string;
}

export interface WeatherEventLog {
  id?: string;
  date?: string;
  region?: string;
  eventType?: string;
  severity?: string;
  description?: string;
  createdAt?: string;
}
