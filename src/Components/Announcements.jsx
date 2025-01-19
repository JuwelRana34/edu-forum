import useAnnouncementes from "../Hook/useAnnouncementes";

function Announcements() {
  const { announcements } = useAnnouncementes();

  return (
    announcements?.length > 0 && (
      <div>
        <h2 className="text-center text-3xl my-5">Announcements</h2>

        {announcements.map((item) => (
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg border border-gray-200 mb-6">
            <div className="flex items-start p-4">
              <img
                className="w-16 h-16 object-cover rounded-full border border-gray-300"
                src={item.photo}
                alt="Author"
              />
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <span className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>

                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  {item.title}
                </h2>

                <p className="mt-2 text-gray-700">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
}

export default Announcements;
