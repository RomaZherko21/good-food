import { render, screen } from '@testing-library/react';
import SignIn from './SignIn';

describe('Navbar', () => {
  it('Render h1', () => {
    render(<SignIn />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
  it('email input', () => {
    render(<SignIn />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
  it('password input', () => {
    render(<SignIn />);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
  it('token input', () => {
    render(<SignIn />);
    expect(screen.getByLabelText(/token/i)).toBeInTheDocument();
  });
  it('submit button', () => {
    render(<SignIn />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('err', () => {
    render(<SignIn />);
    expect(screen.queryByText('Something goes wrong...')).toBeNull();
  });
});
