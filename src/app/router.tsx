import { createRouter, createRootRoute, createRoute } from "@tanstack/react-router";
import HomePage from "@/pages/HomePage";
import SessionPage from "@/pages/SessionPage";

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const sessionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/session/$sessionId",
  component: SessionPage,
});

const routeTree = rootRoute.addChildren([homeRoute, sessionRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
