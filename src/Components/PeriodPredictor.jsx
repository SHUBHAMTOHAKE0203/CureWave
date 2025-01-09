import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Tooltip,
  
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial",
  },
});

const PeriodPredictor = () => {
  const [cycleLength, setCycleLength] = useState(28);
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Enter Cycle Details",
    "Review Prediction",
    "Explore Recommendations",
  ];

  const handleNext = () => {
    if (activeStep === 0 && !lastPeriodDate) {
      alert("Please enter the date of your last period.");
      return;
    }

    if (activeStep === 0) {
      const lastDate = new Date(lastPeriodDate);
      const nextCycleDate = new Date(lastDate);
      nextCycleDate.setDate(lastDate.getDate() + cycleLength);

      const fertileWindowStart = new Date(nextCycleDate);
      fertileWindowStart.setDate(nextCycleDate.getDate() - 14);

      const fertileWindowEnd = new Date(fertileWindowStart);
      fertileWindowEnd.setDate(fertileWindowStart.getDate() + 5);

      setPrediction({
        nextCycleDate: nextCycleDate.toDateString(),
        fertileWindowStart: fertileWindowStart.toDateString(),
        fertileWindowEnd: fertileWindowEnd.toDateString(),
      });
    }

    if (activeStep === 1 && phoneNumber) {
      const eventTitle = "Next Period Reminder";
      const eventDetails = {
        title: eventTitle,
        details: "Stay informed about your menstrual cycle and plan accordingly!",
        location: "",
        startDate: new Date(prediction.nextCycleDate)
          .toISOString()
          .replace(/-|:|\.\d+/g, ""),
        endDate: new Date(
          new Date(prediction.nextCycleDate).getTime() + 24 * 60 * 60 * 1000
        )
          .toISOString()
          .replace(/-|:|\.\d+/g, ""),
      };

      const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        eventDetails.title
      )}&dates=${eventDetails.startDate}/${eventDetails.endDate}&details=${encodeURIComponent(
        eventDetails.details
      )}&location=${encodeURIComponent(eventDetails.location)}`;

      const message = `
🌟 Welcome to CureWave! 🌟

🩸 Next Period Date: ${prediction.nextCycleDate}
⏳ Fertile Window: ${prediction.fertileWindowStart} to ${prediction.fertileWindowEnd}

📅 Add to Calendar: Click the link below to add your next period to your calendar:  
${calendarLink}

💡 Recommendations for Each Phase:

📍 Menstruation Phase:  
  ✅ Stay hydrated, eat iron-rich foods like spinach, and take short walks to reduce cramps.  
  ❌ Avoid excessive caffeine and skipping meals.

📍 Fertile Window:  
  ✅ Eat foods rich in folic acid (like broccoli and lentils) and engage in light exercise.  
  ❌ Avoid stress and consuming junk food.

📍 Luteal Phase:  
  ✅ Include magnesium-rich foods (like nuts) and practice relaxation techniques.  
  ❌ Avoid too much salt and strenuous activities.

📍 Follicular Phase:  
  ✅ Consume protein-rich foods, Omega-3 fatty acids, and engage in moderate exercise.  
  ❌ Avoid skipping meals and processed foods.

📍 Ovulation:  
  ✅ Stay active, include zinc-rich foods, and maintain hydration.  
  ❌ Avoid overexertion and excessive sugar.`;

      const url = `http://api.textmebot.com/send.php?recipient=${phoneNumber}&apikey=XMBgL2bbp58a&text=${encodeURIComponent(
        message
      )}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log("Message sent:", data);
          alert("Prediction message sent successfully!");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          
        });
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const chartData = {
    labels: ["Day 1", "Day 7", "Day 14", "Day 21", "Day 28"],
    datasets: [
      {
        label: "Hormone Levels",
        data: [1, 3, 5, 3, 1],
        borderColor: "#3f51b5",
        fill: false,
      },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ padding: 4 }}>
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" color="primary">
              Menstrual Cycle Predictor
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} alternativeLabel sx={{ marginY: 4 }}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Period Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Cycle Length (in days)"
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </Grid>

              <Grid item xs={12} align="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && prediction && (
            <Box sx={{ textAlign: "center" }}>
              <Card elevation={4} sx={{ padding: 2, borderRadius: 2, marginY: 2 }}>
                <Typography variant="h5" color="secondary">
                  Prediction
                </Typography>
                <CardContent>
                  <Typography variant="h6">
                    <CheckCircleIcon color="primary" /> Next Period Start Date:{" "}
                    {prediction.nextCycleDate}
                  </Typography>
                  <Typography variant="h6">
                    <CheckCircleIcon color="primary" /> Fertile Window:{" "}
                    {prediction.fertileWindowStart} to {prediction.fertileWindowEnd}
                  </Typography>
                </CardContent>
              </Card>
              <Line data={chartData} />
              <Box mt={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleBack}
                  sx={{ marginRight: 2 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Box>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h5" align="center" gutterBottom>
                Recommendations
              </Typography>

              <Grid container spacing={4}>
                {[
                  {
                    phase: "Menstruation",
                    do: "Stay hydrated, eat iron-rich foods, take short walks.",
                    dont: "Avoid excessive caffeine, skipping meals.",
                  },
                  {
                    phase: "Fertile Window",
                    do: "Eat folic acid-rich foods, engage in light exercise.",
                    dont: "Avoid stress, junk food.",
                  },
                  {
                    phase: "Luteal Phase",
                    do: "Include magnesium-rich foods, practice relaxation.",
                    dont: "Avoid too much salt, strenuous activities.",
                  },
                  {
                    phase: "Follicular Phase",
                    do: "Consume protein-rich foods, Omega-3s, moderate exercise.",
                    dont: "Avoid skipping meals, processed foods.",
                  },
                  {
                    phase: "Ovulation",
                    do: "Stay active, include zinc-rich foods, maintain hydration.",
                    dont: "Avoid overexertion, excessive sugar.",
                  },
                ].map((item, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card elevation={3} sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="h6" color="primary">
                          {item.phase}
                        </Typography>
                        <Typography>
                          <Tooltip title="Recommended Actions">
                            <CheckCircleIcon color="secondary" />
                          </Tooltip>{" "}
                          <b>Do:</b> {item.do}
                        </Typography>
                        <Typography>
                          <Tooltip title="Avoid These">
                            <CancelIcon color="error" />
                          </Tooltip>{" "}
                          <b>Don't:</b> {item.dont}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box mt={4} textAlign="center">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default PeriodPredictor;