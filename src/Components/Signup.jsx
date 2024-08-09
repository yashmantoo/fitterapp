import React, { useState } from "react"
import { register } from "./user";
import { Link} from "react-router-dom";
import { databases } from "../appwrite/appwrite";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function Signup(){
    const [name, setName] = useState("")
    const [gender, setGender] = useState("male")
    const [age, setAge] = useState()
    const [height, setHeight] = useState()
    const [weight, setWeight] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const DATABASE_ID = "660e556ea0d0b285d356"
    const COLLECTION_ID = "660e5642b61cf4524d75"

    const clickHandler = async() => {

        if(name && gender && age && height && weight && phone && email && password) {
            try{
                console.log(email)
                const res = await register(email, password, phone)
                console.log(res.status)
                if(res.status === true){
                    const bmi = (weight/(height*height))*10000
                    const tdee = 
                        gender === "male"
                            ? 1.2 * (10 * weight + 6.25 * height - 5 * age + 5)
                            : 1.2 * (10 * weight + 6.25 * height - 5 * age - 161)
                    let targetCalories
                    if(bmi < 18.5){
                        targetCalories = tdee + 250 
                    }
                    else if(bmi >=18.5 && bmi <= 24.9){
                        targetCalories = tdee
                    }
                    else{
                        targetCalories = tdee - 250
                    }
                    await databases.createDocument(
                        DATABASE_ID,
                        COLLECTION_ID,
                        phone,
                        {
                            Email: email.trim(),
                            name: name.trim(),
                            Gender: gender,
                            Age: Number(age),
                            Height: Number(height),
                            Weight: Number(weight),
                            Phone : Number(phone),
                            BMI: bmi,
                            TargetCalories: targetCalories,
                    
                    })
                    toast.success("Account Created Successfully, try login for more")
                }
                else{
                    toast.error("Please try again")
                }
            }
            catch(error){
                toast.error(error.message)
            }
        }
        else{
            toast.error("Please enter all the fields")
        }    
                
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Register
                        </h1>
                        <form className="space-y-4 md:space-y-4" action="#">
                            <div>
                                <input onChange={(e) => {setName(e.target.value)}} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required=""/>
                            </div>
                            <div>      
                                <input onChange={(e) => {setGender(e.target.value)}} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="gender" required=""/>
                            </div>
                            <div> 
                                <input onChange={(e) => {setAge(e.target.value)}} type="number" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="age" required=""/>
                            </div>
                            <div>
                                <input onChange={(e) => {setHeight(e.target.value)}} type="number" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="height" required=""/>
                            </div>
                            <div>
                                <input onChange={(e) => {setWeight(e.target.value)}} type="number" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="weight" required=""/>
                            </div>
                            <div>
                                <input onChange={(e) => {setPhone(e.target.value)}} type="number" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone" required=""/>
                            </div>
                            <div>
                                <input onChange={(e) => {setEmail(e.target.value)}} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                            </div>
                            <div>
                                <input onChange={(e) => {setPassword(e.target.value)}} type="password" name="password" id="password" placeholder="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                            </div>
                            <button onClick={clickHandler} type="button" className="btn btn-primary">Sign Up</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right"/>
        </section>
      );
}