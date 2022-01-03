import Grid from "@material-ui/core/Grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

import { useFixtureData, Fixture, TeamPlayer } from "./useFixtureData";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.body2,
  },
  smallCol: {
    padding: "6px 6px 6px 12px",
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
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "centre",
  },
  teamItemAway: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const TeamItem = ({ teamName, playerName, crestUrl }: TeamPlayer) => {
  return (
    <>
      <img alt={`${teamName} flag`} height="15px" src={crestUrl} />
      <span>{teamName}</span>
      <strong>({playerName})</strong>
    </>
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
    <TableRow>
      <TableCell className={classes.smallCol}>{props.matchDateAndTime.toLocaleTimeString()}</TableCell>
      <TableCell className={classes.teamItem}>
        <TeamItem {...props.homeTeam} />
      </TableCell>
      <TableCell className={classes.smallCol}>
        <ScoreItem {...props} />
      </TableCell>
      <TableCell className={classes.teamItemAway}>
        <TeamItem {...props.awayTeam} />
      </TableCell>
    </TableRow>
  );
};

const FixtureList = ({ matches }: { matches: Fixture[] }) => {
  const itemsByDate = matches.reduce<Record<string, Fixture[]>>(
    (acc: Record<string, Fixture[]>, curr: Fixture) => {
      const date = curr.matchDateAndTime.toDateString();
      acc[date] ? (acc[date] = [...acc[date], curr]) : (acc[date] = [curr]);
      return acc;
    },
    {}
  );

  return (
    <List>
      {[...Object.entries(itemsByDate)].map(([key, items]) => (
        <ListItem key={key}>
          <Table>
            <TableBody>
              {items.map((item, index) => (
                <FixtureItem key={index} {...item} />
              ))}
            </TableBody>
            <caption style={{'captionSide': 'top'}}>{key}</caption>
          </Table>
        </ListItem>
      ))}
    </List>
  );
};

export const Fixtures = () => {
  const { isLoaded, fixtureData, errorMessage } = useFixtureData();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (errorMessage) {
    return <div>Failed :( {errorMessage}</div>;
  }
  return (
    <Grid container spacing={3}>
      {Object.entries(fixtureData).map(([key, items]) => (
        <Grid key={key} item xs={12} style={{maxWidth: 'initial'}}>
          {key}
          <FixtureList matches={items} />
        </Grid>
      ))}
    </Grid>
  );
};
