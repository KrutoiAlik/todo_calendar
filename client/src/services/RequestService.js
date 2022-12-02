export default class RequestService {

    doGet = async (params) => {

        document.cookie = JSON.stringify({userId: '1'});

        const response = await fetch(`${params.url}`);

        // TODO: Handle any possible content type
        if (response.headers.get('content-type') === 'text/plain') {
            return await response.text();
        }

        return await response.json();
    }

    doPost = async (params) => {
        const response = await fetch(`${params.url}`, this.createInit('POST', params.body));

        return await response.json();
    }

    doPut = async (params) => {
        await fetch(`${params.url}`, this.createInit('PUT', params.body));
    }

    doDelete = async (params) => {
        await fetch(`${params.url}`, this.createInit('DELETE', params.body));
    }

    createInit = (method, body) => {
        return {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        };
    };
}