"use client"
// import css
import { useState } from "react";

function Stopwatch() {
    const [time, setTime] = useState(0);

    return (
        <>
            <h1> Task Stopwatch</h1>
            <div>
                <span>{("0" + Math.floor((time / 60000) % 60))}</span>

            </div>
        </>
    );
}

export default Stopwatch