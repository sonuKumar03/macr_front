import axios from "axios";
import { root_url } from "./constants";

export const fetchChapters = ()=>{
    return axios.get(root_url+`/chapters`);
}

export const GameInit = (tokenId)=>{
    return axios.post(root_url+"/init_game",{tokenId})
}

export const fetchChaptersQuestion=(chapterId)=>{
    return axios.get(root_url+`/chapters/${chapterId}`)
}

export const getUser=(userAddress)=>{
    return axios.get(`${root_url}/users/${userAddress}`)
}