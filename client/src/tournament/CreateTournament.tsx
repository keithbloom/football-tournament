import { getTeams, getPlayers } from "../data/dataProvider";
import { PlayersTeam } from "../teams";

export const CreateTournament = () => {
  const players = getPlayers();
  const teams = getTeams();

  console.log(
    teams.teams
      .sort((a, b) => (a.name <= b.name ? -1 : 1))
      .map(({ id, name }) => ({ id, name }))
  );
  return (
    <div>
      {players.map(({ id, name }) => (
        <PlayersTeam key={id} id={id} name={name} />
      ))}
    </div>
  );
};
