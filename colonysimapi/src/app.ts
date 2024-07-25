import express, { Request, Response } from 'express';
import cors from 'cors';
import PlayerData from './models/playerdata';
import PlayerDataRequest from './models/playerdatareq';

const app = express();
const port = 3001;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
    var message = "Hello World!";
    res.send({ message });
});

app.post('/api/player', (req: Request, res: Response) => {
    //This endpoint gets the player data for the player with the email address in the request body
    //It should return a JSON object with the player data
    //If the player does not exist, it should return a 404 error

    let playerDataRequest = JSON.parse(req.body);
    let player = new PlayerData(1, "Test Player", playerDataRequest.email);
    res.send(player);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});