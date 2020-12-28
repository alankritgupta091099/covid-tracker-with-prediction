import React from 'react'

export default function Table({data, totalCases}) {
    return (
        <div className="wrapper">
            <form className="holder">      
                {/* <label>Pick a date:</label>
                <input type="date" name="predictionDate"/>
                <input type="submit"/> */}
                <h3>Total Cases: {totalCases}</h3>
                <table className="table table-hover table-bordered results">
                    <thead>
                        <tr>
                        <th className="col-md-5 col-xs-5">Country</th>
                        <th className="col-md-4 col-xs-4">Total Cases</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(country=>{
                                return (
                                    <tr>
                                        <td>{country.countryName}</td>
                                        <td>{country.cases}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </form>
        </div>
    )
}
