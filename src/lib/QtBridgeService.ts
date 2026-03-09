/**
 * QtBridgeService - Legacy Qt/WebView Integration Service
 * 
 * This service handles communication between the web application and 
 * the native Qt framework (Chromium v87 compatibility - no top-level await).
 * 
 * Refactored from legacy PHP/HTML logic to maintain compatibility with
 * older Qt WebView implementations.
 */

import { isBrowser } from './utils';

// ============================================
// Type Definitions
// ============================================

/**
 * Qt API exposed by the native application
 */
interface QtAPI {
  /**
   * Invoke a Qt method
   */
  invoke?: (method: string, ...args: unknown[]) => unknown;
  
  /**
   * Get Qt property
   */
  getProperty?: (name: string) => unknown;
  
  /**
   * Set Qt property
   */
  setProperty?: (name: string, value: unknown) => void;
  
  /**
   * Qt version info
   */
  qtVersion?: string;
  
  /**
   * Device info
   */
  deviceInfo?: {
    platform: string;
    version: string;
    uuid: string;
  };
  
  /**
   * File system access (legacy)
   */
  fileSystem?: {
    readFile: (path: string) => Promise<string>;
    writeFile: (path: string, content: string) => Promise<boolean>;
    exists: (path: string) => Promise<boolean>;
  };
  
  /**
   * Camera access (legacy)
   */
  camera?: {
    capture: () => Promise<string>; // Returns base64 image
    startPreview: () => Promise<boolean>;
    stopPreview: () => Promise<boolean>;
  };
  
  /**
   * Notifications
   */
  notify?: (title: string, message: string) => void;
}

/**
 * Extended window interface for Qt
 */
interface QtWindow extends Window {
  /**
   * Qt API reference
   */
  Qt?: QtAPI;
  
  /**
   * WebView channel for Qt communication
   */
  webkit?: {
    messageHandlers?: {
      [key: string]: {
        postMessage: (message: unknown) => void;
      };
    };
  };
}

// ============================================
// Service State
// ============================================

/**
 * Check if running in Qt WebView
 */
function isQtEnvironment(): boolean {
  if (!isBrowser()) return false;
  
  const win = window as QtWindow;
  return !!(win.Qt || win.webkit?.messageHandlers);
}

/**
 * Get the Qt API instance
 */
function getQtAPI(): QtAPI | null {
  if (!isBrowser()) return null;
  
  const win = window as QtWindow;
  return win.Qt || null;
}

// ============================================
// Public API
// ============================================

/**
 * QtBridgeService - Main service class
 * Uses IIFE pattern for Chromium v87 compatibility (no top-level await)
 */
export const QtBridgeService = (function() {
  // Private state
  let _isInitialized = false;
  let _qtVersion: string | null = null;
  let _platform: string | null = null;
  
  /**
   * Initialize the Qt bridge
   */
  function init(): boolean {
    if (_isInitialized) return true;
    
    if (!isQtEnvironment()) {
      console.log('[QtBridge] Not running in Qt environment');
      _isInitialized = true;
      return false;
    }
    
    const api = getQtAPI();
    if (api?.qtVersion) {
      _qtVersion = api.qtVersion as string;
      console.log('[QtBridge] Initialized with Qt version:', _qtVersion);
    }
    
    if (api?.deviceInfo?.platform) {
      _platform = (api.deviceInfo as { platform: string }).platform;
    }
    
    _isInitialized = true;
    return true;
  }
  
  /**
   * Check if running in Qt environment
   */
  function isQt(): boolean {
    return isQtEnvironment();
  }
  
  /**
   * Get Qt version
   */
  function getVersion(): string | null {
    return _qtVersion;
  }
  
  /**
   * Get platform info
   */
  function getPlatform(): string | null {
    return _platform;
  }
  
  /**
   * Invoke a Qt method
   */
  function invoke(method: string, ...args: unknown[]): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const api = getQtAPI();
      
      if (!api?.invoke) {
        reject(new Error('Qt invoke not available'));
        return;
      }
      
      try {
        const result = api.invoke(method, ...args);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  
  /**
   * Get a Qt property
   */
  function getProperty(name: string): unknown {
    const api = getQtAPI();
    return api?.getProperty?.(name);
  }
  
  /**
   * Set a Qt property
   */
  function setProperty(name: string, value: unknown): void {
    const api = getQtAPI();
    api?.setProperty?.(name, value);
  }
  
  /**
   * Read file from local file system
   */
  async function readFile(path: string): Promise<string | null> {
    const api = getQtAPI();
    
    if (!api?.fileSystem?.readFile) {
      console.warn('[QtBridge] File system not available');
      return null;
    }
    
    try {
      return await api.fileSystem.readFile(path);
    } catch (error) {
      console.error('[QtBridge] Failed to read file:', error);
      return null;
    }
  }
  
  /**
   * Write file to local file system
   */
  async function writeFile(path: string, content: string): Promise<boolean> {
    const api = getQtAPI();
    
    if (!api?.fileSystem?.writeFile) {
      console.warn('[QtBridge] File system not available');
      return false;
    }
    
    try {
      return await api.fileSystem.writeFile(path, content);
    } catch (error) {
      console.error('[QtBridge] Failed to write file:', error);
      return false;
    }
  }
  
  /**
   * Show native notification
   */
  function notify(title: string, message: string): void {
    const api = getQtAPI();
    api?.notify?.(title, message);
  }
  
  /**
   * Post message to Qt WebView handler
   */
  function postMessage(handlerName: string, message: unknown): void {
    const win = window as QtWindow;
    const handler = win.webkit?.messageHandlers?.[handlerName];
    
    if (handler) {
      handler.postMessage(message);
    } else {
      console.warn('[QtBridge] Message handler not found:', handlerName);
    }
  }
  
  // Initialize on creation
  init();
  
  // Return public API
  return {
    init,
    isQt,
    getVersion,
    getPlatform,
    invoke,
    getProperty,
    setProperty,
    readFile,
    writeFile,
    notify,
    postMessage,
  };
})();

// ============================================
// Default Export
// ============================================

export default QtBridgeService;

// ============================================
// Type Export
// ============================================

export type { QtAPI, QtWindow };

