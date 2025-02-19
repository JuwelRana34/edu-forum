
export default function Learningpath() {

  const learningPaths = [
    {
      title: "Web Development",
      level: "Beginner",
      description: "Learn HTML, CSS, JavaScript, and build your first website.",
      icon: "🌐",
    },
    {
      title: "Data Science",
      level: "Intermediate",
      description: "Explore Python, Pandas, Machine Learning, and Data Visualization.",
      icon: "📊",
    },
    {
      title: "Cybersecurity",
      level: "Advanced",
      description: "Master ethical hacking, cryptography, and network security.",
      icon: "🔐",
    },
    {
      title: "AI & Machine Learning",
      level: "Expert",
      description: "Deep dive into Neural Networks, NLP, and AI-driven applications.",
      icon: "🤖",
    },
  ];

  return (
    <div >
      <div className="  flex flex-col items-center justify-center p-2">
        
       

        {/* Learning Paths Section */}
        <div className="border dark:border-none w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-2">
            Learning Paths
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
            Choose a curated study plan based on your skill level and interest.
          </p>

          {/* Learning Paths Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {learningPaths.map((path, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 dark:bg-gray-700 p-4 rounded-lg shadow hover:scale-105 transition-transform"
              >
                <div className="text-4xl">{path.icon}</div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{path.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{path.level}</p>
                  <p className="text-gray-700 dark:text-gray-300">{path.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
