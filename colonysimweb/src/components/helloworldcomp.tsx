//This is a component that calls a web api called hello world and gets a response from it
//This is a simple example of how to call a web api from a react component
//This component is used in the App.tsx file
'use client';

import React, { useEffect, useState } from 'react';


export default function HelloWorldComp() {
    const [response, setResponse] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001")
            .then((res) => res.json())
            .then((data) => {
                setResponse(data.message);
            });
    }, []);

    return (
        <div>
            <h1>{response}</h1>
        </div>
    );
}
