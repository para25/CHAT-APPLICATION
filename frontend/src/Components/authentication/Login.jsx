import { useState } from 'react';
import { FormControl, FormLabel, VStack, Input, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handlePasswordClick = () => setShowPassword(!showPassword);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            };

            const { data } = await axios.post("http://localhost:3000/api/user/login", { email, password }, config);
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            navigate('/chats');
        } catch (error) {
            console.log(error);
            let errorMessage = 'An error Occured';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            toast({
                title: "Error Occurred",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <VStack>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input type={showPassword ? "text" : "password"} placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <InputRightElement>
                            <Button h="1.75" size='sm' onClick={handlePasswordClick}>
                                {showPassword ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <Button type="submit" colorScheme='blue' width={'100%'} style={{ marginTop: 15 }} isLoading={loading}>
                    Login
                </Button>

                <Button variant="solid" colorScheme='red' w="100%" onClick={() => { setEmail("guest@example.com"); setPassword("12345"); }}>Guest User</Button>
            </VStack>
        </form>
    )
}

export default Login;