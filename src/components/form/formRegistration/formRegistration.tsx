import { useForm } from '@mantine/form';
import { TextInput, Button, Group, PasswordInput, Text, Title } from '@mantine/core';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './formRegistration.scss';


const FormRegistration = () => {

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmCode, setConfirmCode] = useState('');
    const navigate = useNavigate();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { 
            email: '', 
            password: '',
            confirmPassword: ''
        },

        validate: {
            email: (value) => (/^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(value) ? null : 'Неверный email'),
            confirmPassword: (value, values) => 
                value !== values.password ? 'Пароль не совпадает' : null,
            
        },
    })


    const handleSubmit = async (values) => {
        const userData = {
            email: values.email,
            password: values.password,
            repeat_password: values.confirmPassword,
        };
        
        const postReg = {
            method: 'POST',
            url: 'http://20.205.178.13:8001/registration/',
            data: userData
        };

        axios.request(postReg).then(function (response) {
            if (response.data.success) {
                setShowConfirm(true)
            }
        }).catch(function (error) {
            console.error(error);
        });
    };

    const confirmSubmit = async (values) => {
        const patchCode = {
            method: 'PATCH',
            url: `http://20.205.178.13:8001/registration/${confirmCode}`,
        }

        axios.request(patchCode).then(function (response) {
            if (response.data.success) {
                navigate('/authorization');
            }
        }).catch(function (error) {
            console.error(error);
        });
    };

    

    return (
        <>
            {!showConfirm && 
            <div className='form__wrapper'>
                 <Title className="form__title" order={2}>
                    Создать аккаунт
                </Title>
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <TextInput
                        mt="sm"
                        label="Email:"
                        placeholder='example.work@mail.com'
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
        
                    <PasswordInput
                        label="Пароль:"
                        placeholder="Пароль"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
        
                    <PasswordInput
                        mt="sm"
                        label="Подтвердите пароль:"
                        placeholder="Подтвердите пароль"
                        key={form.key('confirmPassword')}
                        {...form.getInputProps('confirmPassword')}
                    />
        
                    <Group justify="flex-start" mt="md">
                        <Button type="submit" size="md">Зарегистрировать</Button>
                        <Text fz="md">Уже есть аккаунт?</Text> 
                        <Button className="form__open-authorization"
                                component='a' 
                                href='/authorization' 
                                c='blue.8' 
                                fz="md" 
                                fw="500">Войти</Button>
                    </Group>
        
                </form>
            </div>
            }
            {showConfirm && 
            <div className='form__wrapper'>
                 <Title className="form__title" order={2}>
                    Подтвердите аккаунт
                </Title>
                <form onSubmit={form.onSubmit((values) => confirmSubmit(values))}>

                    <TextInput
                        mt="sm"
                        label="Код подтверждения:"
                        placeholder="Код"
                        key={form.key('confirmCode')}
                        {...form.getInputProps('confirmCode')}
                        onChange={(e) => (setConfirmCode(e.target.value))}>
                    </TextInput>
        
                    <Group justify="flex-start" mt="md">
                        <Button type="submit" size="md">Подтвердить</Button>
                    </Group>
        
                </form>
            </div>
            }
        </>
    )

}



export default FormRegistration;