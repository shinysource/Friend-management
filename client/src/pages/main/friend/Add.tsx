import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Grid } from '@mui/material'
import PlusOneIcon from '@mui/icons-material/PlusOne'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material'

import CustomButton from 'components/Button/CustomButton'
import FormInput from 'components/Fields/FormInput'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { RootState } from 'store/store'
import { createFriend } from 'store/friend'

import Header from 'layout/Header'

const validationSchema = Yup.object().shape({
  friendname: Yup.string().required('Enter your username'),
  email: Yup.string().required('Enter your Email').email('Enter a valid Email')
})

interface FriendForm {
  friendname: string
  email: string
  gender: string
  age: number
  hobbies: string
  description: string
}

const initialValues: FriendForm = {
  friendname: '',
  email: '',
  gender: '',
  age: 0,
  hobbies: '',
  description: ''
}

const Add = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state.auth)
  const { loading, friends } = useAppSelector(
    (state: RootState) => state.friend
  )

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      formik.setFieldValue('acceptReceive', false)
      dispatch(createFriend(values))
        .unwrap()
        .then((resolve) => {
          toast.success('Friend was added successfully')
          navigate('/friends')
        })
        .catch((error) => {
          toast.error(error.message)
        })
      actions.resetForm()
    }
  })

  const handleChange = () => {}

  return (
    <>
      <Header />
      <Grid
        container
        justifyContent="center"
        spacing={5}
        py={6}
        className="min-h-screen"
      >
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <div className="flex justify-center">
            <p className="font-podium49 text-4xl uppercase text-grey">{`${user.username}`}</p>
            <p className="font-podium49 text-4xl uppercase">'s New Friend</p>
          </div>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit} className="flex justify-center">
            <Grid
              item
              className="lg:!max-w-[1800px]"
              container
              justifyContent="center"
              spacing={2}
              xs={10}
              sm={8}
              md={6}
              lg={4}
            >
              <Grid item container justifyContent="space-between">
                <Grid item xs={4}>
                  <Link to="/friend">
                    <CustomButton
                      type="button"
                      model="primary"
                      variant="contained"
                      label="Back"
                      startIcon={
                        <ArrowBackIosNewIcon
                          sx={{ fontSize: '14px !important' }}
                        />
                      }
                    />
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <CustomButton
                    type="submit"
                    model="primary"
                    variant="contained"
                    label="ADD Friend"
                    loading={loading}
                    startIcon={<PlusOneIcon fontSize="large" />}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  id="friendname"
                  name="friendname"
                  formik={formik}
                  handleChange={formik.handleChange}
                  className="font-inter text-base font-normal"
                  label="Name"
                  placeholder="Name"
                  isHint={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  id="email"
                  type="email"
                  name="email"
                  formik={formik}
                  handleChange={formik.handleChange}
                  className="font-inter text-base font-normal"
                  label="Email"
                  placeholder="Email"
                  isHint={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="gender"
                    row
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  type="number"
                  id="age"
                  name="age"
                  formik={formik}
                  handleChange={formik.handleChange}
                  className="font-inter text-base font-normal"
                  label="Age"
                  placeholder="Age"
                  isHint={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  type="text"
                  id="hobbies"
                  name="hobbies"
                  formik={formik}
                  handleChange={formik.handleChange}
                  className="font-inter text-base font-normal"
                  label="Hobbies"
                  placeholder="Hobbies"
                  isHint={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  type="text"
                  id="description"
                  name="description"
                  formik={formik}
                  handleChange={formik.handleChange}
                  className="font-inter text-base font-normal"
                  label="Description"
                  placeholder="Description"
                  isHint={true}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  )
}

export default Add
