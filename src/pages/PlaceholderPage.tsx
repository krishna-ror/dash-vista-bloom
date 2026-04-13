import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

const PlaceholderPage = () => {
  const location = useLocation();
  const name = location.pathname.split("/").pop() || "Page";

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <Card className="shadow-soft">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <Construction className="w-12 h-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground capitalize">{name}</h2>
          <p className="text-muted-foreground text-sm mt-1">This section is under development</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
