import { useEffect, useState } from 'react'
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Grid, Container } from '@mui/material'
import PlusOneIcon from '@mui/icons-material/PlusOne'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import { deepOrange, green } from '@mui/material/colors'

import CustomButton from 'components/Button/CustomButton'
import FormInput from 'components/Fields/FormInput'
import FormSelect from 'components/Fields/FormMultiSelect'
import CustomBreadcrumbs from 'components/Breadcrumbs/CustomBreadcrumbs'
import ConfirmDialog from 'components/Dialog/ConfirmDialog'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { RootState } from 'store/store'
import { updateUser, getUser } from 'store/user'

import Header from 'layout/Header'

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Enter your username'),
  email: Yup.string().required('Enter your Email').email('Enter a valid Email'),
  password: Yup.string().required('Enter your password'),
  password_conf: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  )
})

interface userForm {
  id: number
  username: string
  email: string
  password: string
  password_conf: string
}

const Edit = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(false)

  const loaction = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // const { user } = useAppSelector((state: RootState) => state.auth)
  const { user } = useAppSelector((state: RootState) => state.user)
  const { loading, friend } = useAppSelector((state: RootState) => state.friend)

  const pathnames = loaction.pathname.split('/').filter((x) => x)

  useEffect(() => {
    dispatch(getUser(Number(pathnames.at(-1))))
      .unwrap()
      .then((resolve) => {})
      .catch((error) => {
        handleClose()
        toast.error(error.message)
      })
  }, [])

  const initialValues: userForm = {
    id: user.data.id,
    username: user.data.username,
    email: user.data.email,
    password: '',
    password_conf: ''
  }

  const handleConfirmModal = () => {
    setOpen(true)
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      handleConfirmModal()
      if (value) {
        dispatch(updateUser(values))
          .unwrap()
          .then((resolve) => {
            toast.success('User was updateded successfully')
            navigate('/user')
          })
          .catch((error) => {
            toast.error(error.message)
          })
        actions.resetForm()
      } else {
        return
      }
    }
  })

  useEffect(() => {
    formik.setFieldValue('id', user.data.id)
    formik.setFieldValue('username', user.data.username)
    formik.setFieldValue('email', user.data.email)
    formik.setFieldValue('password', '')
    formik.setFieldValue('password_conf', '')
  }, [user.data, formik.setFieldValue])

  const handleClose = (newValue?: boolean) => {
    setOpen(false)

    if (newValue) {
      setValue(newValue)
      formik.handleSubmit()
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Grid container>
          <Grid item py={2}>
            <CustomBreadcrumbs />
          </Grid>
        </Grid>
        <Divider />

        <Grid pt={2}></Grid>
        <Card>
          <CardContent>
            <Grid container py={2} spacing={3}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Avatar
                      alt={user.data.username}
                      src="/broken-image.jpg"
                      sx={{
                        bgcolor: green[500],
                        width: 250,
                        height: 250,
                        fontSize: 200
                      }}
                      className="mx-auto uppercase"
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                xs={12}
                md={8}
                spacing={4}
              >
                <Grid item xs={12}>
                  <div className="flex justify-center">
                    <p className="font-podium49 text-4xl uppercase text-grey">
                      User's
                    </p>
                    <p className="font-podium49 text-4xl uppercase">
                      &nbsp;profile
                    </p>
                  </div>
                </Grid>

                <Grid item xs={10} className="!mx-auto">
                  <form onSubmit={formik.handleSubmit}>
                    <Grid
                      item
                      container
                      justifyContent="center"
                      spacing={2}
                      xs={12}
                    >
                      <Grid item xs={12}>
                        <FormInput
                          id="username"
                          name="username"
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
                        <FormInput
                          type="password"
                          id="password"
                          name="password"
                          formik={formik}
                          handleChange={formik.handleChange}
                          className="font-inter text-base font-normal"
                          label="Password"
                          placeholder="Password"
                          isHint={true}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormInput
                          type="password"
                          id="password_conf"
                          name="password_conf"
                          formik={formik}
                          handleChange={formik.handleChange}
                          className="font-inter text-base font-normal"
                          label="Password confirm"
                          placeholder="Password confirm"
                          isHint={true}
                        />
                      </Grid>

                      <Grid item container justifyContent="space-between">
                        <Grid item xs={4}>
                          <Link to="/user">
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
                            label="Update Profile"
                            loading={loading}
                            startIcon={<PlusOneIcon fontSize="large" />}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
            <ConfirmDialog
              id="add-friend"
              keepMounted
              open={open}
              onClose={handleClose}
              value={value}
            />
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default Edit
