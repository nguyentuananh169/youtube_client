import { RiImageAddLine } from 'react-icons/ri';

import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import VideoPlay from '../../../../../../../components/VideoPlay';
import EditorComp from './EditorComp';
import styles from './Body.module.css';
import Tooltip from '../../../../../../../components/Tooltip';
function Body({
    isLoadingCate,
    isLoadingPlaylist,
    categoryList,
    playlist,
    values,
    setValues,
    objValidateForm,
}) {
    const inputImgRef = useRef(null);
    const { errors, invalid, removeError } = objValidateForm;
    const baseUrl = window.location.origin;
    useEffect(() => {
        const file = values.posterFile[0];
        if (
            file &&
            (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif')
        ) {
            values.posterLink && URL.revokeObjectURL(values.posterLink);
            setValues({ ...values, posterLink: URL.createObjectURL(file) });
        } else {
            setValues({ ...values, posterLink: '' });
        }
        return () => {
            values.posterLink && URL.revokeObjectURL(values.posterLink);
        };
    }, [values.posterFile]);
    useEffect(() => {
        return () => {
            values.videoLink && URL.revokeObjectURL(values.videoLink);
        };
    }, []);
    const handleChange = (name, value) => {
        setValues({ ...values, [name]: value });
        removeError(name);
    };
    const handleFakeImg = () => {
        inputImgRef.current.focus();
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.left)}>
                <div className={clsx(styles.inputContainer)}>
                    <div
                        className={clsx(styles.group, {
                            [styles.error]: errors.title,
                        })}
                    >
                        <label htmlFor="textarea">Tiêu đề (bắt buộc)</label>
                        <input
                            id="textarea"
                            value={values.title}
                            name="title"
                            placeholder="Thêm tiêu đề để mô tả video của bạn "
                            onChange={(e) => handleChange('title', e.target.value)}
                            onBlur={(e) => invalid('title', e.target.value)}
                        />
                        <div className={clsx(styles.charCounter)}>
                            <span>{values.title.length}/100</span>
                        </div>
                    </div>
                    {errors.title && <p className={clsx(styles.errorMessage)}>{errors.title}</p>}
                </div>
                <div className={clsx(styles.inputContainer)}>
                    <div
                        className={clsx(styles.group, {
                            [styles.error]: errors.desText,
                        })}
                    >
                        <label>Mô tả</label>
                        <EditorComp
                            initialValue={values.des}
                            handleChange={handleChange}
                            invalid={invalid}
                        />
                        <div className={clsx(styles.charCounter)}>
                            <span>{values.desText.length}/3000</span>
                        </div>
                    </div>
                    {errors.desText && (
                        <p className={clsx(styles.errorMessage)}>{errors.desText}</p>
                    )}
                </div>
                <div className={clsx(styles.inputContainer)}>
                    <label className={clsx(styles.label)}>Hình thu nhỏ</label>
                    <p className={clsx(styles.sublabel)}>
                        Chọn hoặc tải một hình ảnh lên để thể hiện nội dung trong video của bạn.
                        Hình thu nhỏ hấp dẫn sẽ làm nổi bật video của bạn và thu hút người xem.
                        <Link to={'#'}>Tìm hiểu thêm</Link>
                    </p>
                    <div className={clsx(styles.imgContainer)}>
                        <label
                            htmlFor="input-img"
                            className={clsx(styles.inputImg, { [styles.error]: errors.posterFile })}
                            onClick={handleFakeImg}
                        >
                            <RiImageAddLine size={16} color="#0d0d0d" />
                            <p className={clsx(styles.text)}>Tải hình thu nhỏ lên</p>
                        </label>
                        {values.posterLink && (
                            <label className={clsx(styles.img)}>
                                <img src={values.posterLink} />
                            </label>
                        )}
                        <input
                            ref={inputImgRef}
                            name="posterFile"
                            id="input-img"
                            className={clsx(styles.inputFile)}
                            type="file"
                            onChange={(e) => handleChange('posterFile', e.target.files)}
                            onBlur={(e) => invalid('posterFile', e.target.files)}
                        />
                    </div>
                    {errors.posterFile && (
                        <p className={clsx(styles.errorMessage)}>{errors.posterFile}</p>
                    )}
                </div>
                <div className={clsx(styles.inputContainer)}>
                    <label className={clsx(styles.label)}>Danh sách phát</label>
                    <p className={clsx(styles.sublabel)}>
                        Thêm video của bạn vào một danh sách phát. Danh sách phát có thể giúp người
                        xem nhanh chóng khám phá nội dung của bạn.
                        <Link to={'#'}>Tìm hiểu thêm</Link>
                    </p>
                    <select
                        name="playlistId"
                        onChange={(e) =>
                            handleChange(
                                'playlistId',
                                e.target.options[e.target.options.selectedIndex].value,
                            )
                        }
                    >
                        <option value={''}>
                            {isLoadingPlaylist ? '-- Đang tải dữ liệu --' : 'Chọn'}
                        </option>
                        {playlist.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={clsx(styles.inputContainer)}>
                    <label className={clsx(styles.label)}>Danh mục video (bắt buộc)</label>
                    <p className={clsx(styles.sublabel)}>
                        Thêm video của bạn vào một danh mục video. Danh mục video có thể giúp người
                        xem nhanh chóng khám phá nội dung của bạn.
                        <Link to={'#'}>Tìm hiểu thêm</Link>
                    </p>
                    <select
                        className={clsx({ [styles.error]: errors.categoryId })}
                        name="categoryId"
                        value={values.categoryId}
                        onChange={(e) =>
                            handleChange(
                                'categoryId',
                                e.target.options[e.target.options.selectedIndex].value,
                            )
                        }
                    >
                        <option value={''}>
                            {isLoadingCate ? '-- Đang tải dữ liệu --' : 'Chọn'}
                        </option>
                        {categoryList.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && (
                        <p className={clsx(styles.errorMessage)}>{errors.categoryId}</p>
                    )}
                </div>
            </div>
            <div className={clsx(styles.right)}>
                <VideoPlay size="medium" videoLink={values.videoLink} />
                <div className={clsx(styles.videoInfo)}>
                    {values.videoFile ? (
                        <>
                            <p>Tên tệp</p>
                            <div className={clsx(styles.fileName)}>
                                <span>{values.videoFile.name}</span>
                                <Tooltip
                                    content={values.videoFile.name}
                                    customStyle={{
                                        width: '100%',
                                        top: 'calc(100% + 20px)',
                                        left: 0,
                                        lineHeight: '1.8rem',
                                        fontSize: '1.2rem',
                                        color: '#fff',
                                        padding: '5px',
                                        zIndex: 2,
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Đường liên kết của video</p>
                            <div className={clsx(styles.fileName)}>
                                <Link to={`/watch/${values.id}`} target="_blank">
                                    {`${baseUrl}/watch/${values.id}`}
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Body;
