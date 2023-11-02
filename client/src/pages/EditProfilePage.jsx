import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";
import { useNavigate } from 'react-router-dom';

export default function EditProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const {id} = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');

    useEffect(() => {
        if (!id) {
            return;
            
        }
        axios.get('/account/' + id).then(res => {
            const { data } = res;
            setName(data.name);
            setEmail(data.email);
            setUsername(data.username);
            setPhone(data.phone);
            setBirthday(data.birthday);
        });
    }, [id]);

    async function saveProfile(ev) {
        ev.preventDefault();
        const userData = { name, username, email, phone, birthday };
        // 发送数据到后端保存
        if (id){
            //update profile
            await axios.put('/account',{id, ...userData});
            setRedirect(true);
        }else{
            await axios.post('/account',userData);
            setRedirect(true);
            
        }
    }

    const navigate = useNavigate();

    function cancelEdit() {
        navigate(-1);
    }

    if (redirect) {
        return <Navigate to={'/account'} />;
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={saveProfile}>
                <div className="text-center max-w-lg mx-auto">
                    <h2 className="text-2xl my-4">编辑个人资料</h2>
                    <div>
                        <div>                         
                        <input
                            className="text-center overflow-hidden"
                            type="text"
                            name="name"
                            placeholder="您的姓名"
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                          />
                        </div>
                        <input
                            type="text"
                            className="text-center"
                            name="username"
                            placeholder="用户名"
                            value={username}
                            onChange={ev => setUsername(ev.target.value)}
                        />

                        <input
                            type="email"
                            className="text-center"
                            name="email"
                            placeholder="您的邮箱"
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                        />

                        <input
                            type="tel"
                            className="text-center"
                            name="phone"
                            placeholder="手机号码"
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)}
                        />
                    </div>
                    <button className="primary my-4">
                        保存
                    </button>
                    <button type="button" className="primary" onClick={cancelEdit}>取消</button>
                </div>
            </form>
        </div>
    );
}
