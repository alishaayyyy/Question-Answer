// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../utils/utils.js';
// import { ToastContainer } from 'react-toastify';

import Navbar from "../Components/Navbar.jsx"
import AllQuestions from '../Components/AllQuestions.jsx';
// import Slider from "../Components/Slider.jsx"

function Home() {
    

    return (
        <div>
<Navbar/>
<AllQuestions/>
{/* <Slider/> */}
        </div>
    )
}

export default Home