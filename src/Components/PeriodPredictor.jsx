import React, { useState } from "react"
import { CalendarIcon, CheckCircle2Icon, XCircleIcon, DropletIcon, MoonIcon, SunIcon, HeartIcon, ArrowDownIcon, SmileIcon, MehIcon, FrownIcon, ThermometerIcon, ActivityIcon, BedIcon, PillIcon } from 'lucide-react'
import { addDays, format, parse } from "date-fns"

// Add styles for animations
const styles = `
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  .animate-spin-slow {
    animation: spin-slow 30s linear infinite;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;

// Add styles to document head
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Custom Button component
const Button = ({ children, onClick, className, disabled }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-white transform transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-95 ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

// Custom Card components
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl ${className}`}>
    {children}
  </div>
)

const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children, className }) => (
  <div className={`px-6 py-4 border-b ${className}`}>
    {children}
  </div>
)

const CardTitle = ({ children, className }) => (
  <h3 className={`text-xl font-semibold ${className}`}>
    {children}
  </h3>
)

// Custom Input component
const Input = ({ type, id, value, onChange, placeholder, className }) => (
  <input
    type={type}
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-3 py-2 border rounded-md ${className}`}
  />
)

// Custom Label component
const Label = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={`block mb-2 ${className}`}>
    {children}
  </label>
)

// Custom Slider component
const Slider = ({ min, max, step, value, onValueChange, className }) => (
  <input
    type="range"
    min={min}
    max={max}
    step={step}
    value={value}
    onChange={(e) => onValueChange([parseInt(e.target.value)])}
    className={`w-full ${className}`}
  />
)

export default function PeriodPredictor() {
  const [cycleLength, setCycleLength] = useState(28)
  const [lastPeriodDate, setLastPeriodDate] = useState("")
  const [prediction, setPrediction] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [mood, setMood] = useState("")
  const [symptoms, setSymptoms] = useState([])
  const [note, setNote] = useState("")
  const [showCalendar, setShowCalendar] = useState(false)

  // Predefined lists for tracking
  const moods = [
    { icon: SmileIcon, label: "Happy", value: "happy" },
    { icon: MehIcon, label: "Neutral", value: "neutral" },
    { icon: FrownIcon, label: "Sad", value: "sad" }
  ]

  const symptomsList = [
    { icon: DropletIcon, label: "Cramps", value: "cramps" },
    { icon: ThermometerIcon, label: "Headache", value: "headache" },
    { icon: ActivityIcon, label: "Fatigue", value: "fatigue" },
    { icon: BedIcon, label: "Bloating", value: "bloating" },
    { icon: PillIcon, label: "Nausea", value: "nausea" }
  ]

  const handlePredict = () => {
    if (!lastPeriodDate) {
      alert("Please enter the date of your last period.")
      return
    }

    try {
      // Parse the input date
      const lastDate = parse(lastPeriodDate, 'yyyy-MM-dd', new Date())

      // Calculate next cycle date
      const nextCycleDate = addDays(lastDate, cycleLength)

      // Calculate fertile window (typically 14 days before next period)
      const fertileWindowStart = addDays(nextCycleDate, -14)
      const fertileWindowEnd = addDays(fertileWindowStart, 5)

      // Calculate ovulation date (typically in the middle of fertile window)
      const ovulationDate = addDays(fertileWindowStart, 2)

      // Calculate following periods
      const followingPeriod = addDays(nextCycleDate, cycleLength)
      const thirdPeriod = addDays(followingPeriod, cycleLength)

      setPrediction({
        nextCycleDate: format(nextCycleDate, 'PPP'),
        fertileWindowStart: format(fertileWindowStart, 'PPP'),
        fertileWindowEnd: format(fertileWindowEnd, 'PPP'),
        ovulationDate: format(ovulationDate, 'PPP'),
        followingPeriod: format(followingPeriod, 'PPP'),
        thirdPeriod: format(thirdPeriod, 'PPP')
      })
    } catch (error) {
      alert("Please enter a valid date.")
    }
  }

  const handleSendSMS = async () => {
    if (!phoneNumber) {
      alert("Please enter your phone number.");
      return;
    }
  
    if (!prediction) {
      alert("Please get predictions first.");
      return;
    }
    const calendarLink = 'https://calendar.google.com/calendar/'; // Replace with a dynamic link if needed
  
    // Prepare the message to send
    const message = `
🌟 *Welcome to CureWave!* 🌟

🩸 *Next Period Date*: ${prediction.nextCycleDate}
⏳ *Fertile Window*: ${prediction.fertileWindowStart} to ${prediction.fertileWindowEnd}

📅 *Add to Calendar*: Click the link below to add your next period to your calendar:  
${calendarLink}

💡 *Recommendations for Each Phase*:

📍 *Menstruation Phase*:  
  ✅ Stay hydrated, eat iron-rich foods like spinach, and take short walks to reduce cramps.  
  ❌ Avoid excessive caffeine and skipping meals.

📍 *Fertile Window*:  
  ✅ Eat foods rich in folic acid (like broccoli and lentils) and engage in light exercise.  
  ❌ Avoid stress and consuming junk food.

📍 *Luteal Phase*:  
  ✅ Include magnesium-rich foods (like nuts) and practice relaxation techniques.  
  ❌ Avoid too much salt and strenuous activities.

📍 *Follicular Phase*:  
  ✅ Consume protein-rich foods, Omega-3 fatty acids, and engage in moderate exercise.  
  ❌ Avoid skipping meals and processed foods.

📍 *Ovulation*:  
  ✅ Stay active, include zinc-rich foods, and maintain hydration.  

  ❌ Avoid overexertion and excessive sugar.`;

  ❌ Avoid overexertion and excessive sugar.`;

      const url = `http://api.textmebot.com/send.php?recipient=${phoneNumber}&apikey=L2re7ZLwcGMu&text=${encodeURIComponent(
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


  
    // Construct the API URL with parameters
    const url = `http://api.textmebot.com/send.php?recipient=${phoneNumber}&apikey=L2re7ZLwcGMu&text=${encodeURIComponent(
      message
    )}`;
  
    try {
      // Make the API call
      const response = await fetch(url);
  
      if (response.ok) {
        alert("SMS sent successfully!");
      } else {
        throw new Error("Failed to send SMS");
      }
    } catch (error) {
      // Handle errors gracefully
      alert("Failed to send SMS. Please try again later.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section - Fixed height and responsive padding */}
      <section className="relative h-[400px] md:h-[400px] bg-gradient-to-br from-blue-600 to-blue-400 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.white)_1px,transparent_0)] bg-[size:20px_20px] opacity-10" />
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <h1 className="text-4xl md:text-5xl text-center font-bold mb-4">Understanding Your Cycle</h1>
          <p className="text-lg md:text-xl text-center items-center opacity-90">
            Track, predict, and understand your menstrual cycle with our comprehensive period tracking tool.
            Get personalized insights and recommendations for better health management.
          </p>
          <ArrowDownIcon className="w-8 h-8 mt-8 animate-bounce transition-all duration-300 ease-in-out hover:text-blue-200" />
        </div>
      </section>

      {/* Main Content - Adjusted positioning and responsive layout */}
      <div className="container mx-auto px-4 -mt-40 relative z-10">
        {/* Calendar View Toggle */}
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => setShowCalendar(!showCalendar)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {showCalendar ? "Hide Calendar" : "Show Calendar"}
          </Button>
        </div>

        {/* Calendar View */}
        {showCalendar && (
          <Card className="mb-8 overflow-hidden bg-white">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-2xl font-bold text-blue-800">Calendar View</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => {
                  const date = new Date()
                  date.setDate(date.getDate() - 15 + i)
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg p-2 text-center ${i % 7 === 0 || i % 7 === 6 ? 'bg-gray-50' : 'bg-white'} 
                        hover:bg-blue-50 transition-colors border border-gray-100 cursor-pointer
                        ${prediction && date >= parse(lastPeriodDate, 'yyyy-MM-dd', new Date()) &&
                          date <= addDays(parse(lastPeriodDate, 'yyyy-MM-dd', new Date()), 5) ? 'bg-red-100 hover:bg-red-200' : ''}`}
                    >
                      <span className="text-sm">{date.getDate()}</span>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 flex gap-4 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 rounded"></div>
                  <span>Period Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-100 rounded"></div>
                  <span>Fertile Window</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 rounded"></div>
                  <span>Ovulation Day</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mood and Symptom Tracking */}
        <Card className="mb-6 ml-8 mr-8 shadow-xl">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-2xl font-bold text-blue-800">Daily Tracking</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-4">How are you feeling today?</h3>
                <div className="flex gap-4">
                  {moods.map(({ icon: Icon, label, value }) => (
                    <button
                      key={value}
                      onClick={() => setMood(value)}
                      className={`flex-1 flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${mood === value ? 'bg-blue-100 shadow-md' : 'bg-white hover:bg-blue-50'}`}
                    >
                      <Icon className={`w-8 h-8 mb-2 ${mood === value ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span className={mood === value ? 'text-blue-600 font-medium' : 'text-gray-600'}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Symptoms</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {symptomsList.map(({ icon: Icon, label, value }) => (
                    <button
                      key={value}
                      onClick={() => setSymptoms(prev =>
                        prev.includes(value)
                          ? prev.filter(s => s !== value)
                          : [...prev, value]
                      )}
                      className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${symptoms.includes(value) ? 'bg-blue-100 shadow-md' : 'bg-white hover:bg-blue-50'}`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${symptoms.includes(value) ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span className={`text-sm ${symptoms.includes(value) ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="note" className="text-lg text-blue-700">Notes</Label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add any additional notes about your day..."
                  className="w-full px-3 py-2 border rounded-md h-24 resize-none"
                />
              </div>

              <Button
                onClick={() => {
                  // TODO: Implement saving tracking data
                  alert("Tracking data saved!")
                  setMood("")
                  setSymptoms([])
                  setNote("")
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
              >
                Save Today's Tracking
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Period Prediction */}
        <Card className="shadow-2xl mb-7 mr-8 ml-8">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">Start Your Journey</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="lastPeriodDate" className="text-lg text-blue-700">
                    When did your last period start?
                  </Label>
                  <Input
                    type="date"
                    id="lastPeriodDate"
                    value={lastPeriodDate}
                    onChange={(e) => setLastPeriodDate(e.target.value)}
                    className="mt-2 text-lg"
                  />
                </div>
                <div>
                  <Label className="text-lg text-blue-700">
                    Cycle Length: {cycleLength} days
                  </Label>
                  <Slider
                    min={21}
                    max={35}
                    step={1}
                    value={[cycleLength]}
                    onValueChange={(value) => setCycleLength(value[0])}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-lg text-blue-700">
                    Get SMS Updates
                  </Label>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Your phone number"
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Did You Know?</h3>
                <ul className="space-y-3 text-blue-700">
                  <li className="flex items-start">
                    <CheckCircle2Icon className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                    The average menstrual cycle is 28 days, but cycles can range from 21 to 35 days
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2Icon className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                    Tracking your cycle can help identify patterns and potential health issues
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2Icon className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                    Your cycle affects energy levels, mood, and even skin health
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <Button
                onClick={handlePredict}
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
              >
                Get Predictions
              </Button>
              <Button
                onClick={handleSendSMS}
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                disabled={!prediction}
              >
                Send SMS Updates
              </Button>

            </div>
          </CardContent>
        </Card>

        {/* Cycle Visualization */}
        {prediction && (
          <Card className="mt-6 mb-8 overflow-hidden bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
            <CardHeader className="bg-white/50 backdrop-blur-sm">
              <CardTitle className="text-2xl font-bold text-blue-800">Your Cycle Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative w-full max-w-2xl mx-auto aspect-square">
                {/* Outer circle */}
                <div className="absolute inset-0 rounded-full border-8 border-gray-100" />

                {/* Phase segments */}
                {[
                  { phase: "Menstrual", days: "1-5", color: "from-red-400 to-red-300", rotation: "rotate-0" },
                  { phase: "Follicular", days: "6-13", color: "from-yellow-400 to-yellow-300", rotation: "rotate-45" },
                  { phase: "Ovulation", days: "14-16", color: "from-green-400 to-green-300", rotation: "rotate-180" },
                  { phase: "Luteal", days: "17-28", color: "from-violet-400 to-violet-300", rotation: "rotate-270" }
                ].map((item, index) => (
                  <div
                    key={item.phase}
                    className={`absolute inset-0 ${item.rotation} transition-transform duration-500 ease-in-out`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 rounded-full transform origin-center scale-95 hover:scale-100 transition-all duration-300 cursor-pointer group`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h4 className="font-semibold text-gray-900">{item.phase} Phase</h4>
                          <p className="text-sm text-gray-600">Days {item.days}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-full w-2/3 h-2/3 flex flex-col items-center justify-center shadow-lg">
                    <h3 className="text-2xl font-bold text-blue-800 mb-2">Next Period</h3>
                    <p className="text-lg text-blue-600">{prediction.nextCycleDate}</p>
                    <div className="w-16 h-1 bg-blue-200 rounded-full my-3" />
                    <p className="text-sm text-gray-600">Cycle Length</p>
                    <p className="text-xl font-semibold text-gray-800">{cycleLength} days</p>
                  </div>
                </div>

                {/* Animated markers */}
                <div className="absolute inset-0 animate-spin-slow">
                  {[0, 90, 180, 270].map((rotation, index) => (
                    <div
                      key={index}
                      className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 transform -translate-y-1/2"
                      style={{ transform: `rotate(${rotation}deg) translateY(-50%)` }}
                    >
                      <div className="w-full h-full bg-white rounded-full shadow-md pulse" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-8 relative">
                <div className="absolute left-0 right-0 h-1 bg-gray-200 top-1/2 transform -translate-y-1/2 rounded-full" />
                <div className="relative flex justify-between">
                  {[
                    { date: prediction.nextCycleDate, label: "Next Period", color: "bg-red-400" },
                    { date: prediction.ovulationDate, label: "Ovulation", color: "bg-green-400" },
                    { date: prediction.followingPeriod, label: "Following Period", color: "bg-purple-400" }
                  ].map((event, index) => (
                    <div key={index} className="flex flex-col items-center relative">
                      <div className={`w-4 h-4 ${event.color} rounded-full shadow-lg z-10`} />
                      <div className="mt-4 text-center">
                        <p className="font-medium text-gray-800">{event.label}</p>
                        <p className="text-sm text-gray-600">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {prediction && (
          <Card className="mt-6 mb-8 overflow-hidden bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 transform transition-all duration-500 ease-in-out animate-fadeIn">
            <CardHeader className="bg-white/50 backdrop-blur-sm">
              <CardTitle className="text-2xl font-bold text-blue-800">Your Cycle Predictions</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/70 rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-blue-900 mb-2">Next Three Cycles</h4>
                    <div className="space-y-2 text-gray-800">
                      <p className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-pink-500" />
                        <span>Next: {prediction.nextCycleDate}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-purple-500" />
                        <span>Following: {prediction.followingPeriod}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-blue-500" />
                        <span>Third: {prediction.thirdPeriod}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/70 rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-blue-900 mb-2">Fertility Window</h4>
                    <div className="space-y-2 text-gray-800">
                      <p className="flex items-center gap-2">
                        <HeartIcon className="w-4 h-4 text-red-500" />
                        <span>Fertile: {prediction.fertileWindowStart} to {prediction.fertileWindowEnd}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <SunIcon className="w-4 h-4 text-yellow-500" />
                        <span>Ovulation: {prediction.ovulationDate}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Understanding Your Cycle */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Understanding Your Cycle Phases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Menstrual Phase (Days 1-5)",
                description: "The beginning of your cycle when menstruation occurs. The uterine lining is shed, and hormone levels are at their lowest.",
                symptoms: ["Cramps", "Fatigue", "Lower back pain"],
                dos: ["Rest adequately", "Stay hydrated", "Eat iron-rich foods"],
                donts: ["Avoid excessive caffeine", "Skip intense workouts", "Neglect hygiene"],
                bgColor: "bg-red-200 hover:bg-red-300",
                borderColor: "border-red-400",
                iconColor: "text-red-700"
              },
              {
                title: "Follicular Phase (Days 6-13)",
                description: "Estrogen levels rise as your body prepares for ovulation. You might feel more energetic and creative during this time.",
                symptoms: ["Increased energy", "Better mood", "Clear skin"],
                dos: ["Start new projects", "Exercise regularly", "Socialize"],
                donts: ["Overcommit yourself", "Ignore sleep schedule", "Skip meals"],
                bgColor: "bg-yellow-200 hover:bg-yellow-300",
                borderColor: "border-yellow-400",
                iconColor: "text-yellow-700"
              },
              {
                title: "Ovulation Phase (Days 14-16)",
                description: "The release of an egg from your ovary. This is when you're most fertile and might notice changes in your body.",
                symptoms: ["Mild cramping", "Changes in discharge", "Increased libido"],
                dos: ["Track fertility signs", "Stay active", "Maintain healthy diet"],
                donts: ["Ignore body signals", "Stress yourself", "Dehydrate"],
                bgColor: "bg-green-200 hover:bg-green-300",
                borderColor: "border-green-400",
                iconColor: "text-green-700"
              },
              {
                title: "Luteal Phase (Days 17-28)",
                description: "Post-ovulation phase where progesterone rises. You might experience PMS symptoms during this time.",
                symptoms: ["Mood changes", "Bloating", "Breast tenderness"],
                dos: ["Practice self-care", "Eat balanced meals", "Get enough sleep"],
                donts: ["Consume excess salt", "Skip exercise", "Ignore emotions"],
                bgColor: "bg-violet-200 hover:bg-violet-300",
                borderColor: "border-violet-400",
                iconColor: "text-violet-700"
              }
            ].map((phase, index) => (
              <Card
                key={index}
                className={`${phase.bgColor} border-2 ${phase.borderColor} shadow-lg transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl ${phase.iconColor}`}
              >
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{phase.title}</h3>
                  <p className="text-gray-700 mb-6">{phase.description}</p>

                  <div className="bg-white/50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Common Symptoms:</h4>
                    <ul className="space-y-1">
                      {phase.symptoms.map((symptom, idx) => (
                        <li key={idx} className="text-gray-700 flex items-center gap-2">
                          <DropletIcon className={`w-4 h-4 ${phase.iconColor}`} />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Do's:</h4>
                      <ul className="space-y-2">
                        {phase.dos.map((item, idx) => (
                          <li key={idx} className="text-gray-700 flex items-start gap-2">
                            <CheckCircle2Icon className={`w-4 h-4 ${phase.iconColor} mt-1`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white/50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Don'ts:</h4>
                      <ul className="space-y-2">
                        {phase.donts.map((item, idx) => (
                          <li key={idx} className="text-gray-700 flex items-start gap-2">
                            <XCircleIcon className={`w-4 h-4 ${phase.iconColor} mt-1`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Health & Wellness Guide */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Health & Wellness Guide</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Nutrition Tips",
                icon: "🥗",
                tips: [
                  "Increase iron intake during menstruation",
                  "Eat complex carbs to manage cravings",
                  "Stay hydrated throughout your cycle",
                  "Include omega-3 rich foods",
                  "Boost calcium intake during luteal phase"
                ]
              },
              {
                title: "Exercise Guide",
                icon: "🏃‍♀️",
                tips: [
                  "Light exercises during menstruation",
                  "High-intensity workouts during follicular phase",
                  "Strength training during ovulation",
                  "Yoga and stretching during luteal phase",
                  "Listen to your body's needs"
                ]
              },
              {
                title: "Mental Wellness",
                icon: "🧘‍♀️",
                tips: [
                  "Practice daily meditation",
                  "Journal your emotions",
                  "Maintain social connections",
                  "Get adequate sleep",
                  "Practice stress management"
                ]
              }
            ].map((section, index) => (
              <Card key={index} className="bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] transform">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{section.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle2Icon className="w-5 h-5 mt-1 text-blue-500" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Essential Knowledge */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Essential Knowledge</h2>
          <Card className="bg-blue-200">
            <CardContent className="p-5">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Concerns</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <DropletIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Irregular Periods</h4>
                        <p className="text-gray-700">Variations in cycle length are common. Consult a healthcare provider if irregularity persists.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <HeartIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Severe Cramps</h4>
                        <p className="text-gray-700">While some discomfort is normal, severe pain should be evaluated by a professional.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <MoonIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">PMS Symptoms</h4>
                        <p className="text-gray-700">Lifestyle changes and stress management can help alleviate PMS symptoms.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">When to Seek Help</h3>
                  <ul className="space-y-3">
                    {[
                      "Periods lasting longer than 7 days",
                      "Severe pain that interferes with daily activities",
                      "Bleeding between periods",
                      "Missing three or more periods",
                      "Sudden changes in cycle length or flow"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <XCircleIcon className="w-5 h-5 mt-1 text-red-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer Note */}
        <footer className="text-center text-gray-600 py-8">
          <p className="max-w-2xl mx-auto">
            Disclaimer: This tool provides estimates based on average menstrual cycles.
            Individual cycles may vary. Always consult with healthcare professionals for
            medical advice and concerns about your menstrual health.
          </p>
        </footer>
      </div>
    </div>
  )
}
