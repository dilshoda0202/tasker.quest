import React from "react";

function Weather() {
    return (
        <div className="weatherContainer">
            <div className="weather">
                <div className="weatherSearch">
                    <input type='text' placeholder='Enter City' />
                    <button>Search</button>
                </div>
            </div>
        </div>
    )
}

export default Weather;