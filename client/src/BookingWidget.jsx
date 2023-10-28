import { useContext, useEffect, useState } from "react";
import  { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "./UserContext"

export default function BookingWidget({place}) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setPhone(user.phone);
        }
    }, [user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace() {
        const res = await axios.post('/bookings', {place:place._id, checkIn, checkOut, numberOfGuests, 
            name, phone, price:numberOfNights * place.price,});
        const bookingId = res.data._id;
        console.log(bookingId)
        setRedirect('/account/bookings/' + bookingId);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
    <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
            <b>价格:</b> {place.price} 元 / 每晚 <br />
        </div>
        <div className="border rounded-2xl mt-4">
            <div className="flex">
                <div className="py-3 px-4">
                    <label><b>入住日期:</b></label>
                    <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="py-3 px-4 border-l">
                    <label><b>退房日期:</b></label>
                    <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} min={new Date().toISOString().split('T')[0]} />
                </div>
            </div>
            <div className="py-3 px-4 border-t">
                    <label><b>客人数量:</b></label>
                    <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} min="1" />
            </div>
            {numberOfNights > 0 && (
                <div className="py-3 px-4 border-t">
                    <label><b>您的姓名:</b></label>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="John Doe" />
                    <label><b>手机号码:</b></label>
                    <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} />
                </div>
            )}
        </div>
        <button onClick={bookThisPlace} className="primary mt-4">
            预定住宿
            {numberOfNights > 0 && (
                <span> ${numberOfNights * place.price}</span>
            )}
        </button>
    </div>
    );
}