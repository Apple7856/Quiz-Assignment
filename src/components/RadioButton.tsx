import { FormControlLabel, Typography, makeStyles, Radio, RadioGroup, Container } from '@material-ui/core'
import React, { useState } from 'react'

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

type RadioButtonProps = {
    data: {
        ques: string,
        opt1?: string,
        opt2?: string
    }
    ques: number
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

export const RadioButton = ({data, ques, handleChange, value }: RadioButtonProps) => {
    const classes = useStyle();

    return (
        <>
            <Typography variant='body2' className={classes.quesHeading}>Question {ques}</Typography>
            <Container className={classes.quesDiv}>
                <Typography>{data.ques}</Typography>
                <Container className={classes.optionDiv}>
                    <RadioGroup name="ques" value={value} onChange={handleChange}>
                        <FormControlLabel value={data.opt1} control={<Radio />} label={data.opt1} />
                        <FormControlLabel value={data.opt2} control={<Radio />} label={data.opt2} />
                    </RadioGroup>
                </Container>
            </Container>
        </>
    )
}
