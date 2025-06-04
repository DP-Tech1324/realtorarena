import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBookings } from '@/hooks/useBookings';

import '@testing-library/jest-dom/vitest';

let selectResponse: any;
var fromMock: any;
const selectMock = vi.fn();
const eqMock = vi.fn();
const insertMock = vi.fn();

vi.mock('@/integrations/supabase/client', () => {
  fromMock = vi.fn();
  return { supabase: { from: fromMock } };
});

const chain: any = {
  select: (...args: any[]) => {
    selectMock(...args);
    return chain;
  },
  eq: (...args: any[]) => {
    eqMock(...args);
    return chain;
  },
  insert: (...args: any[]) => insertMock(...args),
  then: (resolve: any) => Promise.resolve(selectResponse).then(resolve)
};

fromMock.mockReturnValue(chain);
insertMock.mockResolvedValue({ error: null });

describe('useBookings', () => {
  beforeEach(() => {
    selectResponse = { data: [], error: null };
    insertMock.mockClear();
    fromMock.mockClear();
  });

  it('saves a booking when slot free', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useBookings().useSubmitBooking(), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({
        name: 'John',
        email: 'john@example.com',
        date: new Date('2024-01-01'),
        time: '10:00'
      });
    });
    expect(insertMock).toHaveBeenCalled();
  });

  it('throws error when slot taken', async () => {
    selectResponse = { data: [{ id: '1' }], error: null };
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useBookings().useSubmitBooking(), { wrapper });
    await expect(
      result.current.mutateAsync({ name: 'a', email: 'a@b.c', date: new Date('2024-01-01'), time: '10:00' })
    ).rejects.toThrow();
  });
});
