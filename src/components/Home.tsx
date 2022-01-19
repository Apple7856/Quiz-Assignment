import { Button, Container, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { CheckBox } from './CheckBox';
import { FillInTheBlanks } from './FillInTheBlanks';
import { RadioButton } from './RadioButton';
import { question, resultValue } from '../Data'
import { Pie, PieChart } from 'recharts';

const useStyle = makeStyles((theme) => ({
    container: {
        width: "100vw",
        height: "92vh",
        backgroundColor: theme.palette.success.light,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    mainBox: {
        width: "400px",
        height: "400px",
        backgroundColor: "white",
        borderRadius: "5px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    root: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    headingText: {
        color: "green",
        marginTop: theme.spacing(3),
        fontSize: "20px",
        fontWeight: "bold"
    },
    select: {
        width: "280px",
        marginTop: theme.spacing(2),
    },
    submitBtn: {
        marginTop: theme.spacing(8),
    },
    Question: {
        width: "85vw",
        height: "80vh",
        backgroundColor: "white",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    detailsDiv: {
        width: "100%",
        height: "21%",
        borderBottom: "2px solid gray"
    },
    details: {
        marginTop: theme.spacing(1.4),
        display: "flex",
        flexDirection: "row",
    },
    span: {
        marginLeft: theme.spacing(1),
        color: "green",
    },
    buttonDiv: {
        width: "300px",
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
}))
type CandidateDataState = {
    name: string
    gender: string
    language: string
}
type CheckedState = {
    checkedA: boolean,
    checkedB: boolean,
    checkedC: boolean,
    checkedD: boolean,
}

type ResultDataState = {
    skip: number
    wrong: number
    right: number
}

export const Home = () => {
    const classes = useStyle();
    const [candidateData, setCandidateData] = useState<CandidateDataState>({ name: "", gender: "", language: "" });
    const [update, setUpdate] = useState<boolean>(false);
    const [homeHide, setHomeHide] = useState<boolean>(true);
    const [queshide, setQueshide] = useState<boolean>(false);
    const [resultHide, setResultHide] = useState<boolean>(false);
    const [quesShow, setQuesShow] = useState<number>(1);
    const [state, setState] = React.useState<CheckedState>({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
    });
    const [value, setValue] = useState<string>('');
    const [result, setResult] = useState<Array<string>>([]);
    const [dataResult, setDataResult] = useState<ResultDataState>({
        skip: 0,
        wrong: 0,
        right: 0
    })

    const submitCandidateData = () => {
        setHomeHide(false);
        setQueshide(true);
    }

    const data = [
        { name: "skip", value: dataResult.skip },
        { name: "righ", value: dataResult.right },
        { name: "wrong", value: dataResult.wrong }
    ]

    function handleChange(e: any) {
        if (quesShow === 1) {
            setValue(e.target.value)
        } else if (quesShow === 2) {
            setValue(e.target.value)
        } else if (quesShow === 3) {
            setState({ ...state, [e.target.name]: e.target.checked });
            setValue(value.concat(e.target.value))
        } else if (quesShow === 4) {
            setValue(e.target.value)
        } else if (quesShow === 5) {
            setValue(e.target.value)
        }
    }

    function submitQues() {
        setResult([...result, value])
        setQuesShow(quesShow < 5 ? quesShow + 1 : quesShow)
        setResultHide(quesShow === 5 ? true : false)
        setQueshide(quesShow === 5 ? false : true)
        setValue("")
        setUpdate(true);
    }

    function nextClick() {
        setQuesShow(quesShow < 5 ? quesShow + 1 : quesShow)
        setResultHide(quesShow === 5 ? true : false)
        setQueshide(quesShow === 5 ? false : true)
        setResult([...result, value])
        setUpdate(true);
    }

    useEffect(() => {
        if (update) {
            localStorage.setItem('result', JSON.stringify(result));
            result.map((item, i) => {
                if (item === resultValue[i]) {
                    setDataResult({ ...dataResult, right: dataResult.right + 1 })
                } else if (item === "") {
                    setDataResult({ ...dataResult, skip: dataResult.skip + 1 })
                } else if (item !== resultValue[i]) {
                    setDataResult({ ...dataResult, wrong: dataResult.wrong + 1 })
                }
            })
        }
        return () => {
            setUpdate(false);
        }
    }, [result])

    return (
        <Container className={classes.container}>
            {
                homeHide ?
                    <Container className={classes.mainBox}>
                        <Container className={classes.form}>
                            <Typography variant='body2' className={classes.headingText}>Candidate Form</Typography>
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField id="standard-basic" label="Name" className={classes.select} value={candidateData.name} onChange={(e) => setCandidateData({ ...candidateData, name: e.target.value })} />
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Gender"
                                    className={classes.select}
                                    value={candidateData.gender}
                                    onChange={(e) => setCandidateData({ ...candidateData, gender: e.target.value })}
                                >
                                    <MenuItem value="Male">
                                        Male
                                    </MenuItem>
                                    <MenuItem value="Female">
                                        Female
                                    </MenuItem>
                                </TextField>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Language"
                                    className={classes.select}
                                    value={candidateData.language}
                                    onChange={(e) => setCandidateData({ ...candidateData, language: e.target.value })}
                                >
                                    <MenuItem value="English">
                                        English
                                    </MenuItem>
                                    <MenuItem value="Hindi">
                                        Hindi
                                    </MenuItem>
                                </TextField>
                                <Button variant='contained' color="secondary" className={classes.submitBtn} onClick={() => submitCandidateData()}>Submit</Button>
                            </form>
                        </Container>
                    </Container>
                    : ""
            }
            {
                queshide ?
                    <Container className={classes.Question}>
                        <Container className={classes.detailsDiv}>
                            <Container className={classes.details}>Name:
                                <Typography variant='body2' className={classes.span}>{candidateData.name}</Typography>
                            </Container>
                            <Container className={classes.details}>Gender:
                                <Typography variant='body2' className={classes.span}>{candidateData.gender}</Typography>
                            </Container>
                            <Container className={classes.details}>Language:
                                <Typography variant='body2' className={classes.span}>{candidateData.language}</Typography>
                            </Container>
                        </Container>
                        {
                            question.map((item, i) => {
                                if (item.type === 'FillInTheBlanks') {
                                    return quesShow === i + 1 ? <FillInTheBlanks key={i} data={item.data} handleChange={handleChange} ques={i + 1} value={value} /> : ""
                                } else if (item.type === 'RadioButton') {
                                    return quesShow === i + 1 ? <RadioButton key={i} data={item.data} handleChange={handleChange} ques={i + 1} value={value} /> : ""
                                } else if (item.type === 'CheckBox') {
                                    return quesShow === i + 1 ? <CheckBox key={i} data={item.data} handleChange={handleChange} ques={i + 1} state={state} /> : ""
                                }
                            })
                        }
                        <Container className={classes.buttonDiv}>
                            <Button variant='contained' color="secondary" onClick={() => submitQues()}>Submit</Button>
                            <Button variant='contained' color="primary" onClick={() => nextClick()}>Next</Button>
                        </Container>
                    </Container>
                    : ""
            }
            {
                resultHide ?
                    <Container className={classes.Question}>
                        <Typography variant='body1'>
                            Hello {candidateData.name}, Your score is {dataResult.right} and wrong answer is {dataResult.wrong} and skip question is {dataResult.skip}.
                        </Typography>
                        <Typography variant='body1'>
                            Your Percentage: {dataResult.right / 5 * 100}
                        </Typography>
                        <Container>
                            <PieChart width={350} height={350}>
                                <Pie data={data} dataKey="value" outerRadius={100} fill="green" />
                            </PieChart>
                        </Container>
                    </Container>
                    : ""
            }
        </Container>
    )
}
