import React from 'react';
import '../styles/Slider.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import slide1 from '../assets/background2.webp';


const HomeSlider = () => {
  return (
    <>
    {/* <div>
      <h3 className='custom_heading vc_custom_heading p-3'>PrompTales</h3>
      <a className='custom_link' href="Sign Up"></a>
    </div> */}
    
    <div className='home-banner-slider'>     
        <OwlCarousel margin={0} items={1} nav dots autoplay loop>
          <div className='porto-ibanner'>
            <img className="img" src={slide1} alt="Slide 1" />
            <div class="porto-ibanner-desc no-padding d-flex">
              <div class="container">
                <div class="porto-ibanner-container">
                  <div class="porto-ibanner-layer">
                   <h2 class="vc_custom_heading mb-2 align-left">PrompTales</h2>
                    <h4 class="vc_custom_heading ls-120 mb-4 custom-font1 align-left">Where the Stories come alive</h4>
                    <h5 class="vc_custom_heading ls-120 mb-4 custom-font1 align-left">Create your Unique Story!</h5> 
                    <div class="btn-container mb-0 ls-120 text-center green"><a href="/login" class="btn btn-modern btn-xl btn-primary w-100">Create Story</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
         
        </OwlCarousel>  
    </div>  
    </>
  )
}

export default HomeSlider