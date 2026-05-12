// LoginPage.test.js
//
// Component tests for LoginPage. Verifies that:
//   - The form renders with all required fields.
//   - Demo-account buttons fill in the form.
//   - Submitting with bad credentials surfaces the server error.
//   - A successful login navigates away from the login page.

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../AuthContext";
import LoginPage from "./LoginPage";

function renderLogin() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<div>DASHBOARD</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

test("renders email and password inputs", () => {
  renderLogin();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
});

test("clicking a demo button fills the email field", () => {
  renderLogin();
  fireEvent.click(screen.getByRole("button", { name: /marco rossi/i }));
  expect(screen.getByLabelText(/email/i)).toHaveValue("marco@recipenest.com");
});

test("shows an error message when the server returns 401", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      json: () =>
        Promise.resolve({ message: "Invalid email or password." })
    })
  );

  renderLogin();
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "bad@test.com" }
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "wrong" }
  });
  fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

  await waitFor(() => {
    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
  });
});

test("navigates to dashboard on successful login", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          id: 1,
          fullName: "Chef Marco Rossi",
          email: "marco@recipenest.com",
          bio: "",
          profileImageUrl: "",
          specialty: "Italian"
        })
    })
  );

  renderLogin();
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "marco@recipenest.com" }
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "marco_pass_2026" }
  });
  fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

  await waitFor(() => {
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
