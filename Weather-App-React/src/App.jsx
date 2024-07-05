import axios from "axios"
import { useState } from "react"

function App() {
  const [City, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  const apiKey = 'f398c1c5c167e15ed4e27331e6cb6257'

  const getWeather = async(city)=>{
    try {
      const response = await axios.get(` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      setWeather(response.data)

    } catch (error) {
      setError('City not found')
      setWeather(null)
    }
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    getWeather(City)
  }
  return (
    <div style={styles.container}>
      <h1>Weather Application</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
        type="text" 
        placeholder="Enther City" 
        value={City}
        onChange={(e)=>setCity(e.target.value)}
        style={styles.input}
        />
        <button type="submit" style={styles.button}>Get Weather</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {
        weather && <div style={styles.weather}>
        <h2>{weather.name}</h2>
        <p>{weather.weather[0].description}</p>
        <p>{Math.floor(weather.main.temp-273.15)} °C</p>

        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" />
      </div>
      }
    </div>
  )
}

const styles={
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    // background: '#f0f0f0',
    fontFamily: 'Arial, sana-serif',
    marginTop: '-20px'
  },

  form:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  input:{
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px'
  },

  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer'
  },

  error:{
    color: 'red'
  },

  weather:{
    textAlign: 'center'
  }
}

export default App
