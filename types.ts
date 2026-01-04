
export type ServiceType = 'Online' | 'Face-to-Face';

export type PhotoSlotKey = 'Front' | 'Side' | 'Side Arm Up' | 'Back' | 'Flex' | 'Lower Body';

export interface PhotoSlot {
  key: PhotoSlotKey;
  url: string;
}

export interface ProgressPhotoSet {
  id: string;
  date: string;
  weekLabel: string;
  photos: PhotoSlot[];
}

export interface ProtocolPlan {
  name: string;
  url: string;
  assignedDate: string;
  type: 'Diet' | 'Training';
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface CheckInResult {
  id: string;
  date: string;
  stats: {
    weight: { current: number; previous: number; trend: 'up' | 'down' | 'stable' };
    apexScore: { current: number; previous: number; trend: 'up' | 'down' | 'stable' };
    rhr: { current: number; previous: number; trend: 'up' | 'down' | 'stable' };
    sessionsUsed: number;
  };
  actionPoints: string[];
  focusMantra: string;
}

// Added CheckInLog interface to support athlete check-in history tracking
export interface CheckInLog {
  id: string;
  date: string;
  weight: number;
  rhr: number;
  swr: number;
  apexScore: number;
  aiFeedback: {
    comparison: string;
    actionPoints: string[];
    focus: string;
  };
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  avatarUrl?: string;
  isCoach: boolean;
  serviceType: ServiceType;
  plan?: string;
  
  // Stats
  currentWeight?: string;
  targetWeight?: string;
  mainGoal?: string;
  apexScore?: string;
  progressHistory: ProgressMetric[];
  photoHistory: ProgressPhotoSet[];
  
  // New Features
  latestCheckIn?: CheckInResult;
  checkInHistory: CheckInLog[]; // Fixed: Added missing checkInHistory property
  messages: Message[];
  unreadCount: number;

  // Protocol Assets
  dietPlan?: ProtocolPlan;
  trainingPlan?: ProtocolPlan;

  // Face-to-Face specific
  sessionBalance: number;
  accountCredit?: number; 
  sessionHistory: SessionLogEntry[];
  bookedDates: BookedSession[];

  // Online specific
  subscriptionStatus: 'Active' | 'Pending' | 'Expired';
  renewalDate?: string;
  startDate?: string;
  daysRemaining?: number;
  paymentStatus: 'Paid' | 'Unpaid' | 'Pending';

  // Management
  transformations: Transformation[];
  assignedExercises: AssignedExercise[];
}

export interface ProgressMetric {
  month: string;
  weight: number;
  apexScore: number;
  rhr: number;
}

export interface Transformation {
  id: string;
  date: string;
  photoUrl: string;
  weight: string;
  notes: string;
}

export interface AssignedExercise {
  exerciseId: string;
  notes: string;
  assignedDate: string;
}

export interface BookedSession {
  id: string;
  date: string;
  time: string;
}

export interface SessionLogEntry {
  id: string;
  date: string;
  sessionNumber: number;
  remainingBalance: number;
  notes: string;
}

export interface Exercise {
  id: string;
  title: string;
  category: 'Upper' | 'Lower' | 'Core' | 'Cardio';
  videoUrl: string;
  thumbnail: string;
  description: string;
}
