// import React, { useState, useEffect } from 'react';
// import slide1 from '../assets/slide1.jpg';
// import slide2 from '../assets/slide2.jpg';
// import slide3 from '../assets/slide3.jpg';

// const images = [slide1, slide2, slide3];

// const Slider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % images.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full mt-2 relative overflow-hidden">
//       <div className="flex transition-transform duration-700 ease-in-out"
//            style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
//         {images.map((src, idx) => (
//           <img
//             key={idx}
//             src={src}
//             alt={`Slide ${idx + 1}`}
//             className="w-screen h-[400px] object-cover flex-shrink-0"
//           />
//         ))}
//       </div>

//       {/* Dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
//         {images.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentSlide(idx)}
//             className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-blue-600' : 'bg-gray-300'}`}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;
