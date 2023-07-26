import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, useFormik } from "formik"
import { validation } from './validation'
import { useNavigate } from "react-router-dom"
import "./Home.css"
import {toast} from "react-toastify"

function Home() {

    const [messages] = useState({
        symbol: "",
        date: ""
    })
    const navigate = useNavigate()

    const [stock, setStock] = useState([])
    const { handleChange, handleSubmit, handleBlur, values } = useFormik({
        initialValues: messages,
        validationSchema: validation,
        onSubmit: (values) => {
            fetch(`https://api.polygon.io/v1/open-close/${values.symbol}/${values.date}?adjusted=true&apiKey=sDyqVkqdbDajijdYcI_oE0Y7WLpRAFou`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json'
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    if(res.status==="ERROR"){
                        toast("No data found, please try another date")
                    }else{
                        setStock(res)
                    }
                })
        }
    })
    console.log(stock)
    useEffect(() => {
        if (stock.length !== 0) {
            fetch("http://localhost:5000/api/fetchStockData", {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({ stock })
            })
            .then((res)=>res.json())
            .then((res)=>{
                console.log(res)
                if(res==="Data is already present"){
                    navigate("/data")
                    toast("Data is already present in backend")
                }else{
                    navigate("/data")
                    toast("Data added in back-end")
                }
            })
        }
    }, [stock])
    return (
        <div className='container'>
            <Formik>
                <Form onSubmit={handleSubmit} className='form'>
                    <div className='divInp'>
                        <label>
                            Stock Symbol
                        </label>
                        <Field onChange={handleChange} onBlur={handleBlur} values={values.symbol} type="textarea" name="symbol"></Field>
                    </div>
                    <div className='divInp'>
                        <label>
                            Date
                        </label>
                        <Field onChange={handleChange} onBlur={handleBlur} values={values.date} type="date" name="date" className="inpDate"></Field>
                    </div>
                    <div className='divInpBut'>
                        <button type="submit">Submit</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default Home
