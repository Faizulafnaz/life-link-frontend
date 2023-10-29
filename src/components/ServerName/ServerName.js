import React, { useEffect } from 'react'
import { Container, Title, ExpandIcon} from './ServerNameStyles'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../congifure/urls'
import axios from 'axios'

const ServerName = () => {
  const [details, setDetails] = useState()
  const {group} = useParams()
  const getDetails = async () => {
    axios.get(`${baseUrl}/group-details/${group}`).then((response) => {
      if (response.status == 200) {
          console.log(response.data)
          setDetails(response.data[0])

      }
  })
  }
  useEffect(()=>{
    getDetails()
  },[group, ])
  return (
    <Container>
        <Title>{details?.name}</Title>
        <ExpandIcon/>
    </Container>
  )
}

export default ServerName