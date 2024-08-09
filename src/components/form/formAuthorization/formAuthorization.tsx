import { useForm } from '@mantine/form';
import { TextInput, Button, Group, PasswordInput, Text, Title } from '@mantine/core';

import './formAuthorization.scss';


const FormAuthorization = () => {

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

    return (
        <div className='form__wrapper'>
            <Title className="form__title" order={2}>
                Войти
            </Title>
            <form onSubmit={form.onSubmit(console.log)}>
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