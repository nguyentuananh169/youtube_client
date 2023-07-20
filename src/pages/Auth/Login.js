import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useValidateForm } from '../../hook/useValidateForm';
import authApi from '../../api/authApi';
import useStore from '../../hook/useStore';
import { addToastMessage, changeUserInfo, checkLogin } from '../../store/actions';
import logo from '../../assets/img/logo-small.png';
import bg from '../../assets/img/social-media.jpg';
import styles from './Auth.module.css';
function Login() {
    const validates = [
        {
            name: 'email',
            rules: { isRequired: true, isEmail: true },
        },
        {
            name: 'password',
            rules: { isRequired: true, minLength: 6, maxLength: 25 },
        },
    ];
    const [isLoading, setLoading] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [state, dispatch] = useStore();
    const { isLogin } = state;
    const naviage = useNavigate();
    const handleSubmit = async () => {
        if (isLoading) {
            return;
        }
        setLoading(true);
        const params = new FormData();
        params.append('_email', values.email);
        params.append('_password', values.password);
        const response = await authApi.login(params);
        setLoading(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        const userInfo = { ...response[0].user };
        dispatch(changeUserInfo(userInfo));
        dispatch(checkLogin(false));
        localStorage.setItem('access_token', JSON.stringify(response[0].access_token));
        localStorage.setItem('refresh_token', JSON.stringify(response[0].refresh_token));
        dispatch(addToastMessage('success', 'Thành công', response[0].message));
        naviage('/', { replace: true });
    };
    const { errors, invalid, removeError, formSubmit } = useValidateForm(validates, handleSubmit);
    const handleChange = (name, value) => {
        setValues({ ...values, [name]: value });
        removeError(name);
    };
    if (isLogin) {
        return <Navigate to="/" />;
    }
    return (
        <div className={clsx(styles.wrapper)} style={{ backgroundImage: `url(${bg})` }}>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.logo)}>
                    <Link to={'/'}>
                        <img src={logo} />
                    </Link>
                </div>
                <div className={clsx(styles.title)}>
                    <h1>Đăng nhập Youtube</h1>
                </div>
                <form className={clsx(styles.form)} onSubmit={(e) => formSubmit(e, values)}>
                    <div className={clsx(styles.group)}>
                        <label>Email</label>
                        <input
                            className={clsx({ [styles.inputVaild]: errors.email })}
                            name="email"
                            type="email"
                            placeholder="Địa chỉ email"
                            value={values.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            onBlur={(e) => invalid('email', e.target.value)}
                        />
                        {errors.email && <p className={clsx(styles.valid)}>{errors.email}</p>}
                    </div>
                    <div className={clsx(styles.group)}>
                        <input
                            className={clsx({ [styles.inputVaild]: errors.password })}
                            type="text"
                            name="password"
                            placeholder="Mật khẩu"
                            value={values.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            onBlur={(e) => invalid('password', e.target.value)}
                        />
                        {errors.password && <p className={clsx(styles.valid)}>{errors.password}</p>}
                        <p className={clsx(styles.note)}>Gợi ý: Mật khẩu cần có ít nhất 6 ký tự</p>
                    </div>
                    <div className={clsx(styles.submit)}>
                        <button className={clsx({ [styles.loading]: isLoading })}>
                            {isLoading ? 'Đang đăng nhập ...' : 'Đăng nhập'}
                        </button>
                    </div>
                    <div className={clsx(styles.dontHaveAcc)}>
                        <p>
                            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                        </p>
                    </div>
                    <div className={clsx(styles.forgotPassword)}>
                        <Link to="#">Quên mật khẩu ?</Link>
                    </div>
                    <div className={clsx(styles.acceptTerm)}>
                        <p>Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với</p>
                        <p>
                            <Link to="#">Điểu khoản sử dụng</Link> của chúng tôi.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
