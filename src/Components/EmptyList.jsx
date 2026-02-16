import React from 'react'
import animation from './../assets/EmptyList.json'


import Lottie from 'lottie-react'


const EmptyList = () => {



    return (
      <div className="flex justify-center items-center min-h-[300px] animate-fade-in">
        <Lottie
          animationData={animation}
          autoplay
          loop={true}
          style={{ height: '60%', width: '60%', maxWidth: '400px' }}
          className="drop-shadow-2xl"
        />
      </div>
    )
}

export default EmptyList