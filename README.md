# Curewave

Welcome to **Curewave**, your ultimate health management platform built by the UnbelievAPI Team. Curewave empowers users with personalized health solutions, secure medical record management, and real-time access to critical features—all within a seamless digital experience. Whether you’re locating nearby hospitals in emergencies or scheduling appointments, Curewave has you covered! ([medium.com](https://medium.com/%40shubhamtohakecoc07/curewave-your-ultimate-health-management-platform-f17d2695deef))

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Environment Variables](#environment-variables)
  * [Running the App](#running-the-app)
* [API Integrations](#api-integrations)
* [Usage](#usage)
* [Contributing](#contributing)
* [Future Roadmap](#future-roadmap)
* [License](#license)

## Features

* **Nearby Hospital Locator**: Quickly find hospitals using Leaflet with OpenStreetMap, Overpass API, and Google Maps integrations. View detailed info such as names, addresses, and contacts on an interactive map. 3
* **User Authentication & Authorization**: Secure sign-up and sign-in powered by Firebase Authentication with real-time database updates on the patient dashboard. 
* **Comprehensive Health Records**: Aggregate and view your medical history from multiple providers via MongoDB API integration. 
* **Appointment Scheduling**: Effortlessly book, reschedule, or cancel appointments through the Acuity Scheduling API. 
* **Pharmacy Finder**: Locate nearby pharmacies with real-time navigation. 
* **Nutrition Finder**: Personalized dietary recommendations powered by Spoonacular API. 
* **BMI Calculator**: Instantly calculate your Body Mass Index for goal setting. 
* **Drug Information**: Access detailed drug data using the FDA Drug Label API. 
* **Exercise Guides**: Customized workout plans via Exercises by API Ninjas. 
* **Menstrual Cycle Predictor**: Precision tracking and reminders for menstrual health. 
* **Air Quality Information**: Real-time air quality updates through Weatherbit API. 
* **Health News**: Curated health trends and research delivered with NewsAPI. 
* **Healthy Recipe Finder**: Discover recipes tailored to your dietary needs with the USDA FoodData Central API. 

## Tech Stack

* **Frontend**: ReactJS for dynamic, responsive UI 0
* **Styling**: TailwindCSS for clean, customizable design 
* **Backend**: Express.js for robust API handling and integrations 
* **Database**: MongoDB for secure, efficient health data storage 
* **Authentication**: Firebase Authentication and real-time database 
* **API Testing**: Postman for workflow management and endpoint testing 

## Getting Started

### Prerequisites

* Node.js (>= 14.x)
* npm or yarn
* MongoDB instance or cluster
* Firebase project credentials

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/UnbelievAPI/Curewave.git  
   cd Curewave
   ```
2. Install dependencies:

   ```bash
   npm install
   # or yarn install
   ```

### Environment Variables

Create a `.env` file in the root directory and configure:

```bash
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
MONGODB_URI=
OPENSTREETMAP_TOKEN=
ACUITY_API_KEY=
SPOONACULAR_API_KEY=
# ... other API keys
```

### Running the App

```bash
npm start
# or yarn start
```

The app will launch at `http://localhost:3000`.

## API Integrations

Curewave leverages several third-party APIs to power its features:

| API                       | Purpose                                  |
| ------------------------- | ---------------------------------------- |
| Leaflet OpenStreetMap API | Interactive mapping                      |
| Overpass API              | Location data for hospitals & pharmacies |
| Spoonacular API           | Nutrition and recipe suggestions         |
| Acuity Scheduling API     | Appointment management                   |
| USDA FoodData Central API | Nutritional insights                     |
| FDA Drug Label API        | Drug information                         |
| Exercises by API Ninjas   | Exercise data                            |
| TextMeBot API             | Notifications and reminders              |
| Weatherbit API            | Air quality data                         |
| NewsAPI                   | Health news updates                      |

Refer to the [API Workflow](#) section in Postman collection for endpoint details. 12

## Usage

1. Sign up or log in via Firebase Authentication.
2. Explore the dashboard to view health records, emergency tools, and personalized recommendations.
3. Use the interactive map to locate hospitals or pharmacies.
4. Schedule appointments seamlessly.
5. Track health metrics like BMI and menstrual cycles.

## Contributing

We welcome contributions of all kinds! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) to get started. Whether it's improving documentation, adding new features, or fixing bugs, your help is appreciated. 18

## Future Roadmap

* **AI-driven Analytics**: Personalized health insights based on user data. 
* **Multilingual Support**: Expanding global reach with multiple languages. 
* **Mobile Application**: Dedicated iOS and Android apps for on-the-go access. 
* **Healthcare Provider Portal**: Secure collaboration between patients and providers.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
