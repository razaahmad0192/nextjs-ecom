import React from 'react'
import { BsCart2 } from 'react-icons/bs'
const Cart = () => {
    return (
        <button type='button' >
            <BsCart2
                className='text-gray-500 cursor-pointer  hover:text-primary'
                size={25}
            />
        </button>
    )
}

export default Cart
