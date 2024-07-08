import { Badge } from "../ui/badge";


export const manualTransmission = () => <Badge variant="outline">manual</Badge>;
export const automaticTransmission = () => <Badge variant="outline">automatic</Badge>;
export const bothTransmissions = () => (
  <div>
    <Badge variant="outline">manual</Badge>{" "}
    <Badge variant="outline">automatic</Badge>{" "}
  </div>
);