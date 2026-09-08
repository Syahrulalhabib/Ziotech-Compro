import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-lg border border-slate-200">
            <h2 className="text-xl font-bold text-red-600 mb-2">Terjadi Kesalahan Aplikasi</h2>
            <p className="text-slate-600 text-sm mb-4">
              {this.state.error?.message || 'Unknown runtime error'}
            </p>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-auto max-h-60 mb-6 font-mono">
              {this.state.error?.stack}
            </pre>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700"
              >
                Muat Ulang
              </button>
              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-300"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
