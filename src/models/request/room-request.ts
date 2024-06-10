export interface roomAmenityRequest {
  name: string;
  description: string;
}

export interface roomTypeRequest {
  name: string;
  description: string;
  price: number;
  numOccupancy: number;
  hostel: string;
  roomAmenities: string[];
}

export interface roomRequest {
  name: string;
  description: string;
  roomType: string;
  code:string
  images:string[]
  floorPlan: string,
  hostel: string;
  roomAmenities: string[];
}