import React, {useState, useEffect, useRef} from "react";

export default function Stopwatch() {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervelIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if (isRunning) {
            intervelIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervelIdRef.current);

        }

    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }
    function stop() {
        setIsRunning(false);

    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime() {

        //let hours = padZero(Math.floor(elapsedTime / (1000 * 60 * 60)));

        let minutes = padZero(Math.floor(elapsedTime / (1000 * 60) % 60));
        let seconds = padZero(Math.floor(elapsedTime / 1000 % 60));
        let milliseconds = padZero(Math.floor((elapsedTime % 1000) / 10));

        return(`${minutes}:${seconds}:${milliseconds}`)
    }

    function padZero(number) {
        if (number < 10){
            return("0" + number);
        }
        return number;
    }

    return(
        <div className="stopwatch">
          <div className="display">
            {formatTime()}
          </div>

            <div className="controls">
                <button onClick={start} className="start-button">Start</button>
                <button onClick={stop} className="stop-button">Stop</button>
                <button onClick={reset} className="reset-button">Reset</button>
            </div>
        </div>
    );
}