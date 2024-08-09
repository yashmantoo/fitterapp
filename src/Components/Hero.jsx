import React, { useState} from 'react'
import heroImg from "../assets/heroImg.jpg"
import axios from 'axios'
import { databases } from "../appwrite/appwrite";
import { getUser } from './user';

const user = await getUser()
const id = user?.$id
function Hero() {
  const DATABASE_ID = "660e556ea0d0b285d356"
  const COLLECTION_ID = "660e5642b61cf4524d75"
  let cal = 0
  const [n, setN] = useState(0)
  const [cb, setCb] = useState()
  
    // Initial state with one row
    const [rows, setRows] = useState([{ id: Date.now(), value: '' }])
  
    // Function to add a new row
    const addRow = () => {
      setRows([...rows, { id: Date.now(), value: '' }])
      
    };
  
    // Function to remove a row by id
    const removeRow = (id) => {
      setRows(rows.filter((row) => row.id !== id))
      
    };
  
    // Function to handle input change
    const handleInputChange = (id, value) => {
      const updatedRows = rows.map((row) =>
        row.id === id ? { ...row, value } : row
      );
      setRows(updatedRows)
      
    };
    const submit = async() => {
      
      const caloriePromise = rows.map(async(row) => {
        const options = {
          method: 'GET',
          url: 'https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data',
          params: {
            'nutrition-type': 'cooking',
            ingr: row.value
          },
          headers: {
            'x-rapidapi-key': 'f024ab3791msh2f14714cb101797p15f848jsn2e879d27af80',
            'x-rapidapi-host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com'
          }
        }
        try {
          const response = await axios.request(options)
          console.log(response.data)
          cal += response.data.calories
        } catch (error) {
          console.log(error)
        }
        
      })
      await Promise.all(caloriePromise)
      console.log(cal)
      setN(cal)

    }
    const finalSubmit = async () => {
      const result = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id
      )
      
      const tar = result.TargetCalories
      const previousBank = result.CalorieBank
      
      setCb(previousBank+tar-n)
      
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        {
          CalorieBank: cb
        }
      )
      console.log(result.CalorieBank)
    }
    

    return (
      <div className="hero min-h-screen" style={{backgroundImage: `url("${heroImg}")`}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content">
        <table>
        <thead>
          <tr>
            <button onClick={addRow}>Press to Add Food</button>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                
                <input className='text-black'
                  type="text"
                  placeholder='Food item with quantity'
                  value={row.value}
                  onChange={(e) => handleInputChange(row.id, e.target.value)}
                />
              </td>
              <td>
                <button className=' text-2xl font-extrabold' onClick={() => removeRow(row.id)}>-</button>
                <button onClick={addRow} className='ml-2 text-2xl font-extrabold'>+</button>
                
              </td>
            </tr>
          ))}
          <h4>{n} Calories</h4>
          <button className='mt-4 btn btn-outline pt-0' onClick={submit}>Add all the food</button>
          <button className='mt-4 btn btn-outline pt-0' onClick={finalSubmit}>Final Submit</button>
        </tbody>
        <h4 className='mt-4'> You have a Calorie Bank of {cb}</h4>
      </table>
      
      
        </div>
        
      </div>
    )
  
  
    
}

export default Hero