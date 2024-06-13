import { Container, Box, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../src/Components/authentication/Login'
import SignUp from '../src/Components/authentication/SignUp'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

const HomePage = () => {

    const navigate = useNavigate()

    useEffect(()=>{
        const user  = JSON.parse(localStorage.getItem("userInfo"))
        
        if (user) navigate("/chats")
    },[navigate])


    return (
      <Container maxW='xl'>
        <Box d='flex' justifyContent='center'p={3} bg='#E9DCC9' w='100%' m="40px 0 15px 0" borderRadius='lg' borderWidth='1px'>
            <Text fontSize='4xl' fontFamily="Rubik:ital" color='#301934' textAlign={'center'}>Chat Application</Text>
        </Box>
        <Box bg='white' w='100%' p={4} borderRadius='lg' borderWidth='1px'>
            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab w='50%'>Login</Tab>
                    <Tab w='50%'>Signup</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel><Login /></TabPanel>
                        <TabPanel><SignUp /></TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
      </Container>
    )
  }
  
  export default HomePage
  