import {ServerResponse} from "http";
import {BasicService} from "./BasicService";
import {Dao} from "../dao/Dao";
import {Profile} from "../entities/Profile";

class ProfileService extends BasicService {

    public async getUser(params: any = {}) {

        let whereQuery = '';

        for (const property in params) {
            whereQuery += `${property} = '${params[property]}'`;
        }

        return await Dao.db_get(`SELECT name FROM profiles WHERE ${whereQuery}`) as Profile;
    }

    /**
     * @author aleksei bezmoshchuk (alikbezmoshyk@gmail.com)
     * @description Get a profile(s) according to params.
     * @param params - If params contain 'id' property, return the selected profile. Otherwise -> all profiles.
     * @param res - server response
     */
    async get(params: any, res: ServerResponse): Promise<ServerResponse> {

        try {

            if (!params.id || params.id === '') {
                const rows: Profile[] = await Dao.db_all('SELECT id, name FROM profiles') as Profile[];
                res.writeHead(200);
                res.end(JSON.stringify(rows));
            } else {
                const user = this.getUser({id: params.id});
                if (user) {
                    res.writeHead(200);
                    res.end(JSON.stringify(user));
                } else {
                    res.writeHead(404);
                    res.end('No such a profile');
                }
            }
        } catch (err: any) {
            res.writeHead(500); // add error handling
            res.end(`Something went wrong ${err.message}`);
        }

        return res;
    }

    /**
     * @author aleksei bezmoshchuk (alikbezmoshyk@gmail.com)
     * @description Create a new profile.
     * @param params - should contain data
     * @param res - server response
     */
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
}

export {
    ProfileService
}