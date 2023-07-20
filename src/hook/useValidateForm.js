import { useEffect, useState } from 'react';
const objectRules = {
    isRequired: (initial, value) => {
        if (!initial) {
            return;
        }
        if (typeof value === 'string') {
            const formatValue = value.trim();
            if (formatValue === '') {
                return 'Trường này không được để trống';
            }
        } else {
            if (!value.length) {
                return 'Trường này không được để trống';
            }
        }
    },
    isEmail: (initial, value) => {
        if (!initial || !value) {
            return;
        }
        const formatValue = value.trim();
        const reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!reg.test(formatValue)) {
            return 'Nội dung email chưa hợp lệ. VD: abc@gmail.com';
        }
    },
    isPhoneNumber: (initial, value) => {
        if (!initial || !value) {
            return;
        }
        const formatValue = value.trim();
        const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!reg.test(formatValue)) {
            return 'Nội dung phải là một số điện thoại hợp lệ. VD: 0123456789';
        }
    },
    isNumber: (initial, value) => {
        if (!initial || !value) {
            return;
        }
        const formatValue = value.trim();
        if (isNaN(Number(formatValue))) {
            return 'Nội dung phải là dạng số';
        }
    },
    isInteger: (initial, value) => {
        if (!initial || !value) {
            return;
        }
        const formatValue = value.trim();
        if (!(formatValue % 1 === 0)) {
            return 'Nội dung phải là dạng số nguyên';
        }
    },
    minLength: (initial, value) => {
        if (!initial || !value) {
            return;
        }
        const formatValue = value.trim();
        if (initial > formatValue.length) {
            return `Nội dung phải ít nhất ${initial} ký tự`;
        }
    },
    maxLength: (initial, value) => {
        if (!initial || !value) {
            return;
        }
        const formatValue = value.trim();
        if (initial < formatValue.length) {
            return `Nội dung phải nhỏ hơn hoặc bằng ${initial} ký tự`;
        }
    },
    minNumber: (initial, value) => {
        if (value === '') {
            return;
        }
        if (initial > value) {
            return `Giá trị phải lớn hơn hoặc bằng ${initial}`;
        }
    },
    maxNumber: (initial, value) => {
        if (value === '') {
            return;
        }
        if (initial < value) {
            return `Giá trị phải nhỏ hơn hoặc bằng ${initial}`;
        }
    },
    isFileImg: (initial, file) => {
        if (!initial || !file) {
            return;
        }
        for (let i = 0; i < file.length; i++) {
            if (
                file[i].type !== 'image/png' &&
                file[i].type !== 'image/jpeg' &&
                file[i].type !== 'image/gif'
            ) {
                return `Hình ảnh không đúng định dạng (PNG, JPEG, GIF)`;
            }
        }
    },
    minFile: (initial, file) => {
        if (!initial || !file.length) {
            return;
        }
        if (initial > file.length) {
            return `Phải nhập ít nhất ${initial} file`;
        }
    },
    maxFile: (initial, file) => {
        if (!initial || !file.length) {
            return;
        }
        if (initial < file.length) {
            return `Chỉ được nhập tối đa ${initial} file`;
        }
    },
    alike: (initial, value) => {
        if (!initial) {
            return;
        }
        if (initial !== value) {
            return `Nội dung không trùng khớp`;
        }
    },
};
const useValidateForm = (validates = [], callback) => {
    const objRules = objectRules;
    const [count, setCount] = useState(0);
    const [errors, setErrors] = useState({});
    const [isSubmit, setSubmit] = useState(false);
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
            callback();
        }
    }, [count]);
    const removeError = (name) => {
        const newObj = errors;
        delete newObj[name];
        setErrors(newObj);
    };
    const invalid = (name, value) => {
        const validate = validates.filter((item) => item.name === name);
        if (validate.length > 0) {
            const rules = Object.keys(validate[0].rules);
            for (let item of rules) {
                let messageError = objRules[item](validate[0].rules[item], value);
                if (messageError) {
                    setErrors((state) => ({ ...state, [name]: messageError }));
                    break;
                } else {
                    setErrors((state) => {
                        const newObj = state;
                        delete newObj[name];
                        return newObj;
                    });
                }
            }
        }
    };
    const formSubmit = (e, values) => {
        e.preventDefault();
        const array = Object.keys(values);
        for (let item of array) {
            invalid(item, values[item]);
        }
        setSubmit(true);
        setCount(count + 1);
    };
    return {
        errors,
        invalid,
        removeError,
        formSubmit,
    };
};
export { objectRules, useValidateForm };
