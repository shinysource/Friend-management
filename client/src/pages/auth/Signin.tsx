import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Grid } from '@mui/material'
import { toast } from 'react-toastify'
import VpnKeyOffIcon from '@mui/icons-material/VpnKeyOff'
import Avatar from '@mui/material/Avatar'

import FormInput from '../../components/Fields/FormInput'
import CustomButton from '../../components/Button/CustomButton'

import { useAppDispatch } from '../../store/hooks'
import { RootState } from '../../store/store'
import { signin } from '../../store/auth'

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Enter your Email').email('Enter a valid Email'),
  password: Yup.string().required('Enter your password')
})

interface RegisterForm {
  email: string
  password: string
}

const initialValues: RegisterForm = {
  email: '',
  password: ''
}

const Signin = () => {
  const { loading, checked } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      formik.setFieldValue('acceptReceive', false)
      dispatch(signin(values))
        .unwrap()
        .then((resolve) => {
          toast.success(resolve.data.message)
          navigate('/')
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
            <VpnKeyOffIcon />
          </Avatar>
        </Grid>
        <Grid item className="text-[32px] font-bold">
          <div className="font-podium49">SIGN IN</div>
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
              <CustomButton
                type="submit"
                model="primary"
                variant="contained"
                label="SIGN IN"
                loading={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <Link to="/registration">Not have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default Signin
