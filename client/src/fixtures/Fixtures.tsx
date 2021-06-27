import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import {
  useFixtureData,
  Fixture,
  TeamPlayer,
} from "./useFixtureData";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.body2,
  },
  teamBlock: {
    ...theme.typography.body1,
    minWidth: "100px",
    textAlign: "left",
    marginLeft: "5px",
    "& span": {
      marginLeft: "5px",
    },
    "& img": {
      maxWidth: "15px",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  teamItem: {
    display: "flex",
    justifyContent: "center",
  },
}));

const TeamItem = ({ teamName, playerName, crestUrl }: TeamPlayer) => {
  const classes = useStyles();
  return (
    <div className={classes.teamBlock}>
      <img alt={`${teamName} flag`} height="15px" src={crestUrl} />
      <span>{teamName}</span>
      <strong>({playerName})</strong>
    </div>
  );
};

const ScoreItem = (props: Fixture) =>
  props.result === undefined ? (
    <div> -v- </div>
  ) : (
    <div>
      {props.result.homeTeamGoals!} - {props.result.awayTeamGoals}
    </div>
  );

const FixtureItem = (props: Fixture) => {
  const classes = useStyles();
  return (
    <>
      <div>{props.matchDateAndTime}</div>
      <div className={classes.teamItem}>
        <TeamItem {...props.homeTeam} />
        <ScoreItem {...props} />
        <TeamItem {...props.awayTeam} />
      </div>
    </>
  );
};

export const Fixtures = () => {
  const { isLoaded, fixtureData, errorMessage } = useFixtureData();
  useEffect(() => console.log(fixtureData), [fixtureData]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (errorMessage) {
    return <div>Failed :( {errorMessage}</div>;
  }
  return (
    <Grid container spacing={3}>
      {Object.entries(fixtureData).map(([key, items]) => (
        <Grid key={key} item xs={12}>
          {key}
          {items.map((x, i) => (
            <FixtureItem key={i} {...x} />
          ))}
        </Grid>
      ))}
    </Grid>
  );
};
