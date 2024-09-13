import { LuUserCircle2 } from 'react-icons/lu'

const UserProfileButton = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="text-white">User-1</div>
      <LuUserCircle2 className='w-8 h-8'/>
    </div>
  )
}

export default UserProfileButton