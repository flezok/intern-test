import { useForm } from '@mantine/form';
import { TextInput, Button, Group, PasswordInput, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import './formAuthorization.scss';


const FormAuthorization = () => {

    const navigate = useNavigate();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { 
            email: '', 
            password: '',
        },

        validate: {
            email: (value) => (/^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(value) ? null : 'Неверный email'),
            
        },
    })

    const handleSubmit = async(values) => {
        const userData = {
            email: values.email,
            password: values.password,
        }
        
        let options = {
            method: 'POST',
            url: 'http://20.205.178.13:8001/auth/login/',
            data: userData
        };

        axios.request(options).then(function (response) {
            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.auth_token);
                localStorage.setItem('refreshToken', response.data.refresh_token);
                navigate('/home');
            }
        }).catch(function (error) {
            console.error(error);
        });

    }

    return (
        <div className='form__wrapper'>
            <Title className="form__title" order={2}>
                Войти
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
    
    
                <Group justify="flex-start" mt="md">
                    <Button type="submit" size="md">Войти</Button>
                    <Text fz="md">Еще нет аккаунта?</Text> 
                    <Button className="form__open-authorization"
                            component='a' 
                            href='/' 
                            c='blue.8' 
                            fz="md" 
                            fw="500">Зарегистрировать</Button>
                </Group>
    
            </form>
        </div>
    )

}



export default FormAuthorization;