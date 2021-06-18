import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { useTableData, TableItem } from "./useTableData";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.body2,
    minWidth: 700,
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
  gamesPlayed,
}: TableItem) => {
  const classes = useStyles();
  return (
    <TableRow className={classes.tableRow}>
      <TableCell>{position}</TableCell>
      <TableCell>
        <div className={classes.teamBlock}>
          <img alt={`${teamName} flag`} height="15px" src={crestUrl} />
          <span>{teamName}</span>
        </div>
      </TableCell>
      <TableCell>
        <strong>{playerName}</strong>
      </TableCell>
      <TableCell>{gamesPlayed}</TableCell>
      <TableCell>{points}</TableCell>
    </TableRow>
  );
};

/**
 * 
 * @param param0 <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 * @returns 
 */

const GroupTable = ({
  group,
  items,
}: {
  group: string;
  items: TableItem[];
}) => {
  const classes = useStyles();
  return (
    <div>
      <h3>{group}</h3>
      <TableContainer component={Paper}>
        <Table className={classes.root} size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: "12px", textAlign: "left" }}>
                Pos
              </TableCell>
              <TableCell style={{ minWidth: "170px", textAlign: "left" }}>
                Team
              </TableCell>
              <TableCell style={{ minWidth: "150px", textAlign: "left" }}>
                Player
              </TableCell>
              <TableCell style={{ minWidth: "12px", textAlign: "left" }}>
                Played
              </TableCell>
              <TableCell style={{ minWidth: "12px", textAlign: "left" }}>
                Points
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, i) => (
              <GroupTableItem key={i} {...item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
        <Grid key={key} item xs={12}>
          <Paper className={classes.paper}>
            <GroupTable group={key} items={items} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
