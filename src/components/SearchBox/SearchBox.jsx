import React from 'react'
import { useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword){
            navigate(`/?keyword=${keyword}`)
        }else {
            navigate('/')
        }
    }

  return (
    <Form onSubmit={submitHandler} inline>
        <FormControl type='text' name='q' onChange={(e) => setKeyword(e.target.value)} className='mr-sm-2 ml-sm-5' >

        </FormControl>
        <Button type='submit' variant='outline-success' className='p-2'>
            Submit
        </Button>

    </Form>
  )
}

export default SearchBox