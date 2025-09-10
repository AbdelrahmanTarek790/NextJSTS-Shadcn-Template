'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApi, useApiPost } from '@/hooks/useApi';
import { toast } from 'sonner';

interface TestData {
  message: string;
  timestamp: string;
  requestId: string;
}

interface CreateData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export function ApiDemo() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  // Using the custom hooks
  const { data: testData, loading: testLoading, execute: executeTest } = useApi<TestData>();
  const { data: createData, loading: createLoading, execute: executeCreate } = useApiPost<CreateData>();

  const handleTestGet = async () => {
    const result = await executeTest('/api/test');
    if (result) {
      toast.success('GET request successful!');
    }
  };

  const handleTestError = async () => {
    await executeTest('/api/test', { error: 'true' });
    // Error toast will be shown automatically by axios interceptor
  };

  const handleCreateData = async () => {
    const result = await executeCreate('/api/test', formData);
    if (result) {
      toast.success('POST request successful!');
      setFormData({ name: '', email: '' });
    }
  };

  const handleTestValidationError = async () => {
    await executeCreate('/api/test', { shouldError: true });
    // Error toast will be shown automatically by axios interceptor
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Axios + Sonner Integration Demo</h2>
        <p className="text-muted-foreground mb-6">
          This demo showcases the axios structure with error handling using Sonner toast notifications.
        </p>
      </div>

      {/* GET Request Demo */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">GET Request Demo</h3>
        <div className="flex gap-2">
          <Button onClick={handleTestGet} disabled={testLoading}>
            {testLoading ? 'Loading...' : 'Test Success'}
          </Button>
          <Button onClick={handleTestError} variant="destructive" disabled={testLoading}>
            {testLoading ? 'Loading...' : 'Test Error'}
          </Button>
        </div>
        {testData && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <h4 className="font-semibold text-green-800">Success Response:</h4>
            <pre className="text-sm text-green-700 mt-1">
              {JSON.stringify(testData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* POST Request Demo */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">POST Request Demo</h3>
        <div className="space-y-3">
          <Input
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateData} disabled={createLoading || !formData.name || !formData.email}>
            {createLoading ? 'Creating...' : 'Create Data'}
          </Button>
          <Button onClick={handleTestValidationError} variant="destructive" disabled={createLoading}>
            {createLoading ? 'Loading...' : 'Test Validation Error'}
          </Button>
        </div>
        {createData && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <h4 className="font-semibold text-green-800">Created Data:</h4>
            <pre className="text-sm text-green-700 mt-1">
              {JSON.stringify(createData, null, 2)}
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
    </div>
  );
}