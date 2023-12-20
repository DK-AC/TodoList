import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import React, {useEffect} from 'react'
import {FormikHelpers, useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import {authActions} from '../../bll/thunk'
import {useActions, useAppDispatch} from '../../utils/redux-utils'
import {useSelector} from 'react-redux'
import {selectIsLoggedIn} from '../../bll/selectors'
import style from './Login.module.css'

type FormValuesType = { email: string, password: string, rememberMe: boolean }

export const Login = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {login} = useActions(authActions)

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(3, 'Password must be at least 3 characters')
        .required('Required'),
    }),
    onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
      const action = await dispatch(login(values))
      if (login.rejected.match(action)) {
        if (action.payload?.fieldsErrors?.length) {
          const error = action.payload.fieldsErrors[0]
          formikHelpers.setFieldError(error.field, error.error)
        }
      }
    }
  })

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])


  return <Grid className={style.login} container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>
            <p>To log in get registered
              <a href={'https://social-network.samuraijs.com/'}
                 target={'_blank'}> here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <FormGroup className={style.formControl}>
            <TextField label="email"
                       margin="normal"
                       {...formik.getFieldProps('email')}
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            <TextField type="password"
                       label="password"
                       margin="normal"
                       {...formik.getFieldProps('password')}
            />
            <FormControlLabel
              label={'remember me'}
              control={<Checkbox/>}
              {...formik.getFieldProps('rememberMe')}
            />
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid>
}
