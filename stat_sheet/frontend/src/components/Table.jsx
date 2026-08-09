import { useEffect, useState } from 'react'

function Table({ selectedPlayer, name }) {
  const [playoffs, setPlayoffs] = useState([])
  const [regular, setRegular] = useState([])
  const [seasonType, setSeasonType] = useState('regular')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/${selectedPlayer}`
        )

        const data = await res.json()

        setPlayoffs(data.playoffs)
        setRegular(data["regular season"])
      } catch (error) {
        console.log('Error fetching players:', error)
      }
    }

    if (selectedPlayer) {
      fetchStats()
      setSeasonType('regular')
    }
  }, [selectedPlayer])

  const seasonData = (seasonType === 'regular' ? regular : playoffs)

  return (
    selectedPlayer ? (
    <div className="mt-8 w-full px-4">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        {name}
      </h2>

      <div className="flex overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
        <button
            onClick={() => setSeasonType('regular')}
            className={`px-4 py-2 font-medium transition ${
            seasonType === 'regular'
                ? 'bg-orange-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
        >
            Regular Season
        </button>

        <button
            onClick={() => setSeasonType('playoffs')}
            className={`px-4 py-2 font-medium transition ${
            seasonType === 'playoffs'
                ? 'bg-orange-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
        >
            Playoffs
        </button>
        </div>

      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-md">
        <table className="min-w-[1400px] w-full text-sm text-gray-700">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                Season
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                Team
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                Age
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                Min
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                GP
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                GS
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                FGA
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                FGM
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                FG%
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                3PA
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                3PM
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                3P%
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                FTA
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                FTM
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                FT%
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                PTS
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                AST
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                REB
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                OREB
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                DREB
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                STL
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                BLK
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                TOV
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                PF
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {seasonData.map((stats, index) => (
              <tr
                key={index}
                className="transition-colors even:bg-gray-50 hover:bg-blue-50"
              >
                <td className="whitespace-nowrap px-4 py-3 text-center font-medium">
                  {stats.SEASON_ID}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-center font-medium">
                  {stats.TEAM_ABBREVIATION}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.PLAYER_AGE}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.MIN.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.GP}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.GS}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.FGA.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.FGM.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.FG_PCT.toLocaleString('en-CA',{style: 'percent', minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.FG3A.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.FG3M.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.FG3_PCT.toLocaleString('en-CA',{style: 'percent', minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.FTA.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.FTM.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.FT_PCT.toLocaleString('en-CA',{style: 'percent', minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center font-medium">
                  {stats.PTS.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.AST.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.REB.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.OREB.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.DREB.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.STL.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.BLK.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.TOV.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>

                <td className="px-4 py-3 text-center">
                  {stats.PF.toLocaleString('en-CA',{minimumFractionDigits: 1})}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ):
  (
    <div className="flex min-w items-center justify-center mt-8">
        <p className="text-center text-xl font-semibold text-gray-500">
            Please search for a player to see stats
        </p>
    </div>
)
  )
}

export default Table

