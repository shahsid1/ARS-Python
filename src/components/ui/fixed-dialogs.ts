
// This file contains fixed dialogs that are not tied to a specific component
export {}; // This is a placeholder export to make this a module

// Success variant for buttons
declare module "@/components/ui/button" {
  interface ButtonVariants {
    variant: "default" | "destructive" | "outline" | "secondary" | "success";
  }
}

// Adding onClose to DialogProps
declare module "@/components/ui/dialog" {
  interface DialogProps {
    onClose?: () => void;
  }
}
