import { Typography, makeStyles, TextField, Container } from '@material-ui/core'
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
    input: {
        width: "150px"
    }
}))

type FillInTheBlanksProps = {
    data: {
        ques: string
    }
    ques: number
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

export const FillInTheBlanks = ({ data, ques, handleChange, value }: FillInTheBlanksProps) => {
    const classes = useStyle();

    return (
        <>
            <Typography variant='body2' className={classes.quesHeading}>Question {ques}</Typography>
            <Container className={classes.quesDiv}>
                <Typography>{data.ques}</Typography>
                <Container className={classes.optionDiv}>
                    <TextField id="standard-basic" className={classes.input} value={value} onChange={handleChange} />
                </Container>
            </Container>
        </>
    )
}
