import { useState } from 'react'
import { FormControl, FormGroup, FormHelperText } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import { makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FormikValues } from 'formik'
import Checkbox from '@mui/material/Checkbox'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const useStyles = makeStyles({
  label: {
    fontFamily: 'Inter',
    fontSize: '14px',
    color: '#A6A6A6'
  }
})

interface Option {
  label: string
  value: string
}

interface FormSelectProps {
  name: string
  options: Option[]
  preferredOptions?: Option[]
  className?: string
  id?: string
  label?: string
  placeholder?: string
  multiple?: boolean
  formik: FormikValues
  isHint?: boolean
}

const FormSelect = ({
  name,
  options,
  preferredOptions,
  className,
  label,
  placeholder,
  multiple,
  formik,
  isHint
}: FormSelectProps) => {
  const [hobby, setHobby] = useState<string[]>([])
  const classes = useStyles()

  const handleChange = (event: SelectChangeEvent<typeof hobby>) => {
    const {
      target: { value }
    } = event
    setHobby(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
    formik.setFieldValue(
      name,
      typeof value === 'string' ? value : value.join(',')
    )
  }

  return (
    <FormGroup className={className}>
      <FormControl
        variant="outlined"
        error={formik.touched[name] && !!formik.errors[name]}
      >
        <InputLabel id="select">{label}</InputLabel>
        <Select
          labelId="select"
          name={name}
          value={hobby}
          onChange={handleChange}
          multiple={multiple || false}
          input={<OutlinedInput label="Hobby" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {options.map((option: Option, index: number) => (
            <MenuItem value={option.label} key={index}>
              <Checkbox checked={hobby.indexOf(option.label) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
        {isHint && formik.touched[name] && formik.errors[name] && (
          <FormHelperText sx={{ marginLeft: 0 }}>
            {formik.errors[name]}
          </FormHelperText>
        )}
      </FormControl>
    </FormGroup>
  )
}

export default FormSelect
