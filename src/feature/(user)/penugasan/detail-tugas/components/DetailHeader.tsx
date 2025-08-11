import { Badge, BadgeProps } from "@/shared/components/ui/Badge";

interface DetailHeaderProps {
  judul: string;
  deadline: string;
  statusText: string;
  statusVariant: BadgeProps["variant"];
}

export const DetailHeader = ({
  judul,
  deadline,
  statusText,
  statusVariant,
}: DetailHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row justify-center md:justify-between items-center md:items-start">
      <div className="flex flex-col gap-1 items-center md:items-start">
        <h1 className="text-4xl font-semibold text-primary-600">{judul}</h1>
        <p className="text-default-dark text-xl md:text-base">
          Deadline: {deadline}
        </p>
      </div>

      <Badge
        variant={statusVariant}
        className="text-lg md:text-xl px-16 md:px-12 py-3 self-center md:self-start"
      >
        {statusText}
      </Badge>
    </div>
  );
};
