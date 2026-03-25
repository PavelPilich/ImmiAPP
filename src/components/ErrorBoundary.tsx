import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { S } from '../data/styles';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ ...S.page, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh', textAlign:'center', padding:24 }}>
          <div style={{ fontSize:48, marginBottom:16 }}>⚠️</div>
          <h2 style={{ color:'#fff', marginBottom:8 }}>Something went wrong</h2>
          <p style={{ color: S.t2, marginBottom:24, maxWidth:300 }}>
            An unexpected error occurred. Please try again.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <pre style={{ color:'#f87171', fontSize:11, marginBottom:16, maxWidth:300, overflow:'auto', textAlign:'left', background:'rgba(0,0,0,.3)', padding:12, borderRadius:8 }}>
              {this.state.error.message}
            </pre>
          )}
          <button onClick={() => window.location.reload()} style={{ ...S.btn, background: S.priBtn }}>
            Return to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
