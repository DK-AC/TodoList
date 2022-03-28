import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import React, {useEffect} from "react"
import {useFormik} from "formik";
import {LoginValuesType} from "../../bll/types/authTypes";
import {useDispatch} from "react-redux";
import {loginTC} from "../../bll/thunk/authThunk";
import {useAppSelector} from "../../bll/store";
import {useNavigate} from "react-router-dom";


export const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isInitialized = useAppSelector(state => state.auth.isInitialized)

    const validate = (values: LoginValuesType) => {
        const errors: Partial<LoginValuesType> = {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length <= 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate,
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });

    useEffect(() => {
        if (isInitialized) {
            navigate('/')
        }
    }, [isInitialized])


    return <Grid container justifyContent={'center'}>
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
                        <p>Password: zxcnbvasdqwe123</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
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
