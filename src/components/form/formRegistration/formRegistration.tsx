import { useForm } from '@mantine/form';
import { TextInput, Button, Group, PasswordInput, Text, Title } from '@mantine/core';


import './formRegistration.scss';


const FormRegistration = () => {

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



    return (
        <div className='form__wrapper'>
            <Title className="form__title" order={2}>
                Создать аккаунт
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
    )

}



export default FormRegistration;