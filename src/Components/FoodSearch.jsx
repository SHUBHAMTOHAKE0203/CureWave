import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  CircularProgress,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const FoodSearch = () => {
  const [query, setQuery] = useState('');
  const [foodData, setFoodData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [nutrientDetails, setNutrientDetails] = useState([]);

  const handleSearch = async () => {
    if (!query) {
      setError('Please enter a food name.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=mnv47hh5GWSxdtRPfWAlqYxbSaqygzS6SjtZM10t`
      );

      const food = response.data.foods[0];

      if (food) {
        setFoodData(food);
      } else {
        setError('No food data found.');
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = (nutrients) => {
    setNutrientDetails(nutrients);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'radial-gradient(circle, #f0f8ff, #e6ecff)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '-100px',
          left: '-150px',
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, #7faeff, #0056b3)',
          borderRadius: '50%',
          opacity: 0.2,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-150px',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, #7faeff, #0056b3)',
          borderRadius: '50%',
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#333', mb: 4, fontFamily: 'Poppins' }}
        >
          Explore Nutrition
        </Typography>
        <TextField
          label="Search for a food item"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
          sx={{
            width: '100%',
            maxWidth: 500,
            borderRadius: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            '& fieldset': { borderRadius: '12px' },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            mt: 2,
            padding: '12px 24px',
            borderRadius: '24px',
            background: 'linear-gradient(90deg, #007bff, #0056b3)',
            color: '#fff',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              background: 'linear-gradient(90deg, #0056b3, #003d80)',
            },
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Search'}
        </Button>
        {error && (
          <Typography
            color="error"
            sx={{
              mt: 2,
              fontWeight: 'bold',
              fontSize: '1rem',
              fontFamily: 'Poppins',
              textAlign: 'center',
            }}
          >
            {error}
          </Typography>
        )}
        {foodData && (
          <Card
            sx={{
              mt: 4,
              width: '100%',
              maxWidth: 600,
              borderRadius: '16px',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              animation: 'fadeIn 0.8s ease-in-out',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                {foodData.description || 'No description available'}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Food Group:</strong> {foodData.foodCategory || 'Unknown'}
              </Typography>
              {foodData.foodNutrients && (
                <div>
                  <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                    Nutritional Information (per 100g):
                  </Typography>
                  <ul>
                    {foodData.foodNutrients.slice(0, 5).map((nutrient) => (
                      <li key={nutrient.nutrientName}>
                        <strong>{nutrient.nutrientName}:</strong> {nutrient.value}{' '}
                        {nutrient.unitName}
                      </li>
                    ))}
                  </ul>
                  {foodData.foodNutrients.length > 5 && (
                    <Button
                      variant="outlined"
                      onClick={() => handleReadMore(foodData.foodNutrients)}
                      sx={{
                        mt: 2,
                        borderRadius: '24px',
                        color: '#007bff',
                        borderColor: '#007bff',
                        '&:hover': {
                          backgroundColor: '#f0f8ff',
                        },
                      }}
                    >
                      Read More
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Nutritional Details</DialogTitle>
        <DialogContent>
          <ul>
            {nutrientDetails.map((nutrient) => (
              <li key={nutrient.nutrientName}>
                <strong>{nutrient.nutrientName}:</strong> {nutrient.value}{' '}
                {nutrient.unitName}
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FoodSearch;
