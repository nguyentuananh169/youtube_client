import { Link } from 'react-router-dom';
function Error403() {
    return (
        <>
            <h1>403</h1>
            <p>Xin lỗi, phiên đăng nhập của bạn đã hết.</p>
            <p>
                Vui lòng <Link to="/login">đăng nhập lại</Link> hoặc{' '}
                <Link to="/">quay về trang chủ</Link>
            </p>
        </>
    );
}

export default Error403;
