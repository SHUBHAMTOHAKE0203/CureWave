import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Box,
  Link,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import HealingIcon from '@mui/icons-material/Healing';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ScienceIcon from '@mui/icons-material/Science';

const DrugSearch = () => {
  const [drugName, setDrugName] = useState('');
  const [drugInfo, setDrugInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({ purpose: false, warning: false });

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setDrugInfo(null);
    try {
      const response = await axios.get(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${drugName}&limit=1`
      );
      if (response.data.results) {
        setDrugInfo(response.data.results[0]);
      } else {
        setError('No drug found with that name.');
      }
    } catch {
      setError('Failed to fetch drug data.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleText = (section) => {
    setExpanded((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #4facfe, #00f2fe)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      {/* Hero Section */}
      <Box textAlign="center" mb={4}>
        <LocalPharmacyIcon
          sx={{
            fontSize: '4rem',
            color: '#fff',
            backgroundColor: '#1976d2',
            borderRadius: '50%',
            padding: '1rem',
            mb: 2,
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          }}
        />
        <Typography
          variant="h2"
          fontWeight="bold"
          color="#ffffff"
          gutterBottom
          sx={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}
        >
          Drug Information Finder
        </Typography>
        <Typography
          variant="h6"
          color="white"
          sx={{
            maxWidth: '600px',
            mx: 'auto',
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          }}
        >
          Enter a drug name to instantly get its purpose, warnings, active
          ingredients, manufacturer, and more.
        </Typography>
      </Box>

      {/* Search Section */}
      <Box
        sx={{
          background: '#ffffff',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="Enter Drug Name"
              variant="outlined"
              fullWidth
              value={drugName}
              onChange={(e) => setDrugName(e.target.value)}
              InputProps={{
                style: { borderRadius: '30px' },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearch}
              disabled={loading}
              startIcon={!loading && <SearchIcon />}
              sx={{
                borderRadius: '30px',
                padding: '12px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #1976d2, #00aaff)',
                '&:hover': {
                  background: 'linear-gradient(to right, #1565c0, #0077cc)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography
          variant="h6"
          color="error"
          mt={4}
          textAlign="center"
          sx={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
        >
          {error}
        </Typography>
      )}

      {/* Drug Info Section */}
      {drugInfo && (
        <Box mt={4} sx={{ maxWidth: '600px', width: '100%' }}>
          <Card
            sx={{
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              borderRadius: '15px',
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ color: '#1976d2' }}
              >
                {drugInfo.openfda.brand_name || 'Unknown Drug'}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {drugInfo.openfda.generic_name || 'No Generic Name Available'}
              </Typography>
              {/* Additional Info */}
              <Box mt={2}>
                {drugInfo.indications_and_usage && (
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <HealingIcon color="success" />
                      Purpose
                    </Typography>
                    <Typography variant="body2">
                      {expanded.purpose
                        ? drugInfo.indications_and_usage[0]
                        : `${drugInfo.indications_and_usage[0]?.substring(0, 200)}... `}
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => handleToggleText('purpose')}
                        sx={{ textDecoration: 'underline', color: '#1976d2' }}
                      >
                        {expanded.purpose ? 'Read Less' : 'Read More'}
                      </Link>
                    </Typography>
                  </Box>
                )}

                {drugInfo.warnings && (
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="error"
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <WarningAmberIcon />
                      Warnings
                    </Typography>
                    <Typography variant="body2">
                      {expanded.warning
                        ? drugInfo.warnings[0]
                        : `${drugInfo.warnings[0]?.substring(0, 200)}... `}
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => handleToggleText('warning')}
                        sx={{ textDecoration: 'underline', color: '#d32f2f' }}
                      >
                        {expanded.warning ? 'Read Less' : 'Read More'}
                      </Link>
                    </Typography>
                  </Box>
                )}

                {/* Manufacturer Name */}
                {drugInfo.openfda.manufacturer_name && (
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <ScienceIcon color="primary" />
                      Manufacturer
                    </Typography>
                    <Typography variant="body2">
                      {drugInfo.openfda.manufacturer_name[0] || 'Manufacturer info not available.'}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default DrugSearch;
