import { Card } from "../card/card";
import { CardContent } from "../card/card-content";
import { CardFooter } from "../card/card-footer";
import { CardHeader } from "../card/card-header";

export default function Playground() {
  return (
    <Card>
      <CardHeader title="Beer" subTitle="Wasseralfinger" />
      <CardContent>
        <p>This is projected into the card as the content slot.</p>
      </CardContent>
      <CardFooter>
        <button>Drink</button>
        <button>Vote</button>
      </CardFooter>
    </Card>
  );
}
