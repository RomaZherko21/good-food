import { render, screen } from '@testing-library/react';
import SignUp from './SignUp';
import MainFields from './MainFields';
import AdditionalVerification from './AdditionalVerification';

describe('Navbar', () => {
  it('Render h1', () => {
    render(<SignUp />);
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});

describe('MainFields', () => {
  it('email input', () => {
    render(<MainFields />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
  it('password input', () => {
    render(<MainFields />);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
  it('submit button', () => {
    render(<MainFields />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('err', () => {
    render(<MainFields />);
    expect(screen.queryByText('Something goes wrong...')).toBeNull();
  });
});

describe('AdditionalVerification', () => {
  it('token input', () => {
    render(<AdditionalVerification />);
    expect(screen.getByLabelText(/token/i)).toBeInTheDocument();
  });
  it('QR image', () => {
    render(<AdditionalVerification />);
    expect(screen.getByAltText('QR')).toBeInTheDocument();
  });
  it('submit button', () => {
    render(<AdditionalVerification />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('err', () => {
    render(<AdditionalVerification />);
    expect(screen.queryByText('Something goes wrong...')).toBeNull();
  });
});
