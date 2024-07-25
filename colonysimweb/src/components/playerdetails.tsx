/*This component gets the users player data from the API
at the endpoint /player 
It should send a request with the player email address
*/
'use client'

import { useState, useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import PlayerData from "@/models/playerData";
import PlayerDataRequest from "@/models/playerdatareq";

export default function PlayerDetails()
{
    const [playerData, setPlayerData] = useState<PlayerData | null>(null);
    const { user } = useUser();

    useEffect(() => {
        if(user && user.email) {
            const sendPlayerEmail = async () => {
                try {
                    const response = await fetch('http://localhost:3001/api/player', {
                        method: 'POST',
                        headers: {
                            'conent-type': 'application/json'
                        },
                        body: JSON.stringify(new PlayerDataRequest(user?.email ?? ''))
                    });

                    if(!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setPlayerData(data);
                } catch (error) {
                    console.error('There was an error!', error);
                }
            };

            sendPlayerEmail();
        }
    }, [user]);

    return (
        <div>
            <h1>Player Details</h1>
            {playerData && (
                <div>
                    <p>Player Name: {playerData.name}</p>
                    <p>Player Email: {playerData.email}</p>
                </div>
            )}
        </div>
    )

}