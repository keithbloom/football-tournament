
import teams from "./teams.json";

export type Team = {
  name: string;
  crestUrl: string;
};

export type Player = {
  name: string;
};

export const getTeams = () => teams;
const teamsMap = new Map<number, Team>();
teams.teams.forEach(({ id, name, crestUrl }) =>
  teamsMap.set(id, { name, crestUrl })
);
export const getTeamsAsMap = () => teamsMap;

export const getPlayers = () => [
  { id: 1, name: "Zach" },
  { id: 2, name: "Benji" },
  { id: 3, name: "Emma" },
  { id: 4, name: "Keith" },
];
const playersMap = new Map<number, Player>();
getPlayers().forEach(({ id, name }) => playersMap.set(id, { name }));
export const getPlayersMap = () => playersMap;

export const getPlayersTeams = () => [
  { playerId: 1, teamIds: [794, 805, 827, 8601, 799, 1977] },
  { playerId: 2, teamIds: [833, 1976, 788, 790, 770, 773] },
  { playerId: 3, teamIds: [782, 8873, 784, 759, 792, 803] },
  { playerId: 4, teamIds: [798, 808, 816, 760, 765, 768] },
];
const teamsForPlayers = new Map<number, string>();
for (const {playerId, teamIds} of getPlayersTeams()) {
    for(const id of teamIds) {
        teamsForPlayers.set(id, playersMap.get(playerId)?.name ?? ':(')
    }
}
export const getTeamsForPlayers = () => teamsForPlayers;