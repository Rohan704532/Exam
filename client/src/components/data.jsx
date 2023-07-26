import React, { useState } from 'react'
import { useEffect } from "react"
import {useNavigate} from "react-router-dom"
import "./data.css"

function Data() {
    const navigate=useNavigate()

    const [data, setData] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/api/getStockData", {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setData(res)
            })
    }, [])

    const backToHome = ()=>{
        navigate("/")
    }

    return (
        <div>
            {data.length !== 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Open</th>
                            <th scope="col">High</th>
                            <th scope="col">Low</th>
                            <th scope="col">Close</th>
                            <th scope="col">Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{data[data.length-1]["symbol"]}</th>
                            <td>{data[data.length-1]["open"]}</td>
                            <td>{data[data.length-1]["high"]}</td>
                            <td>{data[data.length-1]["low"]}</td>
                            <td>{data[data.length-1]["close"]}</td>
                            <td>{data[data.length-1]["volume"]}</td>
                        </tr>
                    </tbody>
                </table>
            ) : ""}
            <div className='buttonDiv'>
                <button className='button' onClick={backToHome}>Back to Home page</button>
            </div>
        </div>
    )
}

export default Data
