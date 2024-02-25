'use client';
import Button from '@/components/button';
import { CenteredContainer } from '@/components/centeredContainer/styles';
import { AuthService } from '@/services/auth';
import { Notification } from '@/utils/notification';
import { Box, TextField } from '@material-ui/core';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Avatar, CssBaseline, Grid, Link, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			await AuthService.forgotPassword({email});

			Notification.info(
				'Enviamos um email de recuperação para o email cadastrado'
			);

			alert('Enviamos um email de recuperação para o email cadastrado');
		} catch (e) {
			alert('deu ruim');
		} finally{ setLoading(false); }
	};

	return (
		<CenteredContainer>
			<CssBaseline />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '25%',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'blue' }}>
					<LockResetIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
          Reset password
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoFocus
						autoComplete="off"
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						loading={loading}
						onClick={handleSubmit}
						disabled={!email}
						sx={{ mt: 3, mb: 2 }}
					>
            Reset password
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="/signup" variant="body2">
                Sign Up
							</Link>
						</Grid>
						<Grid item>
							<Link href="/signin" variant="body2">
                Sign In
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</CenteredContainer>
	);
}
