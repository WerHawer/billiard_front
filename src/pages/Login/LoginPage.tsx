import React, { memo } from 'react';
import cn from 'classnames';
import styles from './LoginPage.module.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { navRoutPath } from '../../router/routPath';
import { useDispatch } from 'react-redux';
import { handleApiCall } from '../../api/handleApiCall';
import { loginApiCall } from '../../api/authApi/loginApiCall';
import { GoogleLoginButton } from '../../components/GoogleLoginButton';

export const LoginPage = memo(() => {
	const dispatch = useDispatch();

	const onFinish = (values: { email: string; password: string }) => {
		dispatch(
			// @ts-ignore
			handleApiCall(loginApiCall(values))
		);
	};

	return (
		<div className={styles.container}>
			<Form
				name="normal_login"
				className={cn('login-form', styles.form)}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				size="large"
			>
				<Form.Item
					name="email"
					rules={[{ required: true, message: 'Please input your Email!' }]}
				>
					<Input
						prefix={<UserOutlined className={styles.icon} />}
						placeholder="Email"
						type="email"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: 'Please input your Password!' }]}
				>
					<Input
						prefix={<LockOutlined className={styles.icon} />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>

				<Form.Item className={styles.submitContainer}>
					<Button
						type="primary"
						htmlType="submit"
						className={styles.submitButton}
					>
						Log in
					</Button>

					<span>
						<span className={styles.spanText}>Or</span>
						<Link to={navRoutPath.registration}>register now!</Link>
					</span>
				</Form.Item>
			</Form>

			<GoogleLoginButton />
		</div>
	);
});
