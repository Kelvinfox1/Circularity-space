import React from 'react'
import {
  TextInput,
  PasswordInput,
  NumberInput,
  Title,
  Text,
  Container,
  Button,
  Image,
  Divider,
} from '@mantine/core'
import { useForm, useToggle, upperFirst } from '@mantine/hooks'
import Logo from '../components/5-removebg-preview.png'
import axios from 'axios'

const Login = () => {
  const [type, toggle] = useToggle('login', ['login', 'register'])
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      fname: '',
      lname: '',
      phone: 0,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  })

  const handleSubmit = (values) => {
    if (type === 'register') {
      console.log('register', values)
    }
    if (type === 'login') {
      const email = values.email
      const password = values.password
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }

        const { data } = axios.post(
          'https://virdismart.herokuapp.com/api/users/login',
          { email, password },
          config
        )
        localStorage.setItem('userDetails', JSON.stringify(data))
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <Container size={420} my={40}>
        <Title
          align='center'
          sx={(theme) => ({
            color: theme.colors.gray[7],
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 600,
          })}
        >
          {type === 'register' ? 'Welcome' : '  Welcome back!'}
        </Title>
        <Image
          height={90}
          radius='md'
          src={Logo}
          alt='Circularity Logo'
          caption='Circularity  | Turning Trash to Cash'
          withPlaceholder
          styles={{
            caption: { color: 'teal' },
          }}
        />
        <Divider label={type} labelPosition='center' my='lg' />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          {type === 'register' && (
            <TextInput
              label='First Name'
              required
              placeholder='Your first name'
              value={form.values.fname}
              onChange={(event) =>
                form.setFieldValue('fname', event.currentTarget.value)
              }
            />
          )}
          {type === 'register' && (
            <TextInput
              label='Last Name'
              required
              placeholder='Your last name'
              value={form.values.lname}
              onChange={(event) =>
                form.setFieldValue('lname', event.currentTarget.value)
              }
            />
          )}

          {type === 'register' && (
            <NumberInput
              placeholder='Your phone number'
              label='Phone Number'
              required
              hideControls
              value={form.values.phone}
              onChange={(val) => form.setFieldValue('phone', val)}
            />
          )}

          <TextInput
            label='Email'
            required
            placeholder='your@email.com'
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
          />
          <PasswordInput
            label='Password'
            placeholder='Your password'
            required
            mt='md'
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
          />

          <Button fullWidth mt='xl' type='submit' color='teal'>
            {upperFirst(type)}
          </Button>
        </form>
        <Divider my='lg' />
        <Text
          color='dimmed'
          size='sm'
          align='center'
          mt={5}
          onClick={() => toggle()}
        >
          {type === 'register'
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </Text>
      </Container>
    </>
  )
}

export default Login
