import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { toast } from 'react-toastify'

import { Grid, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'

import FormInput from 'components/Fields/FormInput'
import FormCheck from 'components/Fields/FormCheck'
import CustomButton from 'components/Button/CustomButton'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { RootState } from 'store/store'
import { signup } from 'store/auth'

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Enter your username'),
  email: Yup.string().required('Enter your Email').email('Enter a valid Email'),
  acceptReceive: Yup.bool().oneOf(
    [true],
    'Accept the receive from AFL and AFL partners to continue'
  ),
  password: Yup.string().required('Enter your password'),
  password_conf: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  )
})

interface RegisterForm {
  username: string
  email: string
  password: string
  password_conf: string
  acceptReceive: boolean
}

const initialValues: RegisterForm = {
  username: '',
  email: '',
  password: '',
  password_conf: '',
  acceptReceive: false
}

const Signup = () => {
  const { user, loading, checked } = useAppSelector(
    (state: RootState) => state.auth
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      formik.setFieldValue('acceptReceive', false)
      dispatch(signup(values))
        .unwrap()
        .then((resolve) => {
          toast.success(resolve.data.message)
          navigate('/login')
        })
        .catch((error) => {
          toast.error(error.message)
        })
      actions.resetForm()
    }
  })

  useEffect(() => {
    if (checked) {
      navigate('/home')
    }
  }, [checked])

  return (
    <Grid container justifyContent="center" className="signup-back py-9">
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item className="text-[32px] font-bold">
          <div className="font-podium49">SIGN UP</div>
        </Grid>
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
            <Grid item xs={12}>
              <FormInput
                id="username"
                name="username"
                formik={formik}
                handleChange={formik.handleChange}
                className="font-inter text-base font-normal"
                label="Name"
                placeholder="Last name"
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

            <Grid item xs={12}>
              <FormCheck
                name="acceptReceive"
                label={
                  <div className=" text-sm text-grey">
                    <p>
                      I accept all terms and privacy. And I would like to
                      receive Friend Service.
                    </p>
                  </div>
                }
                formik={formik}
                handleChange={formik.handleChange}
                isHint={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton
                type="submit"
                model="primary"
                variant="contained"
                label="SIGN UP"
              />
            </Grid>
            <Grid item xs={12}>
              <Link href="/login">Already have an account? Sign In</Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default Signup
