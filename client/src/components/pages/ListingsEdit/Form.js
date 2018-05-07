import React from "react";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import Input from "material-ui/Input";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Select from "components/shared/Select";
import CenteredProgress from "components/shared/CenteredProgress";
import FormImages from "./FormImages";

const Form = ({
  isLoading,
  listing,
  states,
  cities,
  kinds,
  classes,
  handleChange,
  handleSubmit,
  handleTargetChange
}) => {
  if (isLoading) {
    return <CenteredProgress />;
  }

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              margin="normal"
              value={listing.text}
              name="text"
              onChange={handleTargetChange}
              label="Текст объявления"
            />
          </Grid>

          {/* <Grid item xs={12} sm={6}> */}
          {/*   <TextField */}
          {/*     fullWidth */}
          {/*     margin="normal" */}
          {/*     value={listing.email} */}
          {/*     name="email" */}
          {/*     type="email" */}
          {/*     onChange={handleTargetChange} */}
          {/*     label="Email" */}
          {/*   /> */}
          {/* </Grid> */}
          {/*  */}
          {/* <Grid item xs={12} sm={6}> */}
          {/*   <TextField */}
          {/*     fullWidth */}
          {/*     margin="normal" */}
          {/*     type="tel" */}
          {/*     name="phone" */}
          {/*     value={listing.phone || ""} */}
          {/*     onChange={handleTargetChange} */}
          {/*     label="Телефон" */}
          {/*   /> */}
          {/* </Grid> */}

          <Grid item xs={12} sm={4}>
            <Input
              fullWidth
              inputComponent={Select}
              value={listing.kind}
              onChange={handleChange("kind")}
              placeholder="Раздел"
              id="kind"
              inputProps={{
                name: "kind",
                instanceId: "kind",
                simpleValue: true,
                options: kinds
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Input
              fullWidth
              inputComponent={Select}
              value={listing.state}
              onChange={handleChange("state")}
              placeholder="Штат"
              id="state"
              inputProps={{
                name: "state",
                instanceId: "state",
                simpleValue: true,
                options: states
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Input
              fullWidth
              inputComponent={Select}
              value={listing.city}
              onChange={handleChange("city")}
              placeholder="Город"
              id="city"
              inputProps={{
                name: "city",
                instanceId: "city",
                simpleValue: true,
                options: cities
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <FormImages listing={listing} />
        </Grid>

        <div>
          <Button
            type="submit"
            variant="raised"
            color="primary"
            className={classes.submit}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </Paper>
  );
};

const styles = {
  root: {
    maxWidth: 700,
    margin: "20px auto",
    padding: 15
  },
  submit: {
    display: "block",
    margin: "20px auto 0"
  }
};

export default withStyles(styles)(Form);
