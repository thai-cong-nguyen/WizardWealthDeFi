import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

interface DialogOptionInStakingProps {
  trigger: React.ReactNode;
  header: React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode;
}

const DialogOptionInStaking = ({
  trigger,
  header,
  title,
  content,
}: DialogOptionInStakingProps) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center gap-5">
            {title}
          </DialogTitle>
          {header}
        </DialogHeader>
        <Separator className="font-bold" />
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default DialogOptionInStaking;
