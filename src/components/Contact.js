import { useEffect, useState } from 'react';
import { Map, Marker } from 'pigeon-maps';
import axios from 'axios';

// Material UI
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// Material Icons
import EmailIcon from '@mui/icons-material/Email';
import LocationIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// The latitude and longitude of your location on a map
const coordinates = [53.35014, -6.266155];

const Contact = () => {
  const theme = useTheme();

  const [contact, setContact] = useState([]);

  const fetchContact = () => {
    axios
      .get('/contact', {
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': process.env.BACKEND_URL,
        },
      })
      .then((response) => {
        setContact(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div id='contact'>
      <Box position='relative' marginBottom={15}>
        <Box
          maxWidth={{ sm: 720, md: 1236 }}
          width={1}
          margin='0 auto'
          paddingX={2}
          paddingY={{ xs: 4, sm: 6, md: 8 }}
          paddingBottom={10}
        >
          <Box marginBottom={4}>
            <Typography
              variant='h3'
              align='center'
              fontWeight={700}
              marginTop={theme.spacing(1)}
              gutterBottom
              data-aos='fade-up'
            >
              Get in touch
            </Typography>
            <Typography
              variant='h6'
              align='center'
              color={theme.palette.text.secondary}
              marginTop={4}
              marginBottom={6}
              data-aos='fade-up'
            >
              We would love to hear from you
            </Typography>
          </Box>
          {contact.slice(0, 1).map((item, index) => (
            <Box key={index}>
              <Box marginBottom={4}>
                <Map height={400} defaultCenter={coordinates} defaultZoom={13}>
                  <Marker width={50} anchor={coordinates} />
                </Map>
              </Box>
              <Box
                display='flex'
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent='center'
                marginTop={6}
                marginBottom={3}
              >
                <Box
                  component={ListItem}
                  disableGutters
                  width='auto'
                  padding={0}
                  marginRight={10}
                >
                  <Box
                    component={ListItemAvatar}
                    minWidth='auto !important'
                    marginRight={2}
                  >
                    <Box
                      component={Avatar}
                      backgroundColor={theme.palette.primary.main}
                      width={40}
                      height={40}
                    >
                      <PhoneIcon fontSize='small' />
                    </Box>
                  </Box>
                  <ListItemText primary='Phone' secondary={item.phone} />
                </Box>
                <Box
                  component={ListItem}
                  disableGutters
                  width='auto'
                  padding={0}
                  marginRight={10}
                >
                  <Box
                    component={ListItemAvatar}
                    minWidth='auto !important'
                    marginRight={2}
                  >
                    <Box
                      component={Avatar}
                      backgroundColor={theme.palette.primary.main}
                      width={40}
                      height={40}
                    >
                      <EmailIcon fontSize='small' />
                    </Box>
                  </Box>
                  <ListItemText primary='Email' secondary={item.email} />
                </Box>
                <Box
                  component={ListItem}
                  disableGutters
                  width='auto'
                  padding={0}
                >
                  <Box
                    component={ListItemAvatar}
                    minWidth='auto !important'
                    marginRight={2}
                  >
                    <Box
                      component={Avatar}
                      backgroundColor={theme.palette.primary.main}
                      width={40}
                      height={40}
                    >
                      <LocationIcon fontSize='small' />
                    </Box>
                  </Box>
                  <ListItemText primary='Location' secondary={item.address} />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Contact;
