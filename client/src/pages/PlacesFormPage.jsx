import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
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
            setAddress(data.address);
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
        const placeData = {title, address, addedPhotos, description, perks, 
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
            {preInput('标题', '住宿的标题')}
            <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="例如：我的可爱公寓" />
            {preInput('地址', '住宿的地址')}
            <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="城市，国家" />
            {preInput('相册', '住宿的照片')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
            {preInput('描述', '住宿的描述')}
            <textarea value={description} onChange={ev => setDescription(ev.target.value)} placeholder="例如：我的公寓位于浦东新区黄浦江旁，有着美丽的滨江景观" />
            {preInput('福利', '住宿的福利')}
            <div>
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
            </div>
            {preInput('额外信息', '住宿的额外信息')}
            <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} placeholder="例如：注意事项等等" />
            {preInput('其他信息', '住宿的其他信息')}
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
                    <h3 className="mt-2 -mb-1">最多客人数量</h3>
                    <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">每晚价格（人民币）</h3>
                    <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} />
                </div>
            </div>
            <button className="primary my-4">保存</button>
        </form>
    </div>
    );
}