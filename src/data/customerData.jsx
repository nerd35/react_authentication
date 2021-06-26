import firebase from '../helpers/db';
import Customer from '../models/customer';

const firestore = firebase.firestore()

export const getCustomers = async () => {
    try {
        const response = await firestore.collection('customer');
        const data = await response.get();
        let array = [];

        data.forEach(doc => {
            const customer = new Customer(
                doc.id,
                doc.data().firstname,
                doc.data().lastname,
                doc.data().bvn,
                doc.data().phonenumber,
                doc.data().gender,
                doc.data().maritalstatus,
                doc.data().city,
                doc.data().country,

            )
            array.push(customer);
        })
        return array;
    } catch (error) {
        throw error;
    }
}