// import { TextField, Button, Grid2, Typography } from '@mui/material';

// const AppointmentForm = () => {
//   return (
//     <Grid2 container spacing={2} sx={{ padding: 4 }}>
//       <Grid2 item xs={12}>
//         <Typography variant="h6">Treatment Inquiry</Typography>
//         <Typography>
//           Motivation is not an accident or something that someone else can give you with the power to motivate you.
//         </Typography>
//       </Grid2>
//       <Grid2 item xs={12} sm={6}>
//         <TextField fullWidth label="Full Name" variant="outlined" />
//       </Grid2>
//       <Grid2 item xs={12} sm={6}>
//         <TextField fullWidth label="Your Email" variant="outlined" />
//       </Grid2>
//       <Grid2 item xs={12} sm={6}>
//         <TextField fullWidth label="Phone Number" variant="outlined" />
//       </Grid2>
//       <Grid2 item xs={12} sm={6}>
//         <TextField fullWidth label="Select Subject" variant="outlined" />
//       </Grid2>
//       <Grid2 item xs={12}>
//         <TextField fullWidth label="Date" type="date" variant="outlined" InputLabelProps={{ shrink: true }} />
//       </Grid2>
//       <Grid2 item xs={12}>
//         <TextField fullWidth label="Comment" multiline rows={4} variant="outlined" />
//       </Grid2>
//       <Grid2 item xs={12}>
//         <Button variant="contained" color="primary">Make Appointment</Button>
//       </Grid2>
//     </Grid2>
//   );
// };

// export default AppointmentForm;
import { useState } from 'react'
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material'
import Grid from '@mui/material/Grid2'
// import Header from "./Header";
// import Footer from "./Footer";

const Appointment = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    date: '',
    comment: ''
  })
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Form Submitted:', formData)
    setOpenSnackbar(true)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      date: '',
      comment: ''
    })
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <>
      <Container maxWidth='md' sx={{ mt: 5, mb: 5, padding: 3 }}>
        <Typography variant='h4' gutterBottom align='center'>
          Treatment Inquiry
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ padding: 2 }} rowSpacing={1}>
            <Grid item size={{ xs: 6, md: 6 }}>
              <TextField
                fullWidth
                label='Full Name'
                name='fullName'
                variant='outlined'
                value={formData.fullName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={{ xs: 6, md: 6 }}>
              <TextField
                fullWidth
                name='email'
                variant='outlined'
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={{ xs: 6, md: 6 }}>
              <TextField
                fullWidth
                name='phone'
                variant='outlined'
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={{ xs: 6, md: 6 }}>
              <TextField
                select
                fullWidth
                name='subject'
                variant='outlined'
                value={formData.subject}
                onChange={handleChange}
              >
                <MenuItem value='Massage'>Massage</MenuItem>
                <MenuItem value='Facial'>Facial</MenuItem>
                <MenuItem value='Body Treatment'>Body Treatment</MenuItem>
              </TextField>
            </Grid>
            <Grid item size={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                type='date'
                name='date'
                variant='outlined'
                value={formData.date}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                name='comment'
                multiline
                rows={4}
                variant='outlined'
                value={formData.comment}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 3 }}
          >
            Make Appointment
          </Button>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity='success'
            sx={{ width: '100%' }}
          >
            Appointment request submitted successfully!
          </Alert>
        </Snackbar>
      </Container>
    </>
  )
}

export default Appointment
