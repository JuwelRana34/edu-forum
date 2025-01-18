import { CiSearch } from "react-icons/ci";
function Banner({ setSearch }) {
  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     setSearch(e.target.value);
  //   }
  // };

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
              onBlur={(e)=>setSearch(e.target.value)}
                type="text"
                className="grow placeholder:text-gray-800"
                placeholder="Search"
              />
              <button onClick={(e)=>setSearch(e.target.value)} className="bg-white p-2 rounded-md hover:bg-blue-100">
                
              <CiSearch className="text-xl" />
              </button>
            </label>
          </p>
          {/* <p className="btn btn-primary">Get Started</p> */}
        </div>
      </div>
    </div>
  );
}

export default Banner;
