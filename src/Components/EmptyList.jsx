import React from 'react'
import animation from './../assets/EmptyList.json'


import Lottie from 'lottie-react'


const EmptyList = () => {



    return (
 <div className="flex justify-center items-center min-h-[300px]">
  <Lottie
    animationData={animation}
    autoplay
    loop: true
    src={animation}
    style={{ height: '50%', width: '50%' }}
  />
</div>

    )
}

export default EmptyList