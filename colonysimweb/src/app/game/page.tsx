'use client'

import { useState, useEffect } from "react";
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import PlayerDetails from "@/components/playerdetails";

export default withPageAuthRequired(function GameMain({user})
{
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Welcome to ColonySim, {user?.name}!</h1>
            <PlayerDetails></PlayerDetails>
        </main>
    );
});