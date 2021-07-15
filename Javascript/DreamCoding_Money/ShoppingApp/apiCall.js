const timeoutDuration = 5000;

export default function apiCall(route, body = {}, method='POST') {
    const request = new Promise((resolve, reject) => {
        const headers = new Headers({
            'Content-Type':'application/json',
        });

        const requestDetails = {
            method,
            mode: 'cors',
            headers,
        };

        requestDetails.body = JSON.stringify(body);

        function handleErrors(response){
            if(response.ok){
                return response.json();
            }else{
                throw Error(response.statusText)
            }
        }
        fetch(`${SERVER_URL}`)
    })


}