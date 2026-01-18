import {
  Brain,
  CheckCircle2,
  Database,
  FileText,
  Rocket,
  Scan,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react-native';
type AnalysisStep = {
  id: string;
  label: string;
  icon: typeof Brain;
  tip?: string;
  duration: number; // in milliseconds
};
export const ANALYSIS_STEPS: Record<string, AnalysisStep[]> = {
  receipt: [
    {
      id: 'scanning',
      label: 'Scanning receipt',
      icon: Scan,
      tip: 'AI is detecting text regions',
      duration: 2000,
    },
    {
      id: 'extracting',
      label: 'Extracting data',
      icon: FileText,
      tip: 'Reading product names and prices',
      duration: 4000,
    },
    {
      id: 'analyzing',
      label: 'Analyzing with AI',
      icon: Brain,
      tip: 'Matching products with database',
      duration: 3500,
    },
    {
      id: 'validating',
      label: 'Validating results',
      icon: ShieldCheck,
      tip: 'Ensuring accuracy',
      duration: 2000,
    },
    {
      id: 'finalizing',
      label: 'Finalizing',
      icon: Sparkles,
      tip: 'Almost ready!',
      duration: 500,
    },
  ],
  saving: [
    {
      id: 'preparing',
      label: 'Preparing data',
      icon: Database,
      tip: 'Organizing your products',
      duration: 2000,
    },
    {
      id: 'processing',
      label: 'Processing',
      icon: Brain,
      tip: 'Calculating price trends',
      duration: 4000,
    },
    {
      id: 'saving',
      label: 'Saving to database',
      icon: CheckCircle2,
      tip: 'Securely storing information',
      duration: 4000,
    },
    {
      id: 'finalizing',
      label: 'Finishing up',
      icon: Rocket,
      tip: 'Almost there!',
      duration: 2000,
    },
  ],
  processing: [
    {
      id: 'loading',
      label: 'Loading',
      icon: Zap,
      tip: 'Getting things ready',
      duration: 3000,
    },
    {
      id: 'processing',
      label: 'Processing',
      icon: Brain,
      tip: 'Working on it',
      duration: 6000,
    },
    {
      id: 'finalizing',
      label: 'Finalizing',
      icon: Sparkles,
      tip: 'Almost done!',
      duration: 3000,
    },
  ],
} as const;
