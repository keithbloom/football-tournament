import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { getPlayersTeams, getTeamsAsMap, Team } from "../data/dataProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "260px"
  },
  teamBlock: {
      ...theme.typography.body1,
    minWidth: "100px",
    textAlign: "left",
    marginLeft: "5px",
    '& span': {
        marginLeft: "5px"
    }
  },
}));

const PlayersTeamRow = (props: Partial<Team> | undefined) => {
  const classes = useStyles();
  if (!props) {
    return <div>No team found :( </div>;
  }
  const { name, crestUrl } = props;
  return (
    <div className={classes.teamBlock}>
      <img alt={`${name} flag`}  height="15px" src={crestUrl} />
      <span>{name}</span>
    </div>
  );
};

export const PlayersTeam = ({ id, name }: any) => {
  const classes = useStyles();
  const teamsAsMap = getTeamsAsMap();

  const playerTeams = getPlayersTeams().filter(
    ({ playerId }) => playerId === id
  );
  if (!playerTeams || playerTeams.length === 0) {
    return <div>No teams for {name} :(</div>;
  }
  const teams = playerTeams[0].teamIds.map((id) => teamsAsMap.get(id));
  if (!teams) {
    return <div>No teams for {name} :(</div>;
  }

  return (
    <Paper>
      <h2>{name}</h2>
      <div className={classes.root}>
        {teams.map((props, i) => (
          <PlayersTeamRow key={i} {...props} />
        ))}
      </div>
    </Paper>
  );
};
