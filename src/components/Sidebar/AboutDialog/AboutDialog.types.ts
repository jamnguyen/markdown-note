export interface AboutDialogProps {
  open: boolean;
  onClose: () => void;
  appName: string;
  appVersion: string;
  author?: string;
}
