// import React from 'react'
import { Grid2, Typography, Link, TextField, Button } from '@mui/material'

const Footer = () => {
  return (
    <Grid2
      container
      spacing={2}
      sx={{ padding: 4, backgroundColor: '#f5f5f5' }}
    >
      <Grid2 item xs={12} md={4}>
        <Typography variant='h6'>Contact Information</Typography>
        <Typography>6500 Allison Turnpike</Typography>
        <Typography>Creminfort, AL 32000-4509</Typography>
        <Typography>(123) 34-6-6789</Typography>
        <Typography>support@luxuryspa.com</Typography>
      </Grid2>
      <Grid2 item xs={12} md={4}>
        <Typography variant='h6'>Navigation</Typography>
        <Link href='#' color='inherit'>
          About us
        </Link>
        <br />
        <Link href='#' color='inherit'>
          Service
        </Link>
        <br />
        <Link href='#' color='inherit'>
          Blog
        </Link>
        <br />
        <Link href='#' color='inherit'>
          Team
        </Link>
        <br />
        <Link href='#' color='inherit'>
          Contact us
        </Link>
      </Grid2>
      <Grid2 item xs={12} md={4}>
        <Typography variant='h6'>Useful Links</Typography>
        <Link href='#' color='inherit'>
          Login
        </Link>
        <br />
        <Link href='#' color='inherit'>
          Register
        </Link>
        <br />
        <Link href='#' color='inherit'>
          Galaxy
        </Link>
        <br />
        <Link href='#' color='inherit'>
          Terms and Conditions
        </Link>
        <br />
        <Link href='#' color='inherit'>
          Privacy Policy
        </Link>
      </Grid2>
      <Grid2 item xs={12}>
        <Typography variant='h6'>Newsletter</Typography>
        <Typography>
          Sign Up to our Newsletter to get the latest news and offers.
        </Typography>
        <TextField label='Your Email' variant='outlined' />
        <Button variant='contained' color='primary'>
          Get Retired
        </Button>
      </Grid2>
      <Grid2 item xs={12}>
        <Typography align='center'>
          © Copyright 2025 All Rights Reserved
        </Typography>
        <Typography align='center'>
          Develop and design by Younas Global Solutions
        </Typography>
      </Grid2>
    </Grid2>
  )
}

export default Footer
