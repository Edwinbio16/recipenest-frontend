// App.test.js
//
// Smoke tests for the application shell. Mocks fetch globally so
// no real network calls are made and verifies that the navbar,
// branding, and primary nav links all render correctly.

import { render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  // Stub fetch with an empty list - sufficient for the homepage,
  // which doesn't fetch on mount, but keeps the tests deterministic
  // even if the test renderer eagerly runs effects.
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve([])
    })
  );
  // Keep localStorage clean between tests so the auth state
  // doesn't leak from one test into the next.
  window.localStorage.clear();
});

test("renders the RecipeNest brand in the navbar", () => {
  render(<App />);
  expect(screen.getByText(/RecipeNest/i)).toBeInTheDocument();
});

test("renders public navigation links when logged out", () => {
  render(<App />);
  expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /chefs/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /recipes/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument();
});

test("home page shows the welcome banner", () => {
  render(<App />);
  expect(screen.getByText(/welcome to recipenest/i)).toBeInTheDocument();
});

test("does not show the dashboard link when logged out", () => {
  render(<App />);
  // Dashboard link is hidden until the user signs in.
  expect(screen.queryByRole("link", { name: /^dashboard$/i })).toBeNull();
});

test("shows the dashboard link when a chef is in localStorage", () => {
  // Pre-populate the auth store as if the user had just logged in.
  window.localStorage.setItem(
    "recipenest.currentChef",
    JSON.stringify({
      id: 1,
      fullName: "Chef Marco Rossi",
      email: "marco@recipenest.com",
      bio: "",
      profileImageUrl: "",
      specialty: "Italian"
    })
  );
  render(<App />);
  expect(
    screen.getByRole("link", { name: /^dashboard$/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/hi, marco/i)).toBeInTheDocument();
});
