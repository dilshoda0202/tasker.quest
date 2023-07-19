"use client";
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import handleLogout from '@/app/utils/handleLogout';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// grid for the categories
// display flex wrapping all items
// flex direction if below a certain amount
// use tailwind css

export default function Home() {
    return (
        <div className='container mx-auto pt-8'>
            <div className='flex'>
                <div className='w-2/5'>
                    {/* calendar */}
                    <Calendar />
                </div>
                <div>
                    <div className='grid grid-cols-3'>
                        {/* tasks */}
                        <div>
                            {/* category name and number of tasks */}
                            <p>Study</p>
                            <p>2 tasks</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}