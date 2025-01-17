import React from "react";

function Banner({search}) {
  return (
  
      <div
        className="hero h-[300px] lg:h-[380px] rounded"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/premium-photo/business-entrepreneurship-symposium-speaker-giving-talk-business-meeting_386094-31.jpg?ga=GA1.1.1974322130.1689523785&semt=ais_hybrid)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center rounded">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Search post</h1>
            <p className="mb-5">
              <label className="input bg-white/65  text-gray-900 input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow placeholder:text-gray-800"
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </p>
            {/* <p className="btn btn-primary">Get Started</p> */}
          </div>
        </div>
      </div>

  );
}

export default Banner;
