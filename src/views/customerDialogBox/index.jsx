import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const customerDialogBox = (props) => {

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={props.open}
      onClose={props.close}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle>Add New Customer</DialogTitle>
      <ValidatorForm onSubmit={props.addCustomer}>
        <DialogContent>
          <Grid spacing={2} container>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="first Name"
                onChange={props.changeFirstname}
                name="firstname"
                value={props.firstname}
                validator={["required"]}
                errorMessage={["This field is required"]}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Last Name"
                onChange={props.changeLastname}
                name="lastname"
                value={props.firstname}
                validator={["required"]}
                errorMessage={["This field is required"]}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Phone Number"
                type="number"
                onChange={props.changePhonenumber}
                name="phonenumber"
                value={props.phonenumber}
                validator={["required"]}
                errorMessage={["This field is required"]}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="BVN"
                type="number"
                onChange={props.changeBvn}
                name="bvn"
                value={props.bvn}
                validator={["required"]}
                errorMessage={["This field is required"]}
                autoComplete="off"
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="City"
                onChange={props.changeCity}
                name="city"
                value={props.city}
                validator={["required"]}
                errorMessage={["This field is required"]}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Country"
                onChange={props.changeCountry}
                name="country"
                value={props.country}
                validator={["required"]}
                errorMessage={["This field is required"]}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={props.gender}
                  onChange={props.changeGender}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Marital Status</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name=""
                  value={props.maritalstatus}
                  onChange={props.changeMaritalstatus}
                >
                  <FormControlLabel
                    value="Single"
                    control={<Radio />}
                    label="Single"
                  />
                  <FormControlLabel
                    value="Married"
                    control={<Radio />}
                    label="Married"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            Add
          </Button>
          <Button onClick={props.close} color="secondary">
            Close
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};

export default customerDialogBox;
