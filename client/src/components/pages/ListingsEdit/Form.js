import React from "react";
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
      <Dropzone onDrop={handleDrop} />
      <div>
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

      <form onSubmit={handleSubmit}>
        <Input
          fullWidth
          multiline
          value={listing.text}
          name="text"
          onChange={handleTargetChange}
          placeholder="Текст объявления"
        />

        <Input
          fullWidth
          value={listing.email}
          name="email"
          type="email"
          onChange={handleTargetChange}
          placeholder="Email"
        />

        <Input
          fullWidth
          type="tel"
          name="phone"
          value={listing.phone || ""}
          onChange={handleTargetChange}
          placeholder="Phone"
        />

        <div className={classes.root}>
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
        </div>

        <Button type="submit" variant="raised">
          {" "}
          Сохранить{" "}
        </Button>
      </form>
    </Paper>
  );
};

const styles = {
  paper: {
    maxWidth: 700,
    margin: "20px auto",
    padding: 15
  },
  root: {
    maxWidth: 200
  }
};

export default withStyles(styles)(Form);
