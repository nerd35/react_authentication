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
import { getCustomers } from "../../data/customerData";

const Customer = () => {
  const classes = useStyles();
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);

  const changeMode = `
display: flex;
align-items: center;
justify-content: center;
border-color: blue;
`;

  const getOneCustomer = (id) => {};

  const deleteCustomer = () => {};

  const handleAdd = () => {};

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
                          onclick={() => deleteCustomer(cust.id)}
                          color="primary"
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
