import { Rangkaian } from "@/feature/(user)/penugasan/types";
import { Button } from "@/shared/components/ui/Button";

interface RangkaianTabsProps {
  rangkaianList: Rangkaian[];
  activeRangkaianId: string | null;
  onRangkaianChange: (id: string) => void;
}

export const RangkaianTabs = ({
  rangkaianList,
  activeRangkaianId,
  onRangkaianChange,
}: RangkaianTabsProps) => {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-center justify-start md:justify-center gap-2 md:gap-4 whitespace-nowrap">
        {rangkaianList.map((rangkaian) => (
          <Button
            key={rangkaian.ID}
            onClick={() => onRangkaianChange(rangkaian.ID)}
            variant={activeRangkaianId === rangkaian.ID ? "primary" : "outline"}
            size="large"
            className="rounded-full px-4 md:px-6"
          >
            {rangkaian.Name}
          </Button>
        ))}
      </div>
    </div>
  );
};
