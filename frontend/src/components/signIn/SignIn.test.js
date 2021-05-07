import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import SignIn from './SignIn';

describe('Sign in', () => {
  it('Render h1', () => {
    render(<SignIn />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
  it('email input', () => {
    render(<SignIn />);
    let elem = screen.getByLabelText(/email/i);
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveValue('');
    userEvent.type(elem, 'Something');
    expect(elem).toHaveValue('Something');
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
