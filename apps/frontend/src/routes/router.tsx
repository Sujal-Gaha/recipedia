import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { routes } from './merge-routes';
import { PageLoader } from '@/components/PageLoader';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Suspense, ReactNode, JSX } from 'react';

function wrapElement(element: ReactNode): JSX.Element {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>{element}</Suspense>
    </ErrorBoundary>
  );
}

function enhanceRoutes(routes: RouteObject[]): RouteObject[] {
  return routes.map((route) => {
    const { element, children } = route;

    const wrappedElement = element ? wrapElement(element) : undefined;

    if ('index' in route && route.index) {
      return {
        ...route,
        element: wrappedElement,
      };
    }

    return {
      ...route,
      element: wrappedElement,
      ...(children && { children: enhanceRoutes(children) }),
    };
  });
}

export const enhancedRouter = createBrowserRouter(enhanceRoutes(routes));
