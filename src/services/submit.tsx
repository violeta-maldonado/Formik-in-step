// Api key: keyM3vj81hYaEXNnM
// ID database: appcneIDCOwg4M6D1
import React from "react";
import axios from "axios";

// with axios must need to a package
export const dataUser = async(dataUser:any) => {
    try {
        const res = await axios.post('https://airtable.com/appcneIDCOwg4M6D1/FormikData', { 
            insurance: dataUser.insurance, 
            Name: dataUser.name,
            LastName: dataUser.lastName,
            City: dataUser.city,
            Address: dataUser.address,
            Email: dataUser.email,
        });
        console.log('res', res);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}