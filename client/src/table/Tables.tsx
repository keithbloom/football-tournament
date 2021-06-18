import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { useTableData, TableItem } from "./useTableData";

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
        maxWidth: "15px"
    }
  },
  tableRow: {
    "& td": {
      textAlign: "left",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const GroupTableItem = ({
  position,
  teamName,
  playerName,
  points,
  crestUrl,
}: TableItem) => {
  const classes = useStyles();
  return (
    <tr className={classes.tableRow}>
      <td>{position}</td>
      <td>
        <div className={classes.teamBlock}>
          <img height="15px" src={crestUrl} />
          <span>{teamName}</span>
        </div>
      </td>
      <td>
        <strong>{playerName}</strong>
      </td>
      <td>{points}</td>
    </tr>
  );
};

const GroupTable = ({
  group,
  items,
}: {
  group: string;
  items: TableItem[];
}) => {
  const classes = useStyles();
  return (
    <div style={{ maxWidth: "250px" }}>
      <h3>{group}</h3>
      <table className={classes.root}>
        <thead>
          <tr>
            <th style={{ minWidth: "12px", textAlign: "left" }}>Pos</th>
            <th style={{ minWidth: "170px", textAlign: "left" }}>Team</th>
            <th style={{ minWidth: "150px", textAlign: "left" }}>Player</th>
            <th style={{ minWidth: "12px", textAlign: "left" }}>Points</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <GroupTableItem key={i} {...item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Tables = () => {
  const { isLoaded, tableData, errorMessage } = useTableData();
  const classes = useStyles();
  useEffect(() => console.log(tableData), [tableData]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (errorMessage) {
    return <div>Failed :( {errorMessage}</div>;
  }
  return (
    <Grid container spacing={3}>
      {Object.entries(tableData).map(([key, items]) => (
        <Grid key={key} item xs={6}>
          <Paper className={classes.paper}>
            <GroupTable group={key} items={items} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
