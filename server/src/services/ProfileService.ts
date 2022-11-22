import {ServerResponse} from "http";
import {BasicService} from "./BasicService";
import {Dao} from "../dao/Dao";
import {Profile} from "../entities/Profile";

class ProfileService extends BasicService {

    async get(params: any, res: ServerResponse): Promise<ServerResponse> {

        try {

            const rows: Profile[] = await Dao.db_all('SELECT * FROM profiles') as Profile[];

            res.writeHead(200);
            res.end(JSON.stringify(rows));
        } catch (err: any) {
            res.writeHead(500); // add error handling
            res.end(`Something went wrong ${err.message}`);
        }

        return res;
    }

    async post(params: any, res: ServerResponse): Promise<ServerResponse> {

        try {
            const profile: Profile = params.data as Profile;

            await Dao.db_run(`INSERT INTO profiles(name) VALUES('${profile.name}')`);

            res.writeHead(201);
            res.end(JSON.stringify(profile));
        } catch (err: any) {
            res.writeHead(409);
            res.end(err.message);
        }

        return res;
    }

    async put(params: any, res: ServerResponse): Promise<ServerResponse> {
        return res;
    }


}

export {
    ProfileService
}