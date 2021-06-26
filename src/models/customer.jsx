class Customer {
  constructor(
    id,
    firstname,
    lastname,
    bvn,
    phonenumber,
    gender,
    maritalstatus,
    city,
    country
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.bvn = bvn;
    this.phonenumber = phonenumber;
    this.gender = gender;
    this.maritalstatus = maritalstatus;
    this.city = city;
    this.country = country;
  }
}

export default Customer;
