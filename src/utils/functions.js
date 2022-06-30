// eslint-disable-next-line
import { useEffect, useState } from 'react';
import Toastify from "./toast";

let updateContacts;

export const addUser=(info)=>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "username": info.username,
    "phoneNumber": info.phoneNumber,
    "gender": info.gender
    });

    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://contact-phone-app-api.herokuapp.com/api/contact/", requestOptions)
    .then(response => response.text())
    .then(result => updateContacts())
    .catch(error => console.log('error', error));
    }

export const useFetch = () => {
    const [isLoading, setIsLoading] = useState();
    const [contactList, setContactList] = useState();
    
    const getContact = () =>{
        fetch('https://contact-phone-app-api.herokuapp.com/api/contact/')
        .then(response => response.json())
        .then(data => {
            setContactList(data);

            setIsLoading(false)
        })
        .catch((err)=>console.log(err))
    }
    updateContacts = getContact;

    useEffect(() => {
        setIsLoading(true);
        getContact();
    }, [])
    return {isLoading, contactList}
}

export const DeleteUser = (id) => {
    var raw = "";

    var requestOptions = {
    method: 'DELETE',
    body: raw,
    redirect: 'follow'
    };

    fetch('https://contact-phone-app-api.herokuapp.com/api/contact/'+ id + '/', requestOptions)
        .then(response => response.text())
        .then(result => updateContacts())
        .catch(error => console.log('error', error));
    
    Toastify("User information deleted.")
}

export const EditUser=(info)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": info.username,
        "phoneNumber": info.phoneNumber,
        "gender": info.gender
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://contact-phone-app-api.herokuapp.com/api/contact/"+ info.id + '/', requestOptions)
    .then(response => response.text())
    .then(result => updateContacts())
    .catch(error => console.log('error', error));

    }
