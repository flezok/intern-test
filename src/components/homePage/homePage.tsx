import { Text, Title, Flex } from '@mantine/core';
import { jwtDecode } from 'jwt-decode';

import './homePage.scss';


const HomePage = () => {



    

    return (
        <Flex className='home'
            mih={50}
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
        >
            <Title order={2} size='h1'>
                Вы авторизированы!
            </Title>
            <Text size='lg'>
                Пользователь: {jwtDecode(localStorage.getItem("authToken")).user_info.email}
            </Text>
        </Flex> 
    )

}



export default HomePage;