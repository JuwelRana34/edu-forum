import React from "react";

function Profile({ photo, name, badge, role, createdAt, recentPost }) {
  return (
    <div className=" m-2 md:my-5">
      <h2 className=" text-xl md:text-3xl font-bold capitalize my-5">user Profile</h2>
      <div className="border-2 border-metal-300 rounded-md md:mr-2 p-4">
        <h2 className="h2">basic information</h2>
        <hr />
        {/* profile  */}

        <div className="flex gap-5 items-center py-5">
          <img
            className=" w-20 h-20 object-cover object-center rounded-full ring ring-metal-200"
            src={photo}
            alt=""
            srcset=""
          />
          <div className=" space-y-2">
            <h2 className="flex gap-2 items-center text-2xl font-semibold">
              {name}
              {badge !== "gold" ? (
                <img
                  className="h-7 w-7"
                  src="https://cdn-icons-png.flaticon.com/128/12927/12927172.png"
                  alt=""
                />
              ) : (
                <img
                  className="h-7 w-7"
                  src="https://cdn-icons-png.flaticon.com/128/6369/6369589.png"
                  alt=""
                />
              )}
            </h2>
            <p
              className={` font-semibold ${
                badge === "gold" ? "text-orange-500" : "text-metal-400"
              }`}
            >
              {badge === "gold" ? "Gold" : "General"} Member
            </p>
          </div>
        </div>
        <h2 className="font-semibold text-lg">
          Member since - {new Date(createdAt).toDateString()}
        </h2>
        {role === "user" && (
          <div>
            <h2 className="h2">recent posts: </h2>
            <hr />
            {recentPost.map((post) => {
              return (
                <div key={post._id} className="my-5">
                  <h3>{post.Title}</h3>
                  <p>{post.description}</p>
                  <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
