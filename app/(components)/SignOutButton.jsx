"use client";
import React from 'react';
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'; 
import { useAuthContext } from '../userContext';

function SignOutButton() {
    const {signOut}=useAuthContext();
    const router = useRouter(); 

    const handleLogout = async () => {
        const response = await signOut();
        if (response.success) {
            toast.success(response.message);
            router.push("/login");
        } else {
            toast.error(response.message);
        }
    }

    return (
        <button 
            onClick={handleLogout} 
            className='mx-3 text-gray-800 hover:text-gray-600'>
            <FaSignOutAlt className='inline mr-1' /> Sign Out
        </button>
    );
}

export default SignOutButton;
