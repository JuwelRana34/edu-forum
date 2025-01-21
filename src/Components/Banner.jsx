import { useState } from "react";
import { CiSearch } from "react-icons/ci";
function Banner({ setSearch }) {
  const [inputValue, setInputValue] = useState("")
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(inputValue);
    }
  };

  const handleSearch = () => {
    setSearch(inputValue); 
  }

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
          <h1 className="mb-5 text-5xl font-bold">Welcome To Edu Forum</h1>
          <p className="mb-5">
            <label className="input bg-white/65  text-gray-900 input-bordered flex items-center gap-2">
              <input
             onChange={(e) =>{ 
              setInputValue(e.target.value)
            }}
             onKeyDown={handleKeyDown}
                type="text"
                name="search"
                className="grow placeholder:text-gray-800"
                placeholder="Search"
              />
              <button  onClick={handleSearch}  className="bg-blue-50 p-2 rounded-md hover:bg-blue-100">
                
              <CiSearch className="text-xl" />
              </button>
            </label>
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default Banner;
