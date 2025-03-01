import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import akpan from "../assets/png/akpan.png";

const AboutProfile = () => {
    const {id} = useParams()
  return (
    <div className='w-full min-h-full lg:px-8 px-5'>
        {/* BACK BUTTON  */}
        <Link to='/about' className='flex items-center gap-3 my-20'>
            <FaArrowLeft  className='w-7 h-7'/>
            Go Back
        </Link>

        {/* PROFILE INFO */}
        <div className='w-full flex flex-col lg:flex-row items-start gap-16 lg:px-8 px-2 my-20'>
            <div className='lg:w-[436px] w-full h-[584px]'>
                <img src={akpan} className='w-full h-full rounded-3xl object-cover aspect-auto'/>
            </div>
            <div className='flex flex-1 flex-col gap-10'>
            <h1 className='text-2xl font-semibold'>Akan Peter Nsek</h1>
            <p>
                Akan Peter Nsek, Managing Director and CEO of Amel International Services Limited (Amel Susan) is a visionary leader driving growth in West Africa's food industry. Amel Susan is the largest indigenous producer of Icing Sugar used in the confectionery industry across West Africa. They are also renowned for their other food and confectionery products, particularly the Custard and Cocoa Powder.
                <br/>
                <br/>
                

                Combining his extensive 15+ years of procurement and supply chain expertise with a deep understanding of international business, Akan has excelled in fostering strategic partnerships and driving operational excellence. With an MSc in International Business Management (IBM) and a Bachelor's degree in Business Administration, along with a host of other professional certifications, he has demonstrated skills in leadership, management, office and admin operations, idea and strategy development, customer service, sales planning, and promotion.
                <br/>
                <br/>

                After a successful career in oil and gas procurement, his strategic shift to food manufacturing has seen Amel Susan become a market leader, setting new standards in the industry for quality and innovation. A strong emphasis on collaboration and sustainability characterises his leadership style. Akan believes in empowering teams, fostering a culture of continuous improvement, and encouraging creative problem-solving to drive business growth.
                <br/>
                <br/>
        
                Akan's strategic vision and ability to anticipate market trends have positioned Amel Susan as a market leader. Under his leadership, Amel International Services Limited has achieved numerous accolades, including excellence in food manufacturing by the International Trade Council at the Go Global Awards. Furthermore, Amel International Services Limited was recognized, as one of Africa's Fastest Growing Companies by The Financial Times and Statista in May 2024.
            </p>
            </div>
        </div>
    </div>
  )
}

export default AboutProfile