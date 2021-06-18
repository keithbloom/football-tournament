import { useState, useEffect } from "react";
import { getTeamsForPlayers } from "../data";
const standingsEndpoint = `/api/competitions/EC/standings`;

export type TableItem = {
  position: number;
  teamName: string;
  crestUrl: string;
  playerName: string;
  gamesPlayed: string;
  points: string;
};

type Table = Record<string, TableItem[]>;

const convertDataToTableItem = (data: any): TableItem | undefined => {
  const playersMap = getTeamsForPlayers();
  const playerName = playersMap.get(data.team.id);
  if (!playerName) {
    return undefined;
  }
  return {
    position: data.position,
    crestUrl: data.team.crestUrl,
    gamesPlayed: data.playedGames,
    playerName,
    points: data.points,
    teamName: data.team.name,
  };
};

const convertToTables = (data: any) => {
  let result: Record<string, TableItem[]> = {};
  const { standings } = data;
  for (const { group, table } of standings) {
    result[group] = table.map(convertDataToTableItem);
  }

  return result;
};

export const useTableData = () => {
  const [tableData, setTableData] = useState<Table>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<string | undefined>(undefined);

  useEffect(() => {
    fetch(standingsEndpoint)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setTableData(convertToTables(result));
        },
        (error) => {
          setIsLoaded(true);
          setErrorMessage(error);
        }
      );
  }, []);

  return { tableData, isLoaded, errorMessage };
};
