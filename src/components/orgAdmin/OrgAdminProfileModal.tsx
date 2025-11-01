import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import OrgAdminProfile from "@/pages/orgAdmin/OrgAdminProfile";

interface OrgAdminProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrgAdminProfileModal = ({ isOpen, onClose }: OrgAdminProfileModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Organization Admin Profile</DialogTitle>
          <DialogDescription>
            View and manage your organization's profile information.
          </DialogDescription>
        </DialogHeader>
        <OrgAdminProfile />
      </DialogContent>
    </Dialog>
  );
};