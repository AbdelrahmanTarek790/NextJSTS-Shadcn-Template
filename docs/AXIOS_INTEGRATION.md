# Axios Integration Guide

This template includes a robust axios setup with error handling using Sonner toast notifications from shadcn/ui.

## 🚀 Features

- ✅ Axios instance with interceptors
- ✅ Automatic error handling with toast notifications
- ✅ TypeScript support with proper typing
- ✅ Custom React hooks for API operations
- ✅ File upload and download utilities
- ✅ Pagination support
- ✅ Development logging
- ✅ Automatic auth token injection

## 📁 Structure

```
src/
├── lib/
│   ├── axios.ts              # Axios configuration and interceptors
│   ├── api-client.ts         # API client service class
│   └── types/
│       └── api.ts            # TypeScript interfaces
├── hooks/
│   └── useApi.ts             # React hooks for API operations
└── components/
    └── ApiDemo.tsx           # Demo component showcasing usage
```

## 🛠️ Configuration

### Environment Variables

Add these to your `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
# If not provided, defaults to '/api' (for Next.js API routes)
```

### Axios Configuration

The axios instance is configured with:
- Base URL from environment variable
- 10-second timeout
- JSON content type
- Automatic auth token injection
- Request/response logging in development

## 📖 Usage Examples

### Using Custom Hooks

```tsx
import { useApi, useApiPost } from '@/hooks/useApi';

function MyComponent() {
  // GET request
  const { data, loading, error, execute } = useApi<User[]>();
  
  // POST request
  const { data: createData, loading: createLoading, execute: createUser } = useApiPost<User, CreateUserData>();

  const handleFetchUsers = async () => {
    await execute('/api/users');
  };

  const handleCreateUser = async () => {
    const userData = { name: 'John', email: 'john@example.com' };
    await createUser('/api/users', userData);
  };

  return (
    <div>
      <button onClick={handleFetchUsers} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Users'}
      </button>
      
      <button onClick={handleCreateUser} disabled={createLoading}>
        {createLoading ? 'Creating...' : 'Create User'}
      </button>
    </div>
  );
}
```

### Using API Client Service

```tsx
import { apiClientService } from '@/lib/api-client';

// Direct API calls
const users = await apiClientService.get<User[]>('/api/users');
const newUser = await apiClientService.post<User, CreateUserData>('/api/users', userData);

// File upload
const uploadResult = await apiClientService.upload('/api/upload', file, { userId: '123' });

// Download file
await apiClientService.download('/api/files/document.pdf', 'my-document.pdf');

// Paginated requests
const paginatedUsers = await apiClientService.getPaginated<User>('/api/users', {
  page: 1,
  limit: 10,
  search: 'john'
});
```

### Pagination Hook

```tsx
import { useApiPaginated } from '@/hooks/useApi';

function UsersList() {
  const {
    data: users,
    loading,
    pagination,
    execute,
    nextPage,
    previousPage,
    goToPage
  } = useApiPaginated<User>('/api/users', 1, 10);

  useEffect(() => {
    execute();
  }, []);

  return (
    <div>
      {users.map(user => <div key={user.id}>{user.name}</div>)}
      
      <div>
        <button onClick={previousPage} disabled={pagination.page === 1}>
          Previous
        </button>
        <span>Page {pagination.page} of {pagination.totalPages}</span>
        <button onClick={nextPage} disabled={pagination.page === pagination.totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
```

## 🎯 Error Handling

### Automatic Error Handling

All API errors are automatically handled and displayed as toast notifications:

- **Network errors**: "Network error. Please check your connection."
- **401 Unauthorized**: Automatically removes auth token and shows login message
- **403 Forbidden**: Shows permission denied message
- **422 Validation**: Shows specific validation errors
- **500 Server Error**: Shows generic server error message

### Custom Error Handling

```tsx
import { toast } from 'sonner';

try {
  const result = await apiClientService.post('/api/users', userData);
  toast.success('User created successfully!');
} catch (error) {
  // Custom error handling
  console.error('Failed to create user:', error);
  // Note: Toast is already shown by interceptor
}
```

### Manual Toast Usage

```tsx
import { toast } from 'sonner';

toast.success('Success message');
toast.error('Error message');
toast.info('Info message');
toast.warning('Warning message');

// With custom options
toast.success('User created!', {
  description: 'The user has been successfully added to the system.',
  duration: 5000,
});
```

## 🔧 TypeScript Types

### API Response Types

```tsx
interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### Creating Custom Types

```tsx
// User-related types
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface CreateUserData {
  name: string;
  email: string;
}

// Usage with hooks
const { data, execute } = useApi<User[]>();
const { execute: createUser } = useApiPost<User, CreateUserData>();
```

## 🎨 Demo

Visit `/api-demo` to see the integration in action with:
- Success and error scenarios
- Form submissions
- Different toast types
- Real-time feedback

## 🔐 Authentication Integration

The axios instance automatically:
- Injects auth tokens from localStorage
- Handles 401 responses by clearing tokens
- Can be configured to redirect to login page

```tsx
// Token is automatically added to requests
localStorage.setItem('auth-token', 'your-jwt-token');

// On 401 response, token is automatically cleared
// Optionally redirect to login (uncomment in axios.ts)
```

## 🎛️ Customization

### Adding Custom Interceptors

```tsx
import { apiClient } from '@/lib/axios';

// Add custom request interceptor
apiClient.interceptors.request.use(config => {
  config.headers['X-Custom-Header'] = 'value';
  return config;
});

// Add custom response interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Custom error handling
    return Promise.reject(error);
  }
);
```

### Environment-Specific Configuration

```tsx
// In axios.ts, you can add environment-specific settings
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3001/api'
    : process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: process.env.NODE_ENV === 'development' ? 30000 : 10000,
});
```