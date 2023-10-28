import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function handleLoginSubmit (ev) {
        ev.preventDefault();
        try {
            const {data} = await axios.post('/login', {email, password});
            setUser(data);
            alert('登入成功');
            setRedirect(true);
        } catch (e) {
            alert('登入失败！');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">登入</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder="密码" value={password} onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary">登入</button>
                    <div className="text-center py-2 text-gray-500">
                        还没有账户? <Link className='underline text-black' to={'/register'}>现在注册</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}