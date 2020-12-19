import React from 'react'

export default function Table() {
    return (
        <div class="wrapper">        
            <form class="holder">      
                <label>Pick a date:</label>
                <input type="date" name="predictionDate"/>
                <input type="submit"/>
                <table class="table table-hover table-bordered results">
                    <thead>
                        <tr>
                        <th class="col-md-5 col-xs-5">State</th>
                        <th class="col-md-4 col-xs-4">Total Cases</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Delhi</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>UP</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>MP</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>UK</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
