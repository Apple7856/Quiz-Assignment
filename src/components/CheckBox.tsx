import { Checkbox, FormControlLabel, Typography, makeStyles, Container } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles((theme) => ({
    quesHeading: {
        margin: theme.spacing(2),
        fontSize: "20px",
        fontWeight: "bold",
        color: "red",
    },
    quesDiv: {
        width: "80%",
        height: "50%",
        padding: "20px",
        border: "2px solid black"
    },
    optionDiv: {
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
    },
}))

type CheckBoxProps = {
    data: {
        ques: string,
        opt1?: string,
        opt2?: string,
        opt3?: string,
        opt4?: string
    }
    ques: number
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    state: {
        checkedA: boolean,
        checkedB: boolean,
        checkedC: boolean,
        checkedD: boolean,
    },

}

export const CheckBox = ({ data, ques, handleChange, state }: CheckBoxProps) => {
    
    const classes = useStyle();

    return (
        <>
            <Typography variant='body2' className={classes.quesHeading}>Question {ques}</Typography>
            <Container className={classes.quesDiv}>
                <Typography>{data.ques}</Typography>
                <Container className={classes.optionDiv}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.checkedB}
                                onChange={handleChange}
                                name="checkedB"
                                value={data.opt1}
                            />
                        }
                        label={data.opt1}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.checkedA}
                                onChange={handleChange}
                                name="checkedA"
                                value={data.opt2}
                            />
                        }
                        label={data.opt2}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.checkedC}
                                onChange={handleChange}
                                name="checkedC"
                                value={data.opt3}
                            />
                        }
                        label={data.opt3}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.checkedD}
                                onChange={handleChange}
                                name="checkedD"
                                value={data.opt4}
                            />
                        }
                        label={data.opt4}
                    />
                </Container>
            </Container>
        </>
    )
}
