export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const TOKEN_KEY = "access_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// FastAPI restituisce "detail" come testo (409, 401) oppure come lista di errori di validazione (422)
const extractMessage = (body: unknown): string => {
  const detail = (body as { detail?: unknown } | null)?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((d: { loc?: string[]; msg?: string }) => `${d.loc?.at(-1)}: ${d.msg}`)
      .join(", ");
  }
  return "Errore imprevisto";
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  // Con FormData il browser imposta da solo il Content-Type (multipart con boundary)
  if (typeof options.body === "string") headers.set("Content-Type", "application/json");

  const token = getToken();
   if (token) headers.set("Authorization", `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, { ...options, headers });
  } catch {
    throw new ApiError(0, "Server non raggiungibile");
  }

  const body = await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(response.status, extractMessage(body));
  return body as T;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  is_admin: boolean;
  created_at: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}

export const register = (data: RegisterData) =>
  request<User>("/auth/register", { method: "POST", body: JSON.stringify(data) });

export const login = async (email: string, password: string) => {
  const { access_token } = await request<{ access_token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setToken(access_token);
};

export const getMe = () => request<User>("/auth/me");

export const getUsers = () => request<User[]>("/users");

export interface BookItem {
  id: number;
  title: string;
  author: string;
  genre: string | null;
  description: string | null;
  pickup_location: string | null;
  image_url: string | null;
  total_copies: number;
  available_copies: number;
  available: boolean;
}

export interface EventItem {
  id: number;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string;
  location: string;
  image_url: string | null;
  total_seats: number;
  available_seats: number;
}

export const getBooks = () => request<BookItem[]>("/books");

export const getEvents = () => request<EventItem[]>("/events");

export const createBook = (data: FormData) =>
  request<unknown>("/books", { method: "POST", body: data });

export const createEvent = (data: FormData) =>
  request<unknown>("/events", { method: "POST", body: data });

export const deleteBook = (id: number) => request<void>(`/books/${id}`, { method: "DELETE" });

export const deleteEvent = (id: number) => request<void>(`/events/${id}`, { method: "DELETE" });

export const bookEvent = (id: number) =>
  request<{ event_id: number; seats: number }>(`/events/${id}/bookings`, { method: "POST" });

export const getBookingsCount = () => request<{ total: number }>("/events/bookings/count");

export interface EventBookingItem {
  id: number;
  user: { first_name: string; last_name: string; email: string };
  event: { id: number; title: string; event_date: string };
  seats: number;
  created_at: string;
}

export const getActiveBookings = () => request<EventBookingItem[]>("/events/bookings");

export interface LoanItem {
  id: number;
  book: { id?: number; title: string; author: string };
  user: { first_name: string; last_name: string; email: string };
  start_date: string;
  due_date: string;
  returned_at: string | null;
}

export const createLoan = (bookId: number) =>
  request<LoanItem>("/loans", { method: "POST", body: JSON.stringify({ book_id: bookId }) });

export const getActiveLoans = () => request<LoanItem[]>("/loans");

export const logout = clearToken;
