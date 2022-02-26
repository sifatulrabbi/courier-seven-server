export interface ITrackingStep {
  name: string;
  started_at: string;
  completed_at: string;
  is_complete: boolean;
}

export interface ITracking {
  _id?: string;
  parcel_id: string;
  created_at: string;
  hub_id: string;
  rider_id: string;
  steps: ITrackingStep[];
}
