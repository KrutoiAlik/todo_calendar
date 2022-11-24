export default class RequestService {

    doGet = async (params) => {

        document.cookie = JSON.stringify({userId: '1'});

        try {

            const response = await fetch(`${params.url}`);

            // TODO: Handle any possible content type
            if (response.headers.get('content-type') === 'text/plain') {
                return await response.text();
            }

            return await response.json();
        } catch (err) {
            console.log({err});
        }

        return [];
    }

}