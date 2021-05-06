import {useState} from 'react'

const Converter = () => {
  const [meters, setInput] = useState(0);
  const conversionRate = 100;
  return (
    <div>
      <label htmlFor='meterInput'>Meters to convert:</label>
      <input type="number" id='meterInput' value={meters} onChange={event => setInput(event.target.value)}/>{` m = ${meters * conversionRate} cm`}
    </div> 
  )
}

export default Converter