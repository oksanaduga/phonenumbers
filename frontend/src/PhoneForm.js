import React, {useEffect, useRef, useState} from "react";
import { connect } from 'react-redux';
import style from './css/style.css';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core//MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function PhoneForm(props) {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('+7');
    const [errorText, setErrorText] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const [connected, setConnected] = useState(false);

    const socket = useRef();

    useEffect(() => {
        socket.current = new WebSocket('ws://localhost:3001')

        socket.current.onopen = () => {
            setConnected(true)
            console.log('Подключение установлено')
            let numberWithCode = {
                code,
                phone,
            }
            numberWithCode.event = 'connection';
            socket.current.send(JSON.stringify(numberWithCode));
        }

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            props.addNumber(message)
        }

        socket.current.onclose = () => {
            console.log('close')
        }

        socket.current.onerror = () => {
            console.log('error')
        }
    }, []);

    const helperText = 'Поле должно содержать только цифры от 3 до 10'

    const handleChangeCode = (event) => {
        setCode(event.target.value)
    };

    const handleChangeNumber = (event) => {
        let value = event.target.value;
        if (/\D/.test(value)) {
            setErrorText(true)
        } else {
            setErrorText(false)
        }
        let checkButtonDisable = () => (value.length > 2) && !(/\D/.test(value));
        setPhone(value);
        setIsDisabled(!checkButtonDisable());
    };

    function submitNumber(e) {
        e.preventDefault();
        let numberWithCode = {
            code,
            phone,
        }

        numberWithCode.event = 'message';
        socket.current.send(JSON.stringify(numberWithCode));

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            props.addNumber(message)
        }

        setPhone('');
        setIsDisabled(true);
    }

  return (
    <div>
        <div className={style.formContainer}>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Code</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={code}
                    label="code"
                    onChange={handleChangeCode}
                >
                    <MenuItem value={'+7'}>+7</MenuItem>
                    <MenuItem value={'+262'}>+262</MenuItem>
                    <MenuItem value={'+40'}>+40</MenuItem>
                </Select>
                <TextField
                    error={errorText}
                    id="standard-multiline-flexible"
                    label="phone"
                    helperText={errorText ? helperText : ''}
                    multiline
                    maxRows={4}
                    value={phone}
                    onChange={handleChangeNumber}
                    variant="standard"
                    inputProps={{ maxLength: 10 }}
                />
                <Button
                    variant="outlined"
                    onClick={submitNumber}
                    disabled={isDisabled}
                >
                    Add
                </Button>
            </FormControl>
        </div>
    </div>
  );
}

function mapStateToProps(state) {
    return {
        data: state.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNumber: (newData) => {
            const action = { type: 'ADD_NUMBER', data: newData };
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneForm);
