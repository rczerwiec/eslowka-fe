import React from 'react'
import {features} from "../../../constants"

const Features = () => {
  return (
    <div id="features" className='relative mt-20 border-b obrder-neutral-800 min-h-[800px] font-inter'>
      <div className="text-center">
        <span className='bg-secondarylight text-neutral-800 rounded-full h-6 text-sm px-6 py-4 font-bold uppercase'>
            Funkcje
        </span>
        <h2 className='text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide'>
            Łatwo ucz się 
            <span className='bg-gradient-to-r from-white to-cyan-50 text-transparent bg-clip-text'>
             {" "}nowych słówek
            </span>
            <div className='flex flex-wrap mt-10 lg:mt-20'></div>
        </h2>
      </div>
      <div className="flex flex-wrap mt-10 lg:mt-20">
        {features.map((feature, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
            <div className="flex">
              <div className="flex mx-6 h-10 w-10 p-2 bg-secondarylight text-neutral-800 justify-center items-center rounded-full">
                {feature.icon}
              </div>
              <div>
                <h5 className="mt-1 mb-6 text-xl">{feature.text}</h5>
                <p className="text-md p-2 mb-20 text-neutral-500">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features