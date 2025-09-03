import { RouteObject } from 'react-router-dom';
import { _FULL_ROUTES } from '../constants/routes';
import { TermsOfServicePage } from '../pages/common/terms-of-service/TermsOfServicePage';
import { PrivacyPolicyPage } from '../pages/common/privacy-policy/PrivacyPolicyPage';
import { ContactPage } from '../pages/common/contact/ContactPage';

export const commonRoutes: RouteObject[] = [
  {
    path: _FULL_ROUTES.TERMS_OF_SERVICE,
    element: <TermsOfServicePage />,
  },
  {
    path: _FULL_ROUTES.PRIVACY_POLICY,
    element: <PrivacyPolicyPage />,
  },
  {
    path: _FULL_ROUTES.CONTACT,
    element: <ContactPage />,
  },
];
