import React, { memo, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './RegistrationPage.module.scss';
import { handleApiCall } from '../../api/handleApiCall';
import { Button, Form, Input, Modal } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { navRoutPath } from '../../router/routPath';
import { useDispatch } from 'react-redux';
import {
	registrationApiCall,
	IRegistrationRequestPayload,
} from '../../api/authApi/registrationApiCall';

interface IRegistrationFormValues extends IRegistrationRequestPayload {
	confPassword: string;
}

export interface IRegError {
	code: number;
	message: string;
	status: string;
	data: string;
}

export type IRegistrationState = IRegError | null;

export const RegistrationPage = memo(() => {
	const dispatch = useDispatch();
	const [regError, setRegError] = useState<IRegistrationState>(null);

	useEffect(() => {
		if (regError) {
			Modal.error({
				title: 'Error',
				content: regError.message,
				onOk: () => setRegError(null),
			});
		}
	}, [regError]);

	const onFinish = (values: IRegistrationFormValues) => {
		const res = dispatch(
			// @ts-ignore
			handleApiCall(registrationApiCall(values))
		);

		res.then((res: any) => {
			if (res.payload.error) {
				setRegError(res.payload.error.response.data);
			}
		});
	};

	return (
		<div className={styles.container}>
			<Form
				name="normal_registration"
				className={cn('registration-form', styles.form)}
				initialValues={{
					remember: true,
					email: 't@t.com',
					password: '123',
					confPassword: '123',
					name: 'test',
				}}
				onFinish={onFinish}
				size="large"
			>
				<Form.Item
					name="email"
					rules={[{ required: true, message: 'Please input your Email!' }]}
				>
					<Input
						prefix={<MailOutlined className={styles.icon} />}
						placeholder="Email"
						type="email"
					/>
				</Form.Item>
				<Form.Item
					name="name"
					rules={[{ required: true, message: 'Please input your name!' }]}
				>
					<Input
						prefix={<UserOutlined className={styles.icon} />}
						placeholder="Name"
					/>
				</Form.Item>
				<Form.Item name="nikName">
					<Input
						prefix={<UserOutlined className={styles.icon} />}
						placeholder="Nik name (optional)"
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

				<Form.Item
					name="confirmPassword"
					dependencies={['password']}
					rules={[
						{ required: true, message: 'Please confirm your Password!' },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('The two passwords that you entered do not match!')
								);
							},
						}),
					]}
				>
					<Input
						prefix={<LockOutlined className={styles.icon} />}
						type="password"
						placeholder="Confirm Password"
					/>
				</Form.Item>

				<Form.Item className={styles.submitContainer}>
					<Button
						type="primary"
						htmlType="submit"
						className={styles.submitButton}
					>
						Register
					</Button>

					<span>
						<span className={styles.spanText}>Have an account?</span>
						<Link to={navRoutPath.login}>Login now!</Link>
					</span>
				</Form.Item>
			</Form>
		</div>
	);
});
