import { useState } from 'react';
import { FormControl, FormLabel, VStack, Input, InputGroup, InputRightElement, Button, useToast, FormErrorMessage, } from '@chakra-ui/react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handlePasswordClick = () => setShowPassword(!showPassword);
  const handleConfirmPasswordClick = () => setShowConfirmPassword(!showConfirmPassword);

  const postDetails = () => {
    // for photo
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Please Fill all the Feilds.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      setLoading(false);
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords Do not Match.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        },
      };

      // Send a POST request to the server with the user data
      const { data } = await axios.post("http://localhost:3000/api/user/", { name, email, password }, config);

      // Display a success message
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });

      // Store the user data in local storage
      localStorage.setItem('userInfo', JSON.stringify(data));

      setLoading(false);
      navigate('/chats');

    } catch (error) {
      // Display an error message if there's a problem with the request
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      setLoading(false);
    }
  }

  return (
    <VStack>
      <FormControl id='firstName' isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder='Enter your Name' onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        {emailError && (
          <FormErrorMessage>{emailError}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={showPassword ? "text" : "password"} placeholder='Enter your Password' onChange={(e) => setPassword(e.target.value)} />
          <InputRightElement>
            <Button h="1.75" size='sm' onClick={handlePasswordClick}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id='confirmPassword'  isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input type={showConfirmPassword ? "text" : "password"} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
          <InputRightElement>
            <Button h="1.75" size='sm' onClick={handleConfirmPasswordClick}>
              {showConfirmPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input type='file' p={1.5} accept='image/*' onChange={(e) => postDetails(e.target.files[0])} />
      </FormControl>

      <Button colorScheme='blue' width={'100%'} style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp;