export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const api = {
    get: async (endpoint: string) => {
        const token = localStorage.getItem('token');
        const headers: any = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}${endpoint}`, {
            headers,
            cache: 'no-store'
        });

        if (res.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Session expired');
        }

        if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
        return res.json();
    },
    post: async (endpoint: string, data: any) => {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        if (res.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Session expired');
        }
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `API Error: ${res.statusText}`);
        }
        return res.json();
    },
    put: async (endpoint: string, data: any) => {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        if (res.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Session expired');
        }
        if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
        return res.json();
    },
    delete: async (endpoint: string) => {
        const token = localStorage.getItem('token');
        const headers: any = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers
        });
        if (res.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Session expired');
        }
        if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
        return res.json();
    }
};
