export interface Organization {
  id: string;
  name: string;
  type: string;
  location: string;
  services: string[];
  activeQueues: number;
  avgWaitTime: string;
  image: string;
}