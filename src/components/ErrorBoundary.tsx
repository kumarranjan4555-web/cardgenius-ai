import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { children } = this.props;
    if (this.state.hasError) {
      let errorInfo = null;
      try {
        errorInfo = JSON.parse(this.state.error?.message || '{}');
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Oops! Something went wrong</h1>
              <p className="text-gray-500">
                {errorInfo?.error || 'An unexpected error occurred. Please try again later.'}
              </p>
            </div>
            {errorInfo?.path && (
              <div className="bg-gray-50 p-4 rounded-2xl text-left text-xs font-mono text-gray-500 overflow-hidden">
                <p>Path: {errorInfo.path}</p>
                <p>Op: {errorInfo.operationType}</p>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all"
            >
              <RefreshCcw className="w-5 h-5" />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}
