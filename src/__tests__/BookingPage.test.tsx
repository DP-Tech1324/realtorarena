import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Booking from '@/pages/Booking';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('@/components/Navbar', () => ({ default: () => <div>Navbar</div> }));
vi.mock('@/components/Footer', () => ({ default: () => <div>Footer</div> }));

describe('Booking page', () => {
  it('renders form fields', () => {
    const client = new QueryClient();
    render(
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Booking />
        </BrowserRouter>
      </QueryClientProvider>
    );
    expect(screen.getByText(/Schedule Your Appointment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preferred Date/i)).toBeInTheDocument();
  });
});
