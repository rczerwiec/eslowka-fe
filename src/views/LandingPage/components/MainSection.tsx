import React from 'react'
import video1 from "../../../constants/vid1.mp4"
import video2 from "../../../constants/vid2.mp4"

const MainSection = () => {
  return (
    <div id="main" className="flex flex-col items-center mt-6 lg:mt-10 font-inter">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide font-bold">
            Najlepsza platforma do nauki     <span className='bg-gradient-to-r from-white to-cyan-50 text-transparent bg-clip-text'>
             {" "}słówek online!
            </span>
        </h1>
        <p className='mt-10 text-lg text-center text-neutral-500 max-w-4xl '>
        Twórz własne zbiory słówek i odkrywaj możliwości zaawansowanych narzędzi opartych na sztucznej inteligencji. Ucz się efektywnie, rozwijaj swoje umiejętności i dołącz do społeczności setek zadowolonych użytkowników!
        </p>
        <div className="flex justify-center my-10">
            <a href="/signup" className='bg-gradient-to-r from-secondarylight to-secondary py-3 px-4 rounded-md'>
                Zacznij za darmo!
            </a>
            <a href="#" className='py-3 px-4 mx-3 rounded-md border'>
                Dokumentacja
            </a>
        </div>
        <div className="flex mt-10 justify-center">
            <video autoPlay loop muted className='rounded-lg w-1/2 border border-secondarylight shadow shadow-secondary mx-2 my-4'>
                <source src={video1} type="video/mp4"/>
                Twoja przeglądarka nie wspiera filmów! 
            </video>
            <video autoPlay loop muted className='rounded-lg w-1/2 border border-secondarylight shadow shadow-secondary mx-2 my-4'>
                <source src={video2} type="video/mp4"/>
                Twoja przeglądarka nie wspiera filmów! 
            </video>

        </div>
    </div>
  )
}

export default MainSection
