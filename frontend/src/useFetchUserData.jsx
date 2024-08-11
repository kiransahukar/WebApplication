
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { login } from './store.jsx';
import { useNavigate } from "react-router-dom";

const useFetchUserData = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    //console.log(token)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/userData', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
                console.log(response.data);
                dispatch(login({ userType: response.data.profession, userId: response.data.id }));
                navigate("/home")
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate("/login")
            }
        };

        fetchDetails();
    }, [dispatch, token]);
};

export default useFetchUserData;

