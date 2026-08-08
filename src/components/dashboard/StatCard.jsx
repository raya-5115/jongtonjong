import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <Card>

      <CardHeader className="flex flex-row items-center justify-between">

        <CardTitle className="text-l font-bold">
          {title}
        </CardTitle>

        {Icon && (
          <Icon className="h-5 w-5 text-muted-foreground" />
        )}

      </CardHeader>

      <CardContent>

        <div className="text-3xl font-bold">
          {value}
        </div>

      </CardContent>

    </Card>
  );
}