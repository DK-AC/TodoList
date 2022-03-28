import React, {useCallback} from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import LinearProgress from '@mui/material/LinearProgress';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";
import {addTodolistTC} from "../../bll/thunk/todolistThunk";
import {ErrorSnackbar} from "../../components/ErrorSnackbar/ErrorSnackbar";
import {Routing} from "../Routing/Routing";

type PropsType = { demo?: boolean }

export const AppBarContainer = ({demo}: PropsType) => {

    const dispatch = useDispatch()

    const isLoading = useAppSelector(state => state.app.appStatus)

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {isLoading === 'loading' && <LinearProgress/>}
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    <Routing/>
                </Grid>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
};



