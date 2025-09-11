'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApi, useApiPost } from '@/hooks/useApi';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export function ApiDemo() {
  const [postData, setPostData] = useState({ title: '', body: '', userId: 1 });
  
  // Using the custom hooks with external APIs
  const { data: userData, loading: userLoading, execute: executeGetUser } = useApi<User>();
  const { data: createdPost, loading: postLoading, execute: executeCreatePost } = useApiPost<Post>();

  const handleGetUser = async () => {
    const result = await executeGetUser('/users/1');
    if (result) {
      toast.success('User data fetched successfully!');
    }
  };

  const handleGetInvalidUser = async () => {
    await executeGetUser('/users/999999'); // This will return 404
    // Error toast will be shown automatically by axios interceptor
  };

  const handleCreatePost = async () => {
    const result = await executeCreatePost('/posts', postData);
    if (result) {
      toast.success('Post created successfully!');
      setPostData({ title: '', body: '', userId: 1 });
    }
  };

  const handleTestNetworkError = async () => {
    // Try to call a non-existent endpoint to simulate network error
    await executeGetUser('/invalid-endpoint');
    // Error toast will be shown automatically by axios interceptor
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Axios + Sonner Integration Demo</h2>
        <p className="text-muted-foreground mb-6">
          This demo showcases the axios structure with error handling using Sonner toast notifications.
          It uses external APIs (JSONPlaceholder) to demonstrate real-world usage.
        </p>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-6">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This demo uses JSONPlaceholder API as an example. 
            Configure your own API base URL in <code>NEXT_PUBLIC_API_BASE_URL</code> environment variable.
          </p>
        </div>
      </div>

      {/* GET Request Demo */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">GET Request Demo</h3>
        <p className="text-sm text-muted-foreground">
          Fetch user data from external API with error handling.
        </p>
        <div className="flex gap-2">
          <Button onClick={handleGetUser} disabled={userLoading}>
            {userLoading ? 'Loading...' : 'Fetch User'}
          </Button>
          <Button onClick={handleGetInvalidUser} variant="destructive" disabled={userLoading}>
            {userLoading ? 'Loading...' : 'Test 404 Error'}
          </Button>
          <Button onClick={handleTestNetworkError} variant="outline" disabled={userLoading}>
            {userLoading ? 'Loading...' : 'Test Network Error'}
          </Button>
        </div>
        {userData && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <h4 className="font-semibold text-green-800">User Data:</h4>
            <pre className="text-sm text-green-700 mt-1">
              {JSON.stringify(userData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* POST Request Demo */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">POST Request Demo</h3>
        <p className="text-sm text-muted-foreground">
          Create a new post using external API.
        </p>
        <div className="space-y-3">
          <Input
            placeholder="Enter post title"
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          />
          <Input
            placeholder="Enter post body"
            value={postData.body}
            onChange={(e) => setPostData({ ...postData, body: e.target.value })}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreatePost} disabled={postLoading || !postData.title || !postData.body}>
            {postLoading ? 'Creating...' : 'Create Post'}
          </Button>
        </div>
        {createdPost && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <h4 className="font-semibold text-green-800">Created Post:</h4>
            <pre className="text-sm text-green-700 mt-1">
              {JSON.stringify(createdPost, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Manual Toast Demo */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Manual Toast Demo</h3>
        <p className="text-sm text-muted-foreground">
          Test different types of toast notifications manually.
        </p>
        <div className="flex gap-2">
          <Button onClick={() => toast.success('Success message!')}>
            Success Toast
          </Button>
          <Button onClick={() => toast.error('Error message!')} variant="destructive">
            Error Toast
          </Button>
          <Button onClick={() => toast.info('Info message!')} variant="outline">
            Info Toast
          </Button>
          <Button onClick={() => toast.warning('Warning message!')} variant="secondary">
            Warning Toast
          </Button>
        </div>
      </div>

      {/* API Configuration Info */}
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold">API Configuration</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Current Base URL:</strong> <code>{process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.typicode.com (fallback)'}</code></p>
          <p className="text-muted-foreground">
            To use your own external API, set the <code>NEXT_PUBLIC_API_BASE_URL</code> environment variable 
            in your <code>.env.local</code> file.
          </p>
          <div className="p-2 bg-white border rounded">
            <code className="text-xs">NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com</code>
          </div>
        </div>
      </div>
    </div>
  );
}