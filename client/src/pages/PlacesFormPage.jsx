import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(res => {
            const {data} = res;
            setTitle(data.title);
            setCity(data.city);
            setCountry(data.country);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }
    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {title, city, country, addedPhotos, description, perks, 
            extraInfo, checkIn, checkOut, maxGuests, price,};
        if (id) {
            // update place
            await axios.put('/places', {id, ...placeData});
            setRedirect(true);           
        } else {
            // add new place
            await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    if (redirect) {
        return (<Navigate to={'/account/places'} />);
    }
    
    return (
    <div>
        <AccountNav />    
        <form onSubmit={savePlace}>
            {preInput('标题', '住处的标题，例如：我的可爱公寓')}
            <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apartment" />
            {preInput('地址', '您的住处的地址，例如：北京市海淀区中关村大街5号')}
            <div className="flex gap-2">
                <input type="text" value={city} onChange={ev => setCity(ev.target.value)} placeholder="City" />
                <input type="text" value={country} onChange={ev => setCountry(ev.target.value)} placeholder="Country" />
            </div>
            {preInput('相册', '您的住处的照片，最多9张')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
            {preInput('描述', '您的住处的描述，例如：我的公寓位于北京市海淀区中关村大街5号，是一间非常可爱的公寓')}
            <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
            {preInput('福利', '您的住处的福利，例如：免费停车，免费早餐，免费洗衣机')}
            <div>
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
            </div>
            {preInput('额外信息', '您的住处的额外信息，例如：入住时间，最大入住人数，价格等等')}
            <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
            {preInput('入住/退房时间, 最大客人数量，每晚价格', '您的住处的入住/退房时间，最大客人数量，每晚价格，例如：14:00/11:00, 2, 100 (每晚价格100元)')}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                <div>
                    <h3 className="mt-2 -mb-1">入住时间</h3>
                    <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14:00" />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">退房时间</h3>
                    <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="11:00" />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">最大客人数量</h3>
                    <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">每晚价格</h3>
                    <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} />
                </div>
            </div>
            <button className="primary my-4">保存</button>
        </form>
    </div>
    );
}