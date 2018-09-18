import {REQUEST_DATA} from "./types";
import axios from "axios";


export const requestData = () => dispatch => {
    axios.post('http://127.0.0.1:8000/')
        .then((response) => {
            let dataOne = [];
            let dataTwo = [];
            response.data.map((element, index) => {
            dataOne.push(Object.assign({x: index, y:element.stocks.CAC40}))
            dataTwo.push(Object.assign({x: index, y:element.stocks.NASDAQ}))
            })
            return dispatch({
                type: REQUEST_DATA,
                payload: {
                    CAC40: dataOne.slice(0,1000),
                    NASDAQ: dataTwo.slice(0,1000)
                } 
            })
        })
        .catch((error) => console.log(error))
} 