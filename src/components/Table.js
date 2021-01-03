import React,{useState} from 'react'
import axios from 'axios';

export default function Table({data, totalCases}) {

    const [dates, setDate] = useState([])
    const [relativeDiff, setrelativeDiff] = useState(0)
    const [predictedCases, setPredtctedCases] = useState(0)
    function getdata() {        
        axios
            .get('http://ec2-15-206-116-200.ap-south-1.compute.amazonaws.com:8080/predict')
            .then((result) => {
                var datesArr = Object.keys(result.data);
                var finalArr = [];
                for (let i = 0; i < datesArr.length; i++) {
                    const date = datesArr[i];
                    finalArr.push({
                        'Date':date,
                        'Count':result.data[date]
                    })
                }
                setDate(finalArr)
                var percDiff =  100 * Math.abs( (totalCases - finalArr[0].Count) / ( (totalCases+finalArr[0].Count)/2 ) )
                setrelativeDiff(percDiff.toFixed(2));
                setPredtctedCases(finalArr[0].Count)
            }).catch((err) => {
                console.log(err)
            });        
    }
    
    return (
        <>
        <div class="modal fade" id="myModal" data-backdrop="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Worldwide Predicted Cases(next 9 Days)</h4>
                        </div>
                        <div class="modal-body">
                            <form className="holder" style={{marginLeft:'10rem'}}>
                                <p>Relative difference between Todays's actual cases ({totalCases}) & predicted cases ({predictedCases}) is: {relativeDiff} %</p>
                            <table className="table table-hover table-bordered results">
                                <thead>
                                    <tr>
                                    <th className="col-md-5 col-xs-5">Date</th>
                                    <th className="col-md-4 col-xs-4">Total Cases</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dates.map(obj=>{
                                            return (
                                                <tr>
                                                    <td>{obj.Date}</td>
                                                    <td>{obj.Count}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>        
                </div>
            </div>

        <div className="wrapper">
            <form className="holder">
                <h3>Total Cases: {totalCases}</h3>
                <p><i><u><button type="button" data-toggle="modal" data-target="#myModal" onClick={getdata}>Click Here</button></u></i> To checkout next 7 days prediction</p>
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
        <div class="container">
            
        </div>
    </>
    )
}
