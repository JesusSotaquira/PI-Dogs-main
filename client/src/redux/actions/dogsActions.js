import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';

export function getDogs() {
    return function(dispatch) {
        
        axios.get('http://localhost:3001/dogs')
            .then(response => {
            
                dispatch({ type: GET_DOGS, payload: response.data });
            })
            .catch(error => {
                
                console.error('Error fetching dogs:', error.message);
            });
    };
}
//control z por si no me sirve :,v