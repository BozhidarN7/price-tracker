import {
  AlertCircle,
  FileX,
  ImageOff,
  LucideIcon,
  ServerCrash,
  ShieldAlert,
  WifiOff,
  Zap,
} from 'lucide-react-native';

export type ErrorType =
  | 'analysis_failed'
  | 'save_failed'
  | 'network_error'
  | 'invalid_image'
  | 'server_error'
  | 'timeout'
  | 'unknown';

interface ErrorConfig {
  title: string;
  description: string;
  icon: LucideIcon;
  tips: string[];
  primaryAction: string;
  showScanAction: boolean;
}

export const ERROR_CONFIGS: Record<ErrorType, ErrorConfig> = {
  analysis_failed: {
    title: "Couldn't Analyze Receipt",
    description:
      "We had trouble reading this receipt. The image might be unclear or the format isn't recognized.",
    icon: FileX,
    tips: [
      'Make sure the entire receipt is visible',
      'Try better lighting or reduce shadows',
      'Flatten the receipt to avoid creases',
      'Ensure text is clear and readable',
    ],
    primaryAction: 'Try Another Photo',
    showScanAction: true,
  },
  save_failed: {
    title: "Couldn't Save Products",
    description:
      "Something went wrong while saving your products. Your data is safe, but we couldn't complete the save.",
    icon: ServerCrash,
    tips: [
      'Check your internet connection',
      'Make sure you have enough storage space',
      'Try again in a few moments',
      'Contact support if this persists',
    ],
    primaryAction: 'Try Again',
    showScanAction: false,
  },
  network_error: {
    title: 'No Internet Connection',
    description:
      "Looks like you're offline. We need an internet connection to analyze receipts and save products.",
    icon: WifiOff,
    tips: [
      'Check your Wi-Fi or mobile data',
      'Try moving to an area with better signal',
      'Restart your device if needed',
      'You can try again once connected',
    ],
    primaryAction: 'Try Again',
    showScanAction: true,
  },
  invalid_image: {
    title: 'Invalid Image',
    description:
      "This doesn't look like a receipt image. Please try uploading a clear photo of your receipt.",
    icon: ImageOff,
    tips: [
      'Use a clear photo of the receipt',
      'Avoid screenshots or heavily edited images',
      'Make sure the file is a valid image format',
      'Try taking a new photo',
    ],
    primaryAction: 'Upload New Photo',
    showScanAction: true,
  },
  server_error: {
    title: 'Server Error',
    description:
      "Our servers are having trouble right now. Don't worry, this is temporary!",
    icon: ShieldAlert,
    tips: [
      "We're working to fix this quickly",
      'Your data is safe',
      'Try again in a few minutes',
      'Check our status page for updates',
    ],
    primaryAction: 'Try Again',
    showScanAction: true,
  },
  timeout: {
    title: 'Request Timed Out',
    description:
      'This is taking longer than expected. The server might be busy or your connection is slow.',
    icon: Zap,
    tips: [
      'Check your internet speed',
      'Try again with a smaller image',
      'Wait a moment and retry',
      'Consider trying during off-peak hours',
    ],
    primaryAction: 'Try Again',
    showScanAction: true,
  },
  unknown: {
    title: 'Something Went Wrong',
    description:
      "An unexpected error occurred. We're not sure what happened, but we'll help you get back on track.",
    icon: AlertCircle,
    tips: [
      'Try closing and reopening the app',
      'Check for app updates',
      'Clear your cache if needed',
      'Contact support if this continues',
    ],
    primaryAction: 'Try Again',
    showScanAction: true,
  },
};
