import React from 'react'

function Aboutus() {
  return (
    <div className='container mx-auto my-5 md:flex gap-2'>
      <div>
        <img className='md:mt-10 shadow-lg rounded-sm' src="https://img.freepik.com/premium-photo/rear-view-audience-speakers-stage-conference-hall-seminar-meeting-business-education-concept_386094-4.jpg?ga=GA1.1.1974322130.1689523785&semt=ais_hybrid" alt="" srcset="" />
      </div>
      <div className='w-full'>
        <h1 className="text-4xl font-bold text-center my-5"> About Us </h1>
        <p className="text-justify mx-auto px-5 md:w-5/6">
        Welcome to Edu Forum, a dynamic online platform dedicated to fostering meaningful discussions, knowledge-sharing, and collaboration among students, educators, and lifelong learners.</p>

        <div className='px-5 md:w-5/6 mx-auto mt-3  '>
          <h2 className="text-3xl font-bold text-start"> Our Mission </h2>
          <p className="text-justify   px-5 md:px-0 ">
          At Edu Forum, we believe that education thrives in an environment where individuals can freely exchange ideas, ask questions, and engage with a community of like-minded learners. Our goal is to provide a supportive and informative space where users can seek guidance, share insights, and grow together.
          </p>
        </div>

        <div className='px-5 md:w-5/6 mx-auto mt-3 '>
          <h2 className="text-3xl font-bold text-start"> What We Offer </h2>
          
          <ul className='list-disc list-inside text-justify px-5 md:px-0 '>
            <li> <span className='font-semibold text-lg'>Interactive Discussions-</span> Engage in subject-specific forums to discuss academic topics, career advice, and educational trends.</li>
            <li> <span className='font-semibold text-lg'>Expert Guidance –</span> Connect with educators, professionals, and experienced peers for mentorship and support.</li>
            <li> <span className='font-semibold text-lg'>Resource Sharing –</span> Access and contribute study materials, research papers, and learning resources.</li>
            <li> <span className='font-semibold text-lg'>Q&A Support –</span> Get answers to your academic and career-related questions from a knowledgeable community.</li>
          </ul>
        </div>

        <div className='px-5 md:w-5/6 mx-auto mt-3  '>
          <h2 className="text-3xl font-bold text-start"> Who We Are </h2>
          <p className="text-justify   px-5 md:px-0 ">
          Edu Forum is built by passionate educators and tech enthusiasts committed to making education accessible and engaging. Whether you're a student looking for help, a teacher eager to share knowledge, or a professional offering insights, our platform welcomes everyone dedicated to learning.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Aboutus