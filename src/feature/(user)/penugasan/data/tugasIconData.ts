import React from "react";
import { LucideIcon, File } from "lucide-react";

import { IconTwibbon } from "@/shared/components/icon/IconTwibbon";
import { IconSurvival } from "@/shared/components/icon/IconSurvival";
import { IconFoundy } from "@/shared/components/icon/iconFoundy";
import { IconBlueprint } from "@/shared/components/icon/IconBlueprint";
import { IconHire } from "@/shared/components/icon/IconHire";
import { IconSynshine } from "@/shared/components/icon/IconSynshine";
import { IconKuis } from "@/shared/components/icon/IconKuis";

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon;

const iconMap: Record<string, IconComponent> = {
  twibbon: IconTwibbon,
  "survival guide maba": IconSurvival,
  "found you, founder": IconFoundy,
  "blueprint of becoming": IconBlueprint,
  "hire me in 2029": IconHire,
  "sync & shine": IconSynshine,
  kuis: IconKuis,
};

export const getIconForTask = (
  taskName: string,
  type: "tugas" | "kuis",
): IconComponent => {
  const lowerCaseName = taskName.toLowerCase();

  if (type === "kuis") {
    return IconKuis;
  }

  for (const key in iconMap) {
    if (lowerCaseName.includes(key)) {
      return iconMap[key];
    }
  }

  return File;
};
