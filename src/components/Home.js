import React from 'react'
import CarouselHome from './CarouselHome'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <CarouselHome/>

      <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/register" variant="body2">
                 Sign up
                </Link>
                <Link to="/login" variant="body2">
                 Sign in
                </Link>
              </Grid>
            </Grid>
    </div>
  )
}

export default Home
