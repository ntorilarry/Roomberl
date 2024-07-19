import React from 'react'
import RoomData from './components/RoomData'
import ProtectedRoutes from '../../../auth/utils/ProtectedRoutes';

const AllRooms = () => {
  return (
    <div><RoomData/></div>
  )
}

export default ProtectedRoutes(AllRooms, {
  allowedRoles: ["Administrator", "Hotel_manager"],
});
