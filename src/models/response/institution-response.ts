interface University {
  id: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
}

interface RoomType {
  id: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
}

export interface institutionResponse {
  universities: University[];
  roomTypes: RoomType[];
}
