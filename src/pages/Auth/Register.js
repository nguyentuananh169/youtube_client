import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { useValidateForm } from '../../hook/useValidateForm';
import { addToastMessage } from '../../store/actions/toastMessage';
import authApi from '../../api/authApi';
import logo from '../../assets/img/logo-small.png';
import bg from '../../assets/img/social-media.jpg';
import styles from './Auth.module.css';
function Register() {
    const validates = [
        {
            name: 'name',
            rules: { isRequired: true, minLength: 6, maxLength: 25 },
        },
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
        name: '',
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const { isLogin } = useSelector((state) => state.auth.isLogin);
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (isLoading) {
            return;
        }
        setLoading(true);
        const params = new FormData();
        params.append('_name', values.name);
        params.append('_email', values.email);
        params.append('_password', values.password);
        const response = await authApi.register(params);
        setLoading(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(addToastMessage('success', 'Thành công', response[0].message));
        navigate('/login');
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
                    <h1>Đăng ký Youtube</h1>
                </div>
                <form className={clsx(styles.form)} onSubmit={(e) => formSubmit(e, values)}>
                    <div className={clsx(styles.group)}>
                        <label>Họ và tên *</label>
                        <input
                            className={clsx({ [styles.inputVaild]: errors.name })}
                            name="name"
                            type="text"
                            placeholder="Họ và tên"
                            value={values.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            onBlur={(e) => invalid('name', e.target.value)}
                        />
                        {errors.name && <p className={clsx(styles.valid)}>{errors.name}</p>}
                    </div>
                    <div className={clsx(styles.group)}>
                        <label>Email *</label>
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
                            {isLoading ? 'Đang đăng ký ...' : 'Đăng ký'}
                        </button>
                    </div>
                    <div className={clsx(styles.dontHaveAcc)}>
                        <p>
                            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                        </p>
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

export default Register;
