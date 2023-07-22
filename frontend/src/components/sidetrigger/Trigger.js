import { FaShoppingCart } from 'react-icons/fa'
import './Trigger.scss'

const Trigger = ({ count, setShowCart }) => {
  return (
    <div className='relative'>
      <FaShoppingCart
        className="cursor-pointer border-none bg-transparent hover:scale-110 ease-in duration-300"
        size={20}
        onClick={() => setShowCart(true)}
      />
      {count > 0 && count <= 99 ? (
        <div className='absolute flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-xs top-[-15px] right-[-15px] cursor-pointer sm:w-6 sm:h-6 sm:text-sm' onClick={() => setShowCart(true)}>
          {count}
        </div>
      ) : (
        count > 0 && (
          <div className='absolute flex items-center justify-center w-7 h-7 rounded-full bg-red-500 text-white text-xs top-[-10px] right-[-10px] cursor-pointer sm:w-8 sm:h-8 sm:text-sm' onClick={() => setShowCart(true)}>
            99+
          </div>
        )
      )}
    </div>
  )
}

export default Trigger
