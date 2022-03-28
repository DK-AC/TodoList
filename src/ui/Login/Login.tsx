import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import React from "react"
import {useFormik} from "formik";


export const Login = () => {

    const validate = (values: any) => {
        const errors: any = {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
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
            alert(JSON.stringify(values, null, 2));
        },
    });


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
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="email"
                                   margin="normal"
                                   name='email'
                                   value={formik.values.email}
                                   onChange={formik.handleChange}
                                   error={formik.touched.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div style={{color: 'red'}}>{formik.errors.email}</div>) : null}
                        <TextField type="password"
                                   label="password"
                                   margin="normal"
                                   name='password'
                                   value={formik.values.password}
                                   onChange={formik.handleChange}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>) : null}
                        <FormControlLabel
                            label={'remember me'}
                            control={<Checkbox/>}
                            name='rememberMe'
                            value={formik.values.rememberMe}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.rememberMe && formik.errors.rememberMe ? (
                            <div>{formik.errors.rememberMe}</div>) : null}
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
