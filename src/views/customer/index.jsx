import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  Container,
  Typography,
  Button,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { ScaleLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { AddCircle, Edit, Delete } from "@material-ui/icons";
import { getCustomers, addCustomer, getCustomer, updateCustomer, deleteCustomer } from "../../data/customerData";
import CustomerDialogBox from "../customerDialogBox";

const Customer = () => {
  const classes = useStyles();
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState(true);
  const [customerId, setCustomerId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [country, setCountry] = useState("");
  const [lastname, setLastname] = useState("");
  const [bvn, setBvn] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [gender, setGender] = useState("Male");
  const [maritalstatus, setMaritalstatus] = useState("Single");
  const [city, setCity] = useState("");

  const changeMode = `
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: blue;
    `;

  const handleClose = () => {
    setOpen(false);
  };

  const handleFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastname = (e) => {
    setLastname(e.target.value);
  };
  const handlePhonenumber = (e) => {
    setPhonenumber(e.target.value);
  };
  const handleBvn = (e) => {
    setBvn(e.target.value);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleMaritalstatus = (e) => {
    setMaritalstatus(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  const addCustomerHandler = async () => {
    try {
      const customer = {
        firstname,
        lastname,
        bvn,
        city,
        country,
        phonenumber,
        gender,
        maritalstatus,
      }
      if (formMode) {
        await addCustomer(customer);
        toast.success('Customer Added Successfully');
        getList();
        setOpen(false);
        setFirstname('');
        setLastname('');
        setBvn('');
        setPhonenumber('');
        setGender('Male');
        setMaritalstatus('Single');
        setCity('');
        setCountry('');
      }else {
        await updateCustomer(customerId, customer)
        toast.success('Customer Updated successfully');
        setFirstname('');
        setLastname('');
        setBvn('');
        setPhonenumber('');
        setGender('Male');
        setMaritalstatus('Single');
        setCity('');
        setCountry('');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  const getOneCustomer = async (id) => {
    try {
      setFormMode(false);
        setCustomerId(id)
      const response = await getCustomer(id);
      setFirstname(response.firstname);
      setLastname(response.lastname);
      setBvn(response.bvn);
      setPhonenumber(response.phonenumber);
      setCity(response.city);
      setCountry(response.country);
      setGender(response.gender);
      setMaritalstatus(response.maritalstatus);
      setOpen(true);
    } catch (error) {
      toast.error(error.message)
    }
  };

  const deleteHandler = async (id) => {
    try {
      await deleteCustomer(id);
      getList();
      toast.success('Customer Deleted Successfully')
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAdd = () => {
      setOpen(true);
      setFormMode(true);
      setFirstname('');
      setLastname('');
      setBvn('');
      setPhonenumber('');
      setGender('Male');
      setMaritalstatus('Single');
      setCity('');
      setCountry('');
  };

  const getList = async () => {
    try {
      setLoading(true);
      const list = await getCustomers();
      setCustomer(list);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <Container className={classes.container}>
        <ToastContainer />
        <TableContainer component={Paper}>
          <Grid container>
            <Grid item xs={8}>
              <Typography
                className={classes.title}
                variant="h6"
                component="div"
              >
                All Customers
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                className={classes.button}
                startIcon={<AddCircle />}
              >
                Add Customer
              </Button>
            </Grid>
          </Grid>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}>Full Name</TableCell>
                <TableCell className={classes.head}>Bvn</TableCell>
                <TableCell className={classes.head}>Phone</TableCell>
                <TableCell className={classes.head}>Gender</TableCell>
                <TableCell className={classes.head}>Marital Status</TableCell>
                <TableCell className={classes.head}>City</TableCell>
                <TableCell className={classes.head}>Country</TableCell>
                <TableCell className={classes.head}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customer.length === 0 ? (
                <TableRow colSpan={7}>
                  <ScaleLoader
                    css={changeMode}
                    size={150}
                    color={"#34c9eb"}
                    loading={loading}
                  />
                </TableRow>
              ) : (
                <>
                  {customer.map((cust) => (
                    <TableRow key={cust.id}>
                      <TableCell>
                        {cust.firstname} {cust.lastname}
                      </TableCell>
                      <TableCell>{cust.bvn}</TableCell>
                      <TableCell>{cust.phonenumber}</TableCell>
                      <TableCell>{cust.gender}</TableCell>
                      <TableCell>{cust.maritalstatus}</TableCell>
                      <TableCell>{cust.city}</TableCell>
                      <TableCell>{cust.country}</TableCell>
                      <TableCell>
                        <IconButton
                          onclick={() => getOneCustomer(cust.id)}
                          color="primary"
                          aria-label="update Customer"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onclick={() => deleteHandler(cust.id)}
                          color="secondary"
                          aria-label="Delete Customer"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomerDialogBox
          open={open}
          close={handleClose}
          formmode={formMode}
          firstname={firstname}
          lastname={lastname}
          phonenumber={phonenumber}
          bvn={bvn}
          gender={gender}
          city={city}
          maritalstatus={maritalstatus}
          country={country}
          changeFirstname={handleFirstname}
          changeLastname={handleLastname}
          changePhonenumber={handlePhonenumber}
          changeBvn={handleBvn}
          changeGender={handleGender}
          changeMaritalstatus={handleMaritalstatus}
          changeCity={handleCity}
          changeCountry={handleCountry}
          addCustomer={addCustomerHandler}
        />
      </Container>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: "40px",
  },
  title: {
    flex: "1 1 100%",
    padding: "20px",
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  button: {
    margin: theme.spacing(1),
    float: "right",
  },
}));

export default Customer;
