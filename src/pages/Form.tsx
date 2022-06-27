import { Box, Typography, Grid, Paper, MenuItem, FormControl, FormControlLabel, Button } from '@mui/material';
import { Field, useFormikContext, } from 'formik';
import Image from 'next/image';
import { FormikStepper, FormikStep } from '../components/FormikStepper';
import { TextField, Select, Switch } from 'formik-mui';
import * as Yup from "yup";
import { useRouter } from 'next/router';
import { useDispatch } from '../redux/store';
import { dataUserForm, dataPetForm, IDataPetForm, IDataUserForm } from '../redux/slices/data-user';
import { DatePicker, } from 'formik-mui-lab';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useRef } from 'react';
import { SimpleFileUpload } from '../components/button-upload-file';
import {dataUser} from '../services/submit';

interface IAnimalRace {
  title: string;
  id: number;
  value: string;
}
const dogRaces: IAnimalRace[] = [
  {
    id: 1,
    title: "Mongrel",
    value: "Mongrel"
  },
  {
    id: 2,
    title: "Labrador",
    value: "Labrador"
  },
  {
    id: 3,
    title: "Golden retriever",
    value: "Golden retriever"
  },
  {
    id: 4,
    title: "Pastor alemán",
    value: "Pastor alemán"
  },
  {
    id: 5,
    title: "Other",
    value: "Other"
  },
]
const catRaces: IAnimalRace[] = [
  {
    id: 1,
    title: "Mongrel",
    value: "Mongrel"
  },
  {
    id: 2,
    title: "American Bodtail",
    value: "American Bodtail"
  },
  {
    id: 3,
    title: "Balinese",
    value: "Balinese"
  },
  {
    id: 5,
    title: "Other",
    value: "Other"
  },
]
const checkboxOption: IAnimalRace[] = [
  {
    id: 1,
    title: "Is Sterilized",
    value: "Is Sterilized"
  },
  {
    id: 2,
    title: "Has all the vaccines",
    value: "Has all the vaccines"
  },
  {
    id: 3,
    title: "Has some vaccines",
    value: "Has some vaccines"
  },
  {
    id: 4,
    title: "Has a necklace with a plaque",
    value: "Has a necklace with a plaque"
  },
  {
    id: 5,
    title: "Has any disease",
    value: "Has any disease"
  },
  {
    id: 6,
    title: "Is Dewormed",
    value: "Is Dewormed"
  },
]

