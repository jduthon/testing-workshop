import {useState} from 'react'

const Converter = () => {
  const [count, setCount] = useState(0);
  return (
    
    <p><input type="number" value={count} onChange={event => setCount(event.target.value)}/></p>
  )
}

export default Converter