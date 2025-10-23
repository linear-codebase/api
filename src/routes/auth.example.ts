import { Elysia, t } from 'elysia'
import { auth, setAccessToken, setRefreshToken, clearTokens } from '../plugins/auth'

export const authRoutes = new Elysia({ prefix: '/auth' })
	.use(auth)
	.post(
		'/sign-in',
		async ({ body, jwt, cookie, status }) => {
			// Your authentication logic here
			// Example: verify username and password from database
			const { username, password } = body

			// Mock user validation
			// Replace with your actual authentication logic
			if (!username || !password) {
				return status(400, {
					success: false,
					message: 'Invalid credentials'
				})
			}

			// Create token payloads
			const user = {
				id: '1',
				username,
				role: 'user'
			}

			// Generate tokens using jwt.access and jwt.refresh
			const accessToken = await jwt.access.sign(user)
			const refreshToken = await jwt.refresh.sign({ id: user.id })

			// Set cookies
			setAccessToken(cookie, accessToken)
			setRefreshToken(cookie, refreshToken)

			return {
				success: true,
				message: 'Signed in successfully',
				user
			}
		},
		{
			body: t.Object({
				username: t.String({ minLength: 1 }),
				password: t.String({ minLength: 8 })
			})
		}
	)
	.post(
		'/refresh',
		async ({ jwt, cookie, status }) => {
			const token = cookie.refreshToken.value

			if (!token) {
				return status(401, {
					success: false,
					message: 'No refresh token provided'
				})
			}

			try {
				const payload = await jwt.refresh.verify(token)

				if (!payload) {
					return status(401, {
						success: false,
						message: 'Invalid refresh token'
					})
				}

				// Fetch user data based on payload
				// Replace with your actual logic
				const user = {
					id: payload.id,
					username: 'user',
					role: 'user'
				}

				// Generate new access token
				const newAccessToken = await jwt.access.sign(user)
				setAccessToken(cookie, newAccessToken)

				return {
					success: true,
					message: 'Token refreshed successfully'
				}
			} catch (error) {
				return status(401, {
					success: false,
					message: 'Invalid refresh token'
				})
			}
		}
	)
	.post('/sign-out', ({ cookie }) => {
		clearTokens(cookie)

		return {
			success: true,
			message: 'Signed out successfully'
		}
	})
	.get('/profile', ({ user }) => {
		return {
			success: true,
			user
		}
	}, {
		isAuth: true
	})
