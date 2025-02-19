
export default function GamificationAward() {
  // Sample leaderboard data
  const leaderboard = [
    { name: "Alice Johnson", points: 1500, badge: "🥇 Gold" },
    { name: "Bob Smith", points: 1200, badge: "🥈 Silver" },
    { name: "Charlie Davis", points: 1000, badge: "🥉 Bronze" },
    { name: "Diana Clark", points: 900, badge: "🏅 Top Contributor" },
    { name: "Ethan White", points: 850, badge: "🔥 Active Learner" },
  ];

  return (
    <div className="h-auto pb-5  flex flex-col items-center  p-2">

      <div className=" w-full border dark:border-none  bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 md:p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-metal-300 mb-2 mt-2">
          Gamification & Rewards
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
          Earn points, unlock badges, and climb the leaderboard by engaging in the community!
        </p>


        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-200 dark:bg-gray-700 text-gray-800 dark:text-white text-lg">
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-center">Points</th>
                <th className="py-3 px-4 text-right">Badge</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr
                  key={index}
                  className="border-b bg-blue-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4 text-center">{user.points} pts</td>
                  <td className="py-3 px-4 text-right">{user.badge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
