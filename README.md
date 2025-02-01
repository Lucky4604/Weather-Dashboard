# Weather Dashboard

A real-time weather dashboard built with React.js, utilizing OpenWeatherMap API to fetch weather data. This app provides a user-friendly interface to search for cities and display weather details like temperature, humidity, wind speed, and weather conditions. The app auto-refreshes every 30 seconds to provide the most up-to-date information.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [API Integration](#api-integration)
4. [Getting Started](#getting-started)
5. [Usage](#usage)
6. [Error Handling](#error-handling)
7. [Local Storage](#local-storage)

---

## Features

- **Search for City**: Enter any city name to get real-time weather data.
- **Weather Details**: Displays temperature, humidity, wind speed, and weather conditions (e.g., sunny, rainy, etc.).
- **Weather Icons**: Displays an appropriate weather icon using OpenWeatherMap API.
- **Auto-refresh**: The app automatically updates weather data every 30 seconds.
- **Error Handling**: Graceful handling of errors like invalid city names or network issues.
- **Local Storage**: Saves the last searched city and loads its weather data when the user revisits the app.
- **Responsive UI**: A clean and mobile-friendly interface.

---

## Tech Stack

- **Frontend**: React.js, React Hooks (useState, useEffect, useContext)
- **State Management**: React Context API (or Redux if preferred)
- **Styling**: Taiwind CSS and Shadcn UI
- **API**: OpenWeatherMap API 
- **Optional**: React Query 

---

## API Integration

The weather data is fetched from [OpenWeatherMap API](https://openweathermap.org/api). You will need an API key to use this service.

### Example API Call:

Replace `YOUR_API_KEY` with your own OpenWeatherMap API key.

---

## Getting Started

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/weather-dashboard.git
```

### 2. Navigate to the project directory:

```bash
cd weather-dashboard
```

### 3. Install dependencies:

```bash
npm install
```

### 4. Start the development server:

```bash
npm start
```

The app should now be running on `http://localhost:3000`.

---

## Usage

1. **Search for a City**: Enter a city name in the search input box and hit enter. The weather information will be displayed on the page.
2. **Auto-refresh**: The weather data will automatically update every 30 seconds.
3. **Switch Between Celsius and Fahrenheit**: (Bonus) Allow the user to toggle between Celsius and Fahrenheit.

---

## Error Handling

The app handles various edge cases such as:

- **Invalid City Name**: Displays a user-friendly error message if the city name is incorrect.
- **Network Failure**: In case of a network issue, the user will be informed with a proper error message.
- **Empty Search**: Prevents the search input from being submitted if the input is empty.

---

## Local Storage

The app stores the last searched city in the browser's local storage. When the user revisits the app, the last searched city’s weather data is loaded automatically. This enhances user experience by allowing seamless revisits without needing to search again.



