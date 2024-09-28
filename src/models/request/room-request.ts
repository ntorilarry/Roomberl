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
  code: string;
  images: string[];
  floorPlan: string;
  hostel: string;
  roomAmenities: string[];
}

export interface roomAmenityParams {
  body: roomAmenityRequest;
  id: string;
}

export interface roomTypesParams {
  body: roomTypeRequest;
  id: string;
}

export interface paymentRequest {
  firstReceipt: string;
  secondReceipt: string;
  amountPayed: string;
  note: string;
  user: string;
  roomType: string;
}
export interface updatePaymentRequest {
  isVerified: boolean;
}
export interface paymentParams {
  body: updatePaymentRequest;
  id: string;
}

export interface roomDataType {
  name: string;
  description: string;
  images: File[];
  floorPlan: File | null;
  code: string;
  roomType: string;
  hostel: string;
  roomAmenities: string[];
}

export interface UpdateRoomParams {
  id: string;
  body: FormData;
}

export interface lockRoomRequest {
  isLocked: boolean;
}
export interface lockRoomParams {
  id: string;
  body: lockRoomRequest;
}

export interface duplicateRoomParams {
  id: string;
  quantity: number;
}

export interface getRoomParams {
  id: string;
  roomTypeId: string;
  hostelId: string;
  gender: string;
  page: number;
  size: number;
}

export interface getRoomPaymentParams {
  hostelId: string;
  user: string;
  page: number;
  size: number;
}
