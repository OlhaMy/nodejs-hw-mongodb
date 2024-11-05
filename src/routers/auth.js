import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  loginWithGoogleOAuthSchema,
} from '../validation/auth.js';
import { validateBody } from '../utils/validateBody.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import {
  getGoogleOAuthUrlController,
  loginWithGoogleController,
} from '../controllers/auth.js';

const routerAuth = Router();

routerAuth.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

routerAuth.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

routerAuth.post('/logout', ctrlWrapper(logoutUserController));
routerAuth.post('/refresh', ctrlWrapper(refreshUserSessionController));

routerAuth.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);
export default routerAuth;

routerAuth.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

routerAuth.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));
routerAuth.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);
