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
            navigate(`/?keyword=${keyword}&page=1`)
        }else {
            navigate('/')
        }
    }

  return (
    <Form onSubmit={submitHandler} inline>
        <div className='d-inline-flex p-2'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2 mx-2'
            >
                Submit
            </Button>
        </div>
    </Form>
  )
}

export default SearchBox