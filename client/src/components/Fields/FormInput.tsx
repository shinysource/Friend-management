import { TextField, FormGroup } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import ErrorIcon from '@mui/icons-material/Error'
import { FormikValues } from 'formik'
import { ChangeEvent } from 'react'

interface FormInputProps {
  id?: string
  type?: string
  name: string
  className?: string
  label?: string
  placeholder?: string
  prefix?: string
  handleChange?: (evt: ChangeEvent<HTMLInputElement>) => void
  formik?: FormikValues
  isHint?: boolean
}

const FormInput = ({
  id,
  type,
  name,
  className,
  label,
  placeholder,
  prefix,
  handleChange,
  formik,
  isHint
}: FormInputProps) => {
  return (
    <FormGroup>
      <TextField
        type={type || 'text'}
        name={name}
        value={formik?.values[name]}
        onChange={handleChange}
        className={className}
        label={label}
        placeholder={placeholder}
        variant="outlined"
        error={formik?.touched[name] && !!formik?.errors[name]}
        helperText={isHint && formik?.touched[name] && formik?.errors[name]}
        InputProps={
          formik?.touched[name] && formik?.errors[name]
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <ErrorIcon sx={{ color: '#E41E31' }}></ErrorIcon>
                  </InputAdornment>
                )
              }
            : {}
        }
      />
    </FormGroup>
  )
}

export default FormInput
