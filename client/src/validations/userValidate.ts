import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password should be between 6 and 22')
        .max(22, 'Too long')
        .required('Required')
})


export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Shouldnt be empty'),
    password: Yup.string()
        .min(6, 'Password Should be between 6 and 22')
        .max(22, 'Too long!')
        .required('Shouldnt be empty')
})