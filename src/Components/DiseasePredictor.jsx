import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Alert, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  marginTop: '50px',
  padding: '20px',
  textAlign: 'center',
  background: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const DiseasePredictor = () => {
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPrediction = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://human-disease-detector.p.rapidapi.com/human_disease/predict',
        {
          symptoms: symptoms,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'human-disease-detector.p.rapidapi.com',
            'x-rapidapi-key': 'bf7da1f76bmshee18d06fcbdfa70p19237djsnd2784a2068e4',
            'x-token': 'Makshad Nai Bhoolna @ 2025',
          },
        }
      );
      setPrediction(response.data.disease); // Extract only the disease name
    } catch (error) {
      setError('Failed to predict the disease');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Disease Predictor
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        label="Enter symptoms (comma separated)"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={getPrediction}
        disabled={loading}
        sx={{ marginTop: '10px' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Predict Disease'}
      </Button>

      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {prediction && (
        <Box mt={3} p={2} border={1} borderColor="grey.300" borderRadius={2}>
          <Typography variant="h6">Prediction Result:</Typography>
          <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
            {prediction}
          </Typography>
        </Box>
      )}
    </StyledContainer>
  );
};

export default DiseasePredictor;
