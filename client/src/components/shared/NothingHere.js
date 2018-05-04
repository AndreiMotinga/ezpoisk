import React from "react";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import { redirect } from "utils";

const NothingHere = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography
          align="center"
          variant="display1"
          className={classes.header}
        >
          Здесь ничего нет
        </Typography>
        <Button
          color="primary"
          onClick={redirect}
          data-path="/listings/new/edit"
          className={classes.button}
        >
          Создать Объявление
        </Button>
      </Paper>
    </div>
  );
};

const styles = {
  root: {
    margin: "0 auto",
    maxWidth: 500
  },

  paper: {
    padding: 20,
    maxWidth: 700
  },

  header: {
    marginBottom: 30
  },

  button: {
    display: "block",
    margin: "0 auto"
  }
};

export default withStyles(styles)(NothingHere);
