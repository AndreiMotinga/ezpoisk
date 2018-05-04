import React from "react";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import Input from "material-ui/Input";
import Button from "material-ui/Button";
import Dropzone from "react-dropzone";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Select from "components/shared/Select";
import CenteredProgress from "components/shared/CenteredProgress";

const Form = ({
  isLoading,
  listing,
  states,
  cities,
  kinds,
  classes,
  handleDrop,
  removePicture,
  handleChange,
  handleSubmit,
  handleTargetChange
}) => {
  if (isLoading) {
    return <CenteredProgress />;
  }

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={16}>
          <TextField
            fullWidth
            multiline
            value={listing.text}
            name="text"
            onChange={handleTargetChange}
            label="Текст объявления"
          />

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              value={listing.email}
              name="email"
              type="email"
              onChange={handleTargetChange}
              label="Email"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="tel"
              name="phone"
              value={listing.phone || ""}
              onChange={handleTargetChange}
              label="Телефон"
            />
          </Grid>

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

        <div className={classes.imagesContainer}>
          <Dropzone onDrop={handleDrop} />
          <div className={classes.images}>
            {listing.pictures.data.map(picture => (
              <img
                alt={listing.text}
                key={picture.id}
                id={picture.id}
                src={picture.attributes.variants.medium}
                onClick={removePicture}
              />
            ))}
          </div>
        </div>

        <div>
          <Button type="submit" variant="raised" className={classes.button}>
            Сохранить
          </Button>
        </div>
      </form>
    </Paper>
  );
};

const styles = {
  root: {
    maxWidth: 200
  },
  paper: {
    maxWidth: 700,
    margin: "20px auto",
    padding: 15
  },
  button: {
    marginTop: 20
  }
};

export default withStyles(styles)(Form);
