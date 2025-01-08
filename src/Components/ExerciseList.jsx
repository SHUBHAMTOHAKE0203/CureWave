import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";

const Workout = () => {
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const muscles = [
    "abdominals", "abductors", "adductors", "biceps", "calves", "chest",
    "forearms", "glutes", "hamstrings", "lats", "lower_back", "middle_back",
    "neck", "quadriceps", "traps", "triceps",
  ];

  useEffect(() => {
    if (!selectedMuscle) return;

    const fetchExercises = async () => {
      const apiHost = "exercises-by-api-ninjas.p.rapidapi.com";
      const apiKey = "bf7da1f76bmshee18d06fcbdfa70p19237djsnd2784a2068e4";

      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://${apiHost}/v1/exercises?muscle=${selectedMuscle}`,
          {
            headers: {
              "x-rapidapi-host": apiHost,
              "x-rapidapi-key": apiKey,
            },
          }
        );
        setExercises(response.data);
      } catch (err) {
        setError("Failed to fetch exercises. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [selectedMuscle]);

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Box sx={{ py: 4, px: 2, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
        Exercise Explorer
      </Typography>
      <Typography variant="body1" align="center" gutterBottom color="textSecondary">
        Select a muscle group to discover targeted exercises.
      </Typography>

      <FormControl fullWidth sx={{ my: 4 }}>
        <InputLabel>Muscle Group</InputLabel>
        <Select
          value={selectedMuscle}
          onChange={(e) => setSelectedMuscle(e.target.value)}
          label="Muscle Group"
        >
          <MenuItem value="">-- Choose a Muscle Group --</MenuItem>
          {muscles.map((muscle) => (
            <MenuItem key={muscle} value={muscle}>
              {muscle.charAt(0).toUpperCase() + muscle.slice(1).replace("_", " ")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography variant="body1" align="center" color="error" sx={{ mt: 4 }}>
          {error}
        </Typography>
      )}

      {exercises.length > 0 && !loading && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {exercises.map((exercise, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {exercise.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Type:</strong> {exercise.type}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Equipment:</strong> {exercise.equipment}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Difficulty:</strong> {exercise.difficulty}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Instructions:</strong>{" "}
                    {expandedIndex === index
                      ? exercise.instructions
                      : exercise.instructions.length > 150
                      ? `${exercise.instructions.substring(0, 150)}...`
                      : exercise.instructions}
                  </Typography>
                  {exercise.instructions.length > 150 && (
                    <Button
                      onClick={() => toggleReadMore(index)}
                      sx={{ mt: 2 }}
                      size="small"
                      variant="text"
                    >
                      {expandedIndex === index ? "Read Less" : "Read More"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {exercises.length === 0 && !loading && !error && selectedMuscle && (
        <Typography variant="body1" align="center" color="textSecondary" sx={{ mt: 4 }}>
          No exercises found for the selected muscle group.
        </Typography>
      )}

      {!selectedMuscle && (
        <Typography variant="body1" align="center" color="textSecondary" sx={{ mt: 4 }}>
          Please select a muscle group to view exercises.
        </Typography>
      )}
    </Box>
  );
};

export default Workout;
