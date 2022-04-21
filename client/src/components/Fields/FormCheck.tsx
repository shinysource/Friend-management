import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  Typography,
  FormHelperText
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FormikValues } from 'formik'
import { ChangeEvent } from 'react'

interface FormCheckProps {
  name: string
  className?: string
  label?: React.ReactNode
  handleChange?: (evt: ChangeEvent<HTMLInputElement>) => void
  formik: FormikValues
  isHint?: boolean
}

const FormCheck = ({
  name,
  label,
  className,
  handleChange,
  formik,
  isHint
}: FormCheckProps) => {
  return (
    <FormControl
      error={isHint && formik.touched[name] && !!formik.errors[name]}
    >
      {isHint && formik.touched[name] && formik.errors[name] && (
        <FormHelperText sx={{ marginLeft: '0px' }}>
          {formik.errors[name]}
        </FormHelperText>
      )}
      <FormGroup className={className}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values[name]}
              name={name}
              value={formik.values[name]}
              onChange={handleChange}
            />
          }
          label={label}
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  )
}

export default FormCheck