const FormComp = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const formikRef = useRef(null);

  // Button
  let getBase64 = async (file: File) => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        {/* @ts-ignore */}
        const base64String = reader?.result?.replace('data:', '')?.replace(/^.+,/, '');
        console.log(base64String);
        resolve(base64String)
      };

    });
  };
  const Airtable = require('airtable');
  const base = new Airtable({
    apiKey: "keyM3vj81hYaEXNnM",
  }).base("appcneIDCOwg4M6D1");
  const handleSubmitInformation = (value:any) => {
     base('FormikData').create(
       { Name: value.name, LastName:value.lastName, Insurance: value.insurance, City: value.city, Address: value.address, Email: value.email },
       //@ts-ignore
       function (err:any) {
         if (err) {
           console.error(err);
           return;
         }
       }
     );
  };
  return (
    <Box display="flex" flexDirection="column">
      <FormikStepper
        innerRef={formikRef.current}
        initialValues={{
          insurance: '',
          name: '',
          lastName: '',
          namePet: '',
          city: '',
          address: '',
          pet: '',
          agePet: 0,
          weightPet: 0,
          racePet: '',
          date: new Date(),
          subscript: false,
          checkboxPet: [],
          imagePet: "",
        }}
        onSubmit={async (values) => {
          {/* @ts-ignore */}
          let auxImage: string = await getBase64(values.imagePet)

          const data: IDataUserForm = {
            insurance: values.insurance,
            name: values.name,
            lastName: values.lastName,
            city: values.city,
            address: values.address,
            email: values.email
          };
          const dataPet: IDataPetForm = {
            namepet: values.namePet,
            pet: values.pet,
            agePet: values.agePet,
            weightPet: values.weightPet,
            racePet: values.racePet,
            datepet: values.date,
            selection: values.checkboxPet,
            image: auxImage,
          };
          dispatch(dataUserForm(data))
          dispatch(dataPetForm(dataPet))
          handleSubmitInformation(values)
          // const response = await dataUser({
          //   values
          // });
          router.push('\Result')
        }}

      >
        <Box>
          <Typography
            align='center'
            color='#0C3640'
            sx={{ fontSize: '36px' }}
          >
            Do you have an account?
          </Typography>

          <FormikStep label="Personal Data"
            validationSchema={Yup.object().shape({
              picked: Yup.string()
                .required("Required field")
            })}
          >
            <Box role="group" flexDirection="column"
              sx={{
                alignItems: 'center',
                display: 'flex',
                p: 2,
              }}>
              <Paper elevation={3} >
                <Box height="auto" width="320px" padding="10px" flexDirection="row" display="flex">
                  <Field type="radio" name="picked" value="Yes" />
                  <Typography color='#0C3640' paddingX="10px" sx={{ fontSize: '14px' }}>Yes</Typography>
                </Box>
              </Paper>
              <Box margin="5px" />
              <Paper elevation={3} >
                <Box height="auto" width="320px" padding="10px" flexDirection="row" display="flex">
                  <Field type="radio" name="picked" value="No" />
                  <Typography color='#0C3640' paddingX="10px" sx={{ fontSize: '14px' }}>No</Typography>
                </Box>
              </Paper>
            </Box>
          </FormikStep>
        </Box>
        <FormikStep label="Insurance"
          validationSchema={Yup.object().shape({
            insurance: Yup.string()
              .required("Required field")
          })}>
          <Typography
            align='center'
            color='#0C3640'
            sx={{ fontSize: '36px' }}
          >
            Which insurance do you need?
          </Typography>
          <Grid container spacing={3} marginBottom="10px" marginTop="10px">
            <Grid item xs={6} sm={2.4}>
              <Box role="group" flexDirection="column" display="flex" alignItems="center">
                <Image
                  src={'/static/car-insurance.png'}
                  width={100}
                  height={100}
                  layout="fixed"
                />
                <Typography color='#0C3640' sx={{ fontSize: '14px' }}>Car insurance</Typography>
                <Field type="radio" name="insurance" value="Car-insure" />
              </Box>
            </Grid>
            <Grid item xs={6} sm={2.4}>
              <Box role="group" flexDirection="column" display="flex" alignItems="center">
                <Image
                  src={'/static/family.png'}
                  width={100}
                  height={100}
                  layout="fixed"
                />
                <Typography color='#0C3640' sx={{ fontSize: '14px' }}>Family insurance</Typography>
                <Field type="radio" name="insurance" value="Family-insure" />
              </Box>
            </Grid>
            <Grid item xs={6} sm={2.4}>
              <Box role="group" flexDirection="column" display="flex" alignItems="center">
                <Image
                  src={'/static/pets-allowed.png'}
                  width={100}
                  height={100}
                  layout="fixed"
                />
                <Typography color='#0C3640' sx={{ fontSize: '14px' }}>Pets insurance</Typography>
                <Field type="radio" name="insurance" value="Pets-insure" />
              </Box>
            </Grid>
            <Grid item xs={6} sm={2.4}>
              <Box role="group" flexDirection="column" display="flex" alignItems="center">
                <Image
                  src={'/static/house-insurance.png'}
                  width={100}
                  height={100}
                  layout="fixed"
                />
                <Typography color='#0C3640' sx={{ fontSize: '14px' }}>House insurance</Typography>
                <Field type="radio" name="insurance" value="House-insure" />
              </Box>
            </Grid>
            <Grid item xs={6} sm={2.4}>
              <Box role="group" flexDirection="column" display="flex" alignItems="center">
                <Image
                  src={'/static/rent-insurance.png'}
                  width={100}
                  height={100}
                  layout="fixed"
                />
                <Typography color='#0C3640' sx={{ fontSize: '14px' }}>Rent insurance</Typography>
                <Field type="radio" name="insurance" value="Rent-insure" />
              </Box>
            </Grid>
          </Grid>
        </FormikStep>
        <FormikStep label="User Data"
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .required("Required field")
              .max(20, 'Maximun 20 characters'),
            lastName: Yup.string()
              .required("Required field")
              .max(20, 'Maximun 20 characters'),
            email: Yup.string()
              .required("Required field")
          })}
        >
          <Typography
            align='center'
            color='#0C3640'
            sx={{ fontSize: '30px' }}
          >
            Let's start with a few questions to give you an excellent price.
          </Typography>
          <Box role="group" flexDirection="column"
            sx={{
              alignItems: 'center',
              display: 'flex',
              p: 2,
            }}>
            <Field
              name="name"
              variant="outlined"
              component={TextField}
              label="Name"
            />
            <Box role="group" flexDirection="column"
              sx={{
                m: 2,
              }}>
              <Field
                name="lastName"
                variant="outlined"
                component={TextField}
                label="Last name"
              />
            </Box>
            <Field
              component={TextField}
              name="email"
              type="email"
              label="Email"
            />
          </Box>
        </FormikStep>
        <FormikStep label="Name Pet"
          validationSchema={Yup.object().shape({
            namePet: Yup.string()
              .required("Required field")
              .max(10, 'Maximun 10 characters'),
          })}>
          <Typography
            align='center'
            color='#0C3640'
            sx={{ fontSize: '30px' }}
          >
            What is the name of your pet?
          </Typography>
          <Box role="group" flexDirection="column"
            sx={{
              alignItems: 'center',
              display: 'flex',
              p: 2,
            }}>
            <Field
              name="namePet"
              variant="outlined"
              component={TextField}
              label="Name Pet"
            />
          </Box>
        </FormikStep>
        <FormikStep label="Address"
          validationSchema={Yup.object().shape({
            city: Yup.string()
              .required("Required field")
              .max(10, 'Maximun 10 characters'),
            address: Yup.string()
              .required("Required field")
              .max(20, 'Maximun 20 characters'),
          })}>
          <Typography
            align='center'
            color='#0C3640'
            sx={{ fontSize: '30px' }}
          >
            Where do you and your pet live?
          </Typography>
          <Box role="group" flexDirection="column"
            sx={{
              alignItems: 'center',
              display: 'flex',
              p: 2,
            }}>
            <Field
              name="city"
              variant="outlined"
              component={TextField}
              label="City"
            />
            <Box
              sx={{
                m: 2,
              }}>
              <Field
                name="address"
                variant="outlined"
                component={TextField}
                label="Address"
              />
            </Box>
          </Box>
        </FormikStep>
        <FormikStep label="Pet"
          validationSchema={Yup.object().shape({
            pet: Yup.string()
              .required("Required field")
          })}>
          <Typography
            align='center'
            color='#0C3640'
            sx={{ fontSize: '36px' }}
          >
            Which is your pet?
          </Typography>
          <Box role="group" flexDirection="row" display="flex" justifyContent="center"
          >
            <Box role="group" flexDirection="column" display="flex" alignItems="center" margin="10px">
              <Image
                src={'/static/face cat.png'}
                width={90}
                height={90}
                layout="fixed"
              />
              <Typography color='#0C3640' sx={{ fontSize: '14px' }}>Cat</Typography>
              <Field type="radio" name="pet" value="Cat" />
            </Box>
            <Box role="group" flexDirection="column" display="flex" alignItems="center">
              <Image
                src={'/static/Face dog.png'}
                width={90}
                height={90}
                layout="fixed"
              />
              <Typography color='#0C3640' sx={{ fontSize: '14px' }}>Dog</Typography>
              <Field type="radio" name="pet" value="Dog" />
            </Box>
          </Box>
        </FormikStep>
        <FormikStep label="Data pet"
          validationSchema={Yup.object().shape({
            agePet: Yup.number()
              .required("Required field")
              .max(15, 'Maximun 10')
              .moreThan(0, 'Number greater than zero'),
            weightPet: Yup.number()
              .required("Required field")
              .max(10, 'Maximun 10 characters')
              .moreThan(0, 'Number greater than zero'),
            racePet: Yup.string()
              .required("Required field")
          })}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>

            <Typography
              align='center'
              color='#0C3640'
              sx={{ fontSize: '30px' }}
            >
              Information about your pet
            </Typography>
            <Box role="group" flexDirection="column"
              sx={{
                alignItems: 'center',
                display: 'flex',
                p: 2,
              }}>
              <Box margin={1}>
                <FormControl sx={{ minWidth: 220 }}>
                  <Field
                    component={DatePicker}
                    name="date"
                    label="Birthday Date" />
                </FormControl>
              </Box>
              <Field
                name="agePet"
                variant="outlined"
                component={TextField}
                label="Age (years)"
              />
              <Box margin={2}>
                <Field
                  name="weightPet"
                  variant="outlined"
                  component={TextField}
                  label="Weight Pet (kg)"
                />
              </Box>
              <Box margin={1}>
                <FormControl sx={{ minWidth: 220 }}>
                  <Field
                    component={Select}
                    type="text"
                    label="Select race"
                    name="racePet"
                    inputProps={{ name: 'racePet', id: 'racePet' }}
                  >

                    {
                      true && dogRaces?.map((animalRace) => (
                        <MenuItem value={animalRace.value} key={animalRace.id}>{animalRace.title}</MenuItem>
                      ))
                    }
                    {
                      false && catRaces?.map((animalRace) => (
                        <MenuItem value={animalRace.value } key={animalRace.id}>{animalRace.title}</MenuItem>
                      ))
                    }
                  </Field>
                </FormControl>
              </Box>
            </Box>
          </LocalizationProvider>
        </FormikStep>

        <FormikStep label="More information"
          validationSchema={Yup.object().shape({
            imagePet: Yup.string()
              .required("Required field")
          })}>
          <Typography
            align='center'
            color='#0C3640'
            sx={{ fontSize: '18px' }}
          >
            Select if your pet:
          </Typography>
          <Box flexDirection="column"
            sx={{
              alignItems: 'center',
              display: 'flex',
              p: 2,
            }}>
            <Box>
              {
                checkboxOption?.map((animalRace) => (
                  <Box flexDirection="row" display="flex" key={animalRace.id}>
                    <Field type="checkbox" name="checkboxPet" value={animalRace.value} />
                    <Typography color='#0C3640' paddingX="10px" sx={{ fontSize: '14px' }}>
                      {animalRace.title}
                    </Typography>
                  </Box>
                ))
              }
              <FormControlLabel
                control={
                  <Field component={Switch} type="checkbox" name="subscript" />
                }
                label="Subscribe"
              />
            </Box>
            <Typography
              align='center'
              color='#0C3640'
              sx={{ fontSize: '18px' }}
            >
              Upload a picture of your pet:
            </Typography>
            <Field
              name="imagePet"
              type="file"
              label="Upload image"
              id="contained-button-file"
              style={{ display: 'none' }}
              component={SimpleFileUpload}
              accept={"image/*"}
            />

          </Box>
        </FormikStep>
      </FormikStepper>
    </Box>
  );
}

export default FormComp

